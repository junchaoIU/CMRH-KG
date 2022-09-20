package com.canton.service.impl;

import com.canton.dao.entity.EchartsData;
import com.canton.dao.entity.EchartsLink;
import com.canton.dao.entity.EchartsNode;
import com.canton.model.ontology.Statement;
import com.canton.service.KnowledgeSearchService;
import com.canton.utils.NameSpaceClassMapUtil;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * @Auther ChenX
 * @Date 2020.5.7
 **/
@Service
public class KnowledgeSearchServiceImpl extends BaseService implements KnowledgeSearchService {
    @Override
    public EchartsData getGraph() {
        String sparqlStr =
                "SELECT DISTINCT ?subject ?predicate ?object "
                        +"WHERE {"
                        +" {?subject ?predicate ?object."
                        +"  FILTER (REGEX(STR(?subject), '#*$'))."
                        +"  FILTER (!REGEX(STR(?predicate), 'rdf'))."
                        +"  FILTER (!REGEX(STR(?predicate), 'type'))."
                        +"  FILTER (!REGEX(STR(?predicate), '生平事件'))."
                        +"  FILTER (!REGEX(STR(?predicate), '父事件'))."
                        +"  FILTER (!REGEX(STR(?predicate), '子事件'))."
                        +"  FILTER (!REGEX(STR(?predicate), '时间'))."
                        +"  FILTER (!REGEX(STR(?predicate), '相关事件'))."
                        +"  FILTER (!REGEX(STR(?predicate), 'inverseOf'))."
                        +"  FILTER (ISIRI(?subject))."
                        +"  FILTER (ISIRI(?predicate))."
                        +"  FILTER (ISIRI(?object)).}"
                        + "}";

        Collection<Statement> statements = getOntologyResolver().query(sparqlStr);
        String result = null;

        if (statements.size() > 0) {

            return subjectsearchData(statements);


        }
        else
        {
            System.out.println("无检索Graph");
            return null;
        }


    }

    @Override
    public EchartsData getKeyword(String keyword) {
        String sparqlStr =
                "SELECT DISTINCT ?subject ?predicate ?object "
                        + "WHERE {"
                        + " {?subject ?predicate ?object."
                        + " FILTER (REGEX(STR(?subject), '#" + keyword + "$'))."
                        +" FILTER (!REGEX(STR(?predicate), 'rdf'))."
                        +"  FILTER (!REGEX(STR(?predicate), 'Recall'))."
                        +" FILTER (ISIRI(?subject))."
                        +" FILTER (ISIRI(?object)).}"
                        + "}";

        Collection<Statement> statements = getOntologyResolver().query(sparqlStr);


        if (statements.size() > 0) {

            return subjectsearchData(statements);

        }
        else //判断空数据的本体类
        {
            String getClassName =
                    "SELECT DISTINCT ?subject ?predicate ?object" +
                            " WHERE {" +
                            " {?subject ?predicate ?object." +
                            " FILTER (REGEX(STR(?subject), '#"+ keyword +"$')). }}" +
                            "limit 1";
            Collection<Statement> statements2 = getOntologyResolver().query(getClassName);
            if (statements2.size() > 0) {
                System.out.println("检索到keyword，但是实体无数据");
                EchartsData data = new EchartsData();
                Set<EchartsNode> nodes = new HashSet<>();
                EchartsNode node = new EchartsNode();
                Iterator<Statement> iter = statements2.iterator();
                while (iter.hasNext()) {
                    Statement statement2 = iter.next();
                    node.setId(statement2.getSubject());
                    node.setLabel(statement2.getSubject());
                    node.setCategory(statement2.getSubjectClassName());
                    nodes.add(node);
                    data.setNodes(nodes);

                }
                return data;
            }
            else
            {
                System.out.println("无检索到keyword");
                return null;
            }

        }

    }

    @Override
    public EchartsData getAttribute(String subject) {
        String sparqlStr =
                "SELECT DISTINCT ?subject ?predicate ?object "
                        +"WHERE {"
                        +" {?subject ?predicate ?object."
                        +" FILTER (REGEX(STR(?subject), '#"+subject+"$'))."
                        +" FILTER (!ISIRI(?object)).}"
                        + "}";

        Collection<Statement> statements = getOntologyResolver().query(sparqlStr);

        if (statements.size() > 0) {

            return attributesearchData(statements);

        }
        else
        {
            System.out.println("无检索keyword");
            EchartsData data = new EchartsData();
            Set<EchartsNode> nodes = new HashSet<>();
            EchartsNode node = new EchartsNode();
            node.setId(subject);
            node.setLabel(subject);
            node.setCategory(NameSpaceClassMapUtil.getClassName(subject));
            nodes.add(node);
            data.setNodes(nodes);
            return data;
        }

    }

