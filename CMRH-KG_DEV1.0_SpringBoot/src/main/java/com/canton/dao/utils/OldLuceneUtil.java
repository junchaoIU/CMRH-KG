package com.canton.dao.utils;

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

import java.io.*;
import java.nio.file.Paths;
/**
 * @Auther ChenX
 * @Date 2020.4.7
 * 全文检索的索引
 **/
public class OldLuceneUtil {
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
    public int indexAll(String dataDir) throws Exception {
        // 获取该路径下的所有文件
        File[] files = new File(dataDir).listFiles();
        if (null != files) {
            for (File file : files) {

                //调用下面的 indexFile 方法，对每个文件进行索引
                System.out.println("构建索引文件：" + file.getCanonicalPath());
                //调用下面的 getDocument 方法，获取该文件的 Document
                Document doc = new Document();
                //开始添加字段

                //添加文本内容
                BufferedReader reader = new BufferedReader(new InputStreamReader(
                        new FileInputStream(file.getCanonicalPath()), "GBK"));
                String line = new String();
                String temp = new String();
                while ((line = reader.readLine()) != null) {
                    temp += line;
                }
                Field fieldBody = new Field("contents", temp, Field.Store.YES,
                        Field.Index.ANALYZED, Field.TermVector.WITH_POSITIONS_OFFSETS);
                doc.add(fieldBody);

                //添加文件名，并把这个字段存到索引文件里
                doc.add(new StringField("fileName", file.getName(), Field.Store.YES));
                //添加文件路径
                doc.add(new TextField("filePath", file.getCanonicalPath(), Field.Store.YES));
                //将doc添加到索引中
                writer.addDocument(doc);
            }
        }
        //返回索引的文件数
        return writer.numDocs();
    }
    public OldLuceneUtil(String indexDir) throws Exception {
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
    }
    public void close() throws IOException {
        if (writer != null) {
            writer.close();
        }

    }
}
