package com.canton.service;

import com.canton.dao.entity.EchartsData;

import java.util.Collection;

public interface KnowledgeSearchService {
    EchartsData getGraph();
    EchartsData getKeyword(String keyword);
    EchartsData getAttribute(String subject);
    Collection<String> getIndistinct(String keyword);
}
