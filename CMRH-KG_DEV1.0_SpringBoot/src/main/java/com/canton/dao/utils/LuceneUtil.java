package com.canton.dao.utils;

import com.canton.dao.entity.Book;
import com.canton.dao.mapper.BookMapper;
import com.canton.utils.IKAnalyzerLuceneUtil;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.*;
import java.nio.file.Paths;
import java.util.List;

/**
 * @Auther ChenX
 * @Date 2020.4.7
 * 全文检索的索引
 **/
@Component
public class LuceneUtil {
    /**
     * 写索引实例 构造方法，实例化 IndexWriter
     */
    private IndexWriter writer ;
    /**
     * 索引指定目录下的所有文件 生成索引文件
     * @param dataDir:数据目录
     *
     * @throws Exception
     */
    @Autowired
    private BookMapper bookMapper;

    public static LuceneUtil luceneUtil;

    @PostConstruct
    public void init()
    { luceneUtil = this ;
    luceneUtil.bookMapper = this.bookMapper;}

    public static List<Book> getBook()
    {   return luceneUtil.bookMapper.getAllBook();
    }

    public int indexAll(String indexDir) throws Exception {
        Directory dir = FSDirectory.open(Paths.get(indexDir));
        //使用中文分词器
        //SmartChineseAnalyzer analyzer = new SmartChineseAnalyzer();

        //使用hanLP分词器
        //Analyzer analyzer = new HanLPAnalyzer(true);

        //使用lk分词器
        Analyzer analyzer = new IKAnalyzerLuceneUtil(true);

        //将中文分词器配到写索引的配置中
        IndexWriterConfig config = new IndexWriterConfig(analyzer);
        //实例化写索引对象
        writer = new IndexWriter(dir, config);

        writer.deleteAll();//每次启动都重新构建索引，可关闭
        // 获取该路径下的所有文件

        List<Book> books = getBook();
        System.out.println(books);
        for(Book book : books)
        {   //调用下面的 indexFile 方法，对每个文件进行索引
            System.out.println("构建索引文件：" + book.getBookId());
            //调用下面的 getDocument 方法，获取该文件的 Document
            Document doc = new Document();
            //开始添加字段
            //添加文本内容
            try {
                Field fieldBody = new Field("contents", book.getBookContent(), Field.Store.YES,
                        Field.Index.ANALYZED, Field.TermVector.WITH_POSITIONS_OFFSETS);
                doc.add(fieldBody);
            } catch (Exception e)
            {

            }
                //添加书籍ID，并把这个字段存到索引文件里
                doc.add(new StringField("bookId", String.valueOf(book.getBookId()), Field.Store.YES));
                //添加书籍名，并把这个字段存到索引文件里
                doc.add(new StringField("bookName", book.getBookName(), Field.Store.YES));
                //添加作者名字
                doc.add(new TextField("bookAuthor", book.getBookAuthor(), Field.Store.YES));
                //将doc添加到索引中
                writer.addDocument(doc);
        }
        return writer.numDocs();
    }

    public void close() throws IOException {
        if (writer != null) {
            writer.close();
        }

    }
}
