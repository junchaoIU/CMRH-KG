package com.canton.service.impl;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.analysis.tokenattributes.OffsetAttribute;
import org.apache.lucene.analysis.util.CharArraySet;
import org.apache.lucene.analysis.util.WordlistLoader;
import org.apache.lucene.util.IOUtils;
import org.junit.jupiter.api.Test;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class CustomSmartChineseAnalyzerTest {
    @Test
    void test_custom_smart_chinese_analyzer() throws IOException {
        String text = "孙中山 相关事件 辛亥革命";
        CharArraySet stopWords = CharArraySet.unmodifiableSet(WordlistLoader.getWordSet(
                IOUtils.getDecodingReader(
                        new ClassPathResource("stopwords.txt").getInputStream(),
                        StandardCharsets.UTF_8)));
        List<String> words = Collections.singletonList("辛亥革命");
        Analyzer analyzer = new CustomSmartChineseAnalyzer(stopWords, words);
        TokenStream tokenStream = analyzer.tokenStream("testField", text);

        OffsetAttribute offsetAttribute = tokenStream.addAttribute(OffsetAttribute.class);
        tokenStream.reset();

        List<String> tokens = new ArrayList<>();
        while (tokenStream.incrementToken()) {
            tokens.add(offsetAttribute.toString());
        }
        tokenStream.end();

        System.out.println(String.format("tokens:%s", tokens));
    }

}