package com.canton.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;

/**
 * @Auther ChenX
 * @Date 2020.4.26
 **/
@Component
public class InitializedUtil {

    /**
     * 配置本体配置文件
     */

    @Value("${ontology.uri}")
    private String uri;

    @Value("${ontology.url}")
    private String url;

    @Value("${ontology.root}")
    private String root;

    @Value("${lucene.book-path}")
    private String book;

    @Value("${lucene.lucene-path}")
    private String lucene;


    @Value("#{'${ontology.allowl}'.split(',')}")
    List ontology;

    private static List myontology;
    private static String myUri;
    private static String myUrl;
    private static String myRoot;
    private static String myBook;
    private static String myLucene;

    @PostConstruct
    public void getyml() {
        myontology=this.ontology;
        myUri = this.uri;
        myUrl = this.url;
        myRoot = this.root;
        myBook = this.book;
        myLucene = this.lucene;


    }

    public List getOntology() {
        return ontology;
    }

    public void setOntology(List ontology) {
        this.ontology = ontology;
    }

    public static List getMyontology() {
        return myontology;
    }

    public static void setMyontology(List myontology) {
        InitializedUtil.myontology = myontology;
    }



    public static String getMyUri() {
        return myUri;
    }

    public static void setMyUri(String myUri) {
        InitializedUtil.myUri = myUri;
    }

    public static String getMyUrl() {
        return myUrl;
    }

    public static void setMyUrl(String myUrl) {
        InitializedUtil.myUrl = myUrl;
    }


    public static String getMyRoot() {
        return myRoot;
    }

    public static void setMyRoot(String myRoot) {
        InitializedUtil.myRoot = myRoot;
    }

    public static String getMyBook() {
        return myBook;
    }

    public static void setMyBook(String myBook) {
        InitializedUtil.myBook = myBook;
    }

    public static String getMyLucene() {
        return myLucene;
    }

    public static void setMyLucene(String myLucene) {
        InitializedUtil.myLucene = myLucene;
    }
}
