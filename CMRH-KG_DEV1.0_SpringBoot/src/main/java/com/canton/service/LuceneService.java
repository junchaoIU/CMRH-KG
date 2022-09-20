package com.canton.service;

import com.canton.dao.entity.Lucene;
import com.canton.dao.entity.Lucene2;

import java.util.List;

public interface LuceneService {
     List<Lucene2> getKeyword(String keyword) throws Exception;
     List<Lucene> SemanticAnalysis(String keyword) throws Exception;

}
