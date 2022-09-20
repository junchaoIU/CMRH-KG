package com.canton.service;

import com.canton.dao.entity.Lucene;

import java.util.List;

public interface oldLuceneService {
     List<Lucene> getKeyword(String keyword) throws Exception;
     List<Lucene> SemanticAnalysis(String keyword) throws Exception;

}