    @Override
    public Collection<String> getIndistinct(String keyword) {
        if(keyword!=null&&!keyword.equals("")) {

            String sparqlStr =
                    "SELECT DISTINCT ?subject ?predicate ?object "
                            +"WHERE {"
                            +" {?subject ?predicate ?object."
                            +" FILTER (REGEX(STR(?subject), '"+keyword+"'))."
                            +" FILTER (!REGEX(STR(?predicate), 'rdf'))."
                            +" FILTER (!REGEX(STR(?subject), 'Recall'))."
                            +" FILTER (!REGEX(STR(?object), 'Recall'))."
                            +" FILTER (ISIRI(?subject))."
                            +" FILTER (ISIRI(?object)).}"
                            +" UNION {?subject ?predicate ?object."
                            +" FILTER (REGEX(STR(?object), '"+keyword+"'))."
                            +" FILTER (!REGEX(STR(?predicate), 'rdf'))."
                            +" FILTER (!REGEX(STR(?subject), 'Recall'))."
                            +" FILTER (!REGEX(STR(?object), 'Recall'))."
                            +" FILTER (ISIRI(?subject))."
                            +" FILTER (ISIRI(?object)).}"
                            + "}";

            Collection<Statement> statements = getOntologyResolver().query(sparqlStr);

            Collection<String> knowledges = new LinkedHashSet<String>();

            Iterator<Statement> iter = statements.iterator();

            while(iter.hasNext()) {

                Statement statement = iter.next();

                if(statement.getSubject().equals(keyword)) {
                    knowledges.add(statement.getSubject());
                    break;
                }else if(statement.getObject().equals(keyword)) {
                    knowledges.add(statement.getObject());
                    break;
                }
            }

            if(knowledges.size()<10) {

                iter = statements.iterator();

                while(iter.hasNext()&&knowledges.size()<10) {

                    Statement statement = iter.next();

                    if(statement.getSubject().contains(keyword)&&knowledges.size()<10) knowledges.add(statement.getSubject());

                    if(statement.getObject().contains(keyword)&&knowledges.size()<10) knowledges.add(statement.getObject());
                }
            }
            return knowledges;
        }
        else{
            return null;}
    }


    public static EchartsData subjectsearchData(Collection<Statement> statements) {

        Iterator<Statement> iter = statements.iterator();
        EchartsData data = new EchartsData();
        Set<EchartsNode> nodes = new HashSet<>();
        Set<EchartsLink> links = new HashSet<>();
        while (iter.hasNext()) {
            EchartsNode node = new EchartsNode();
            EchartsNode node2 = new EchartsNode();
            EchartsLink link = new EchartsLink();
            Statement statement = iter.next();
            node.setId(statement.getSubject());
            node.setLabel(statement.getSubject());
            node.setCategory(statement.getSubjectClassName());
            node2.setId(statement.getObject());
            node2.setLabel(statement.getObject());
            node2.setCategory(statement.getObjectClassName());
            link.setSource(statement.getSubject());
            link.setTarget(statement.getObject());
            link.setCategory(statement.getPredicate());
            link.setLabel(statement.getPredicate());
            link.setSymbol("http://localhost:2222/"+statement.getObject()+".jpg");
            nodes.add(node);
            nodes.add(node2);
            links.add(link);
        }
        data.setNodes(nodes);
        data.setLinks(links);

        return data;
    }
    public static EchartsData attributesearchData(Collection<Statement> statements) {

        Iterator<Statement> iter = statements.iterator();
        EchartsData data = new EchartsData();
        Set<EchartsNode> nodes = new HashSet<>();
        Set<EchartsLink> links = new HashSet<>();
        while (iter.hasNext()) {
            EchartsNode node = new EchartsNode();
            EchartsNode node2 = new EchartsNode();
            EchartsLink link = new EchartsLink();
            Statement statement = iter.next();
            node.setId(statement.getSubject());
            node.setLabel(statement.getSubject());
            node.setCategory(statement.getSubjectClassName());
            node2.setId(statement.getObject());
            node2.setLabel(statement.getObject());
            node2.setCategory(statement.getPredicate());
            link.setSource(statement.getSubject());
            link.setTarget(statement.getObject());
            link.setCategory(statement.getPredicate());
            link.setLabel(statement.getPredicate());
            link.setSymbol(statement.getObject()+".jpg");
            nodes.add(node);
            nodes.add(node2);
            links.add(link);
        }
        data.setNodes(nodes);
        data.setLinks(links);

        return data;
    }

}
