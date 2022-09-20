package com.canton.service;


import com.canton.dao.entity.Relation;

import java.util.List;

public interface RelationSearchService {


	List<Relation> query(String subject, String object);

}
