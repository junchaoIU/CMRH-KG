package com.canton.utils;

import org.apache.lucene.analysis.Analyzer;
/**
 * @Auther ChenX
 * @Date
 **/
public class IKAnalyzerLuceneUtil extends Analyzer {

    private boolean useSmart = false;

    public IKAnalyzerLuceneUtil() {
        this(false);
    }

    public IKAnalyzerLuceneUtil(boolean useSmart) {
        super();
        this.useSmart = useSmart;
    }

    public boolean isUseSmart() {
        return useSmart;
    }

    public void setUseSmart(boolean useSmart) {
        this.useSmart = useSmart;
    }

    @Override
    protected TokenStreamComponents createComponents(String fieldName) {
        IKTokenizerLuceneUtil tk = new IKTokenizerLuceneUtil(this.useSmart);
        return new TokenStreamComponents(tk);
    }

}
