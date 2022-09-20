package com.canton.service.impl;

import com.canton.dao.entity.Relation;
import com.canton.service.RelationSearchService;
import com.canton.model.ontology.Statement;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * 关系检索Service类。
 * 
 * @author Rosahen
 * @version 1.0
 */ 
@SuppressWarnings("rawtypes")
@Service
public class RelationSearchServiceImpl extends BaseService implements RelationSearchService{

	@Override
	public List<Relation> query(String subject, String object) {
		// TODO Auto-generated method stub
		
		String sparqlStr =
				
				"SELECT ?subject ?predicate ?object " 
				+"WHERE {" 
				+" {?subject ?predicate ?object."
				+" FILTER (REGEX(STR(?subject), '#"+subject+"$'))."
				+" FILTER (REGEX(STR(?object), '#"+object+"$'))."
				+" FILTER (!REGEX(STR(?subject), 'Relation'))."
				+" FILTER (!REGEX(STR(?object), 'Relation')).}"
				+" UNION {?subject ?predicate ?object."
				+" FILTER (REGEX(STR(?object), '#"+subject+"$'))."
				+" FILTER (REGEX(STR(?subject), '#"+object+"$'))."
				+" FILTER (!REGEX(STR(?subject), 'Relation'))."
				+" FILTER (!REGEX(STR(?object), 'Relation')).}"
				+ "}";
		
		Collection<Statement> statements = getOntologyResolver().query(sparqlStr);

		if(statements.size()>0)
		{
			return relationsearchData(statements);
		}
		
		else
		{	System.out.println("两个人没有关系");
			return null;
		}
	}
	public static List<Relation> relationsearchData(Collection<Statement> statements) {

		Iterator<Statement> iter = statements.iterator();


		List<Relation> list = new ArrayList();
		while (iter.hasNext()) {
			Statement statement = iter.next();
			Relation relation = new Relation();
			relation.setSubject(statement.getSubject());
			relation.setPredicate(statement.getPredicate());
			relation.setObject(statement.getObject());
			list.add(relation);

		}
		return list;
	}



}
