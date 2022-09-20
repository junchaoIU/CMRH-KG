package com.canton;

import com.canton.dao.utils.DefaultOntModel;
import com.canton.dao.utils.JenaUtil;
import com.canton.dao.utils.LuceneUtil;
import com.canton.utils.ClassPathUtil;
import com.canton.utils.InitializedUtil;
import com.spring4all.swagger.EnableSwagger2Doc;
import org.apache.jena.ontology.OntModel;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * @Auther ChenX
 * @Date 2020.3.10
 **/
@MapperScan("com.canton.dao.mapper")
@SpringBootApplication()
@ServletComponentScan
@EnableSwagger2Doc
@EnableAsync
public class CantonApplication {

    public static void main(String[] args) {
        SpringApplication.run(CantonApplication.class, args);
        ontologyInitialized();
        //luceneInitialized();
        lucene2Initialized();

    }

    public  static void ontologyInitialized() {

    //  构建本体模型
     System.out.println("开始初始化本体模型数据...");
    //获取默认模型的URI
    String defaultModelURI = InitializedUtil.getMyUri()+InitializedUtil.getMyRoot();
    System.out.println(defaultModelURI);
    System.out.println("将模型添加到Dataset...");
    OntModel defaultOntModel = JenaUtil.addNamedModel(defaultModelURI);
    DefaultOntModel.getInstance().setOntModel(defaultOntModel);
    System.out.println("初始化本体模型数据完成");

    }
    public  static void lucene2Initialized() {
        /**
         * 构建全文索引
         */
        //索引保存到的路径
        System.out.println("开始初始化全文索引...");

        String path = ClassPathUtil.getClassPath();
        String indexDir = path+"/canton/cantonLucene";

        LuceneUtil indexer = null;
        int indexedNum = 0;
        //记录索引开始时间
        long startTime = System.currentTimeMillis();
        try {
            // 开始构建索引
            indexer = new LuceneUtil();
            indexedNum = indexer.indexAll(indexDir);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (null != indexer) {
                    indexer.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        //记录索引结束时间
        long endTime = System.currentTimeMillis();
        System.out.println("索引耗时" + (endTime - startTime) + "毫秒");
        System.out.println("共索引了" + indexedNum + "个文件");




    }
//    public  static void luceneInitialized() {
//        /**
//         * 构建全文索引
//         */
//        //索引保存到的路径
//        System.out.println("开始初始化全文索引...");
//        File directory = new File("src/main/resources");
//        String path = null;
//        try {
//            path = directory.getCanonicalPath();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        String indexDir = path+"/lucene";
//
//        //需要索引的文件数据存放的目录
//        String dataDir = path+"/book";
//
//        OldLuceneUtil indexer = null;
//        int indexedNum = 0;
//        //记录索引开始时间
//        long startTime = System.currentTimeMillis();
//        try {
//            // 开始构建索引
//            indexer = new OldLuceneUtil(indexDir);
//            indexedNum = indexer.indexAll(dataDir);
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            try {
//                if (null != indexer) {
//                    indexer.close();
//                }
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }
//        //记录索引结束时间
//        long endTime = System.currentTimeMillis();
//        System.out.println("索引耗时" + (endTime - startTime) + "毫秒");
//        System.out.println("共索引了" + indexedNum + "个文件");
//
//
//
//
//    }
}
