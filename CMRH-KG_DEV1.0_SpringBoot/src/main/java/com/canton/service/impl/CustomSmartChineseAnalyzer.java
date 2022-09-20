package com.canton.service.impl;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.analysis.Tokenizer;
import org.apache.lucene.analysis.cn.smart.HMMChineseTokenizer;
import org.apache.lucene.analysis.core.LowerCaseFilter;
import org.apache.lucene.analysis.core.StopFilter;
import org.apache.lucene.analysis.en.PorterStemFilter;
import org.apache.lucene.analysis.util.CharArraySet;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Auther ChenX
 * @Date 2
 **/
public class CustomSmartChineseAnalyzer extends Analyzer {

    private CharArraySet extendWords;

    private List<String> words;

    private CharArraySet stopWords;

    public CustomSmartChineseAnalyzer(CharArraySet stopWords, List<String> words) {
        this.stopWords = stopWords;
        this.words = words;
    }

    @Override
    public Analyzer.TokenStreamComponents createComponents(String fieldName) {
        final Tokenizer tokenizer = new HMMChineseTokenizer();
        TokenStream result = tokenizer;
        result = new LowerCaseFilter(result);

        result = new PorterStemFilter(result);

        if (!stopWords.isEmpty()) {
            result = new StopFilter(result, stopWords);
        }

        if (!words.isEmpty()) {
            result = new ExtendWordFilter(result, words);
        }

        return new TokenStreamComponents(tokenizer, result);
    }



}
