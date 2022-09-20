package com.canton.utils;

import java.io.File;
import java.io.IOException;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.analysis.tokenattributes.CharTermAttribute;


/**
 * 扩展 IKAnalyzer的词典测试
 *
 *
 */
public class ExtendedIKAnalyzerDicTest {

    private static void doToken(TokenStream ts) throws IOException {
        ts.reset();
        CharTermAttribute cta = ts.getAttribute(CharTermAttribute.class);
        while (ts.incrementToken()) {
            System.out.print(cta.toString() + "|");
        }
        System.out.println();
        ts.end();
        ts.close();
    }

    public static void main(String[] args) throws IOException {
        String chineseText = "孙中山 儿子 三元里抗英斗争";
        // IKAnalyzer 细粒度切分
        try (Analyzer ik = new IKAnalyzerLuceneUtil();) {
            TokenStream ts = ik.tokenStream("content", chineseText);
            System.out.println("IKAnalyzer中文分词器 细粒度切分，中文分词效果：");
            doToken(ts);
        }

        // IKAnalyzer 智能切分
        try (Analyzer ik = new IKAnalyzerLuceneUtil(true);) {
            TokenStream ts = ik.tokenStream("content", chineseText);
            System.out.println("IKAnalyzer中文分词器 智能切分，中文分词效果：");
            doToken(ts);
        }
        Analyzer ik = new IKAnalyzerLuceneUtil(true);
        TokenStream ts = ik.tokenStream("content", chineseText);
        System.out.println("IKAnalyzer中文分词器 智能切分，中文分词效果：");
        System.out.println(ts.getAttributeClassesIterator().toString());
        doToken(ts);
    }
}