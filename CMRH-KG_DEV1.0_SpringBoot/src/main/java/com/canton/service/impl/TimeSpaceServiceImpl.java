package com.canton.service.impl;

import com.canton.dao.entity.EchartsData;
import com.canton.dao.entity.EchartsLink;
import com.canton.dao.entity.EchartsNode;
import com.canton.model.ontology.Clearance;
import com.canton.model.ontology.Statement;
import com.canton.service.TimeSpaceService;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * @Auther ChenX
 * @Date 2020.8.21
 **/
@Service
public class TimeSpaceServiceImpl extends BaseService implements TimeSpaceService {
    @Override
    public EchartsData getTime(String keyword) {
        String rank = "<http://www.owl-ontologies.com/Time.owl#排序时间>";

 /**       String sparqlStr =
                        "SELECT  ?s1 ?s2 ?s3 " +
                        "Where {" +
                        " ?s1 ?s2 ?s3." +
                        " FILTER (REGEX(STR(?s3), 'Time'))." +
                        " FILTER (REGEX(STR(?s3), '"+keyword+"'))." +
                        " ?s3 "+rank+" ?s4.}" +
                        "order by ?s4";
  **/
            String sparqlStr =
                    "  SELECT ?s1 ?s2 ?s3 " +
                            "   Where {" +
                            "   { { ?s1 ?s2 ?s3 " +
                            "   FILTER (REGEX(STR(?s3), 'Time'))." +
                            "   FILTER (REGEX(STR(?s3), '"+keyword+"')).}" +
                            "  optional{?s1 ?s4 ?s5." +
                            "   FILTER (REGEX(STR(?s5), 'Location'))." +
                            "   FILTER (REGEX(STR(?s5), '/*')).}}" +
                            "  UNION" +
                            "  {{ ?s1 ?s4 ?s5 " +
                            "  FILTER (REGEX(STR(?s5), 'Time'))." +
                            "  FILTER (REGEX(STR(?s5), '"+keyword+"')).}" +
                            "  optional{    ?s1 ?s2 ?s3." +
                            "  FILTER (REGEX(STR(?s3), 'Location'))." +
                            "  FILTER (REGEX(STR(?s3), '/*')).}}" +
                            "  FILTER (!REGEX(STR(?s3), 'NULL'))."+
                            "  }";




        Collection<Statement> statements = getOntologyResolver().query(sparqlStr);

        if (statements.size() > 0) {

            return subjectsearchData(statements);

        }
        else {
                System.out.println("这个时间没有任何事情发生");
                return null;
        }

        }

    @Override
    public List<List> getTimeRecallDetail(String keyword) {
        String rank = "<http://www.owl-ontologies.com/Time.owl#排序时间>";
        String comment = "<http://www.w3.org/2000/01/rdf-schema#comment>";

        /**String sparqlStr =
                "SELECT ?s1 ?s3 ?s5 " +
                        "Where {" +
                        "  ?s1 ?s2 ?s3." +
                        " FILTER (REGEX(STR(?s2), '时间'))." +
                        " FILTER (REGEX(STR(?s3), '"+keyword+"'))." +
                        " FILTER (REGEX(STR(?s1), 'Recall'))." +
                        " ?s3 "+rank+" ?s4." +
                        " ?s1 "+comment+"?s5.}" +
                        " order by ?s4 ";
**/
        String sparqlStr =
                "  SELECT ?s1 ?s3 ?s5 ?s7 " +
                        "   Where { " +
                        "   { { ?s1 ?s2 ?s3  " +
                        "    FILTER (REGEX(STR(?s3), 'Time')).\n" +
                        "    FILTER (REGEX(STR(?s3), '"+keyword+"')).}\n" +
                        "   optional{?s1 ?s4 ?s5.\n" +
                        "      FILTER (REGEX(STR(?s5), 'Location')).\n" +
                        "      FILTER (REGEX(STR(?s5), '/*')).}}\n" +
                        " ?s3 "+rank+" ?s6\t.\n" +
                        "  ?s1 "+comment+" ?s7}\n" +
                        " order by ?s6";

        Collection<Clearance> statements = getOntologyResolver().Fquery(sparqlStr);

        if (statements.size() > 0) {

            Iterator<Clearance> iter = statements.iterator();
            List<List> listt = new ArrayList();
            while (iter.hasNext()) {
                Clearance statement = iter.next();
                List list = new ArrayList();
                list.add(statement.getSubject());
                list.add(statement.getPredicate());
                list.add(statement.getObject());
                list.add(statement.getSubject2());
                listt.add(list);

            }
        return listt;
        }
        else {
            System.out.println("这个时间没有任何事情发生");
            return null;
        }
    }

    @Override
    public EchartsData getSpace(String keyword) {
        /**
        String sparqlStr =
                "SELECT ?s1 ?s2 ?s3 " +
                        "Where {" +
                        "  ?s1 ?s2 ?s3." +
                        "FILTER (REGEX(STR(?s3), 'Location'))."+
                        " FILTER (REGEX(STR(?s3), '#"+keyword+"$')).}";
         **/
        String sparqlStr =
                "SELECT ?s1 ?s2 ?s3 " +
                        "   Where {" +
                        "  {{ ?s1 ?s2 ?s3 " +
                        "  FILTER (REGEX(STR(?s3), 'Location'))." +
                        "  FILTER (REGEX(STR(?s3), '"+keyword+"')).}" +
                        "  optional{?s1 ?s4 ?s5." +
                        "  FILTER (REGEX(STR(?s5), 'Time'))." +
                        "  FILTER (REGEX(STR(?s5), '/*')).}}" +
                        "  UNION" +
                        "  {{ ?s1 ?s4 ?s5 " +
                        "   FILTER (REGEX(STR(?s5), 'Location'))." +
                        "  FILTER (REGEX(STR(?s5), '"+keyword+"')).}" +
                        "  optional{    ?s1 ?s2 ?s3." +
                        "  FILTER (REGEX(STR(?s3), 'Time'))." +
                        "  FILTER (REGEX(STR(?s3), '/*')).}}" +
                        "  FILTER (!REGEX(STR(?s3), 'NULL'))." +
                        "  }";

        Collection<Statement> statements = getOntologyResolver().query(sparqlStr);

        if (statements.size() > 0) {

            return subjectsearchData(statements);

        }
        else {
            System.out.println("这个地点没有任何事情发生");
            return null;
        }
    }

    @Override
    public List<List> getSpaceRecallDetail(String keyword) {
        String rank = "<http://www.owl-ontologies.com/Time.owl#排序时间>";
        String comment = "<http://www.w3.org/2000/01/rdf-schema#comment>";

        String sparqlStr =
                " SELECT ?s1 ?s5  ?s3  ?s6 " +
                        "Where {  {\n" +
                        "    { ?s1 ?s2 ?s3  \n" +
                        "      FILTER (REGEX(STR(?s3), 'Location')).  \n" +
                        "      FILTER (REGEX(STR(?s3), '"+keyword+"')).\n" +
                   //     "       FILTER (REGEX(STR(?s1), 'Recall')).\n" +
                        "     ?s1 "+comment+" ?s6.\n" +
                        "    optional\n" +
                        "    {?s1 ?s4 ?s5.  \n" +
                        "      FILTER (REGEX(STR(?s5), 'Time')).  \n" +
                        "          FILTER (REGEX(STR(?s5), '/*')).}\n" +
                        "     } \n" +
                        "  } \n" +
                        " }";

        Collection<Clearance> statements = getOntologyResolver().Fquery(sparqlStr);

        if (statements.size() > 0) {

            Iterator<Clearance> iter = statements.iterator();
            List<List> listt = new ArrayList();
            while (iter.hasNext()) {
                Clearance statement = iter.next();
                List list = new ArrayList();
                list.add(statement.getSubject());
                list.add(statement.getPredicate());
                list.add(statement.getObject());
                list.add(statement.getSubject2());
                listt.add(list);

            }
            return listt;
        }
        else {
            System.out.println("这个地点没有任何事情发生");
            return null;
        }
    }

    @Override
    public EchartsData getTimeSpace(String time,String space) {
        String sparqlStr =
                "SELECT ?s1 ?s2 ?s3 " +
                        "  Where {" +
                        "  { ?s1 ?s2 ?s3 " +
                        "  FILTER (REGEX(STR(?s3), 'Time'))." +
                        "  FILTER (REGEX(STR(?s3), '"+time+"'))." +
                        "  ?s1 ?s4 ?s5." +
                        "  FILTER (REGEX(STR(?s5), 'Location'))." +
                        "  FILTER (REGEX(STR(?s5), '"+space+"')).}" +
                        "UNION" +
                        "  { ?s1 ?s2 ?s3" +
                        "  FILTER (REGEX(STR(?s3), 'Location'))." +
                        "  FILTER (REGEX(STR(?s3), '"+space+"'))." +
                        "  ?s1 ?s4 ?s5." +
                        "  FILTER (REGEX(STR(?s5), 'Time'))." +
                        "  FILTER (REGEX(STR(?s5), '"+time+"'))." +
                        "}} ";

        Collection<Statement> statements = getOntologyResolver().query(sparqlStr);

        if (statements.size() > 0) {

            return subjectsearchData(statements);

        }
        else {
            System.out.println("这个时间/地点没有任何事情发生");
            return null;
        }
    }

    @Override
    public List<List> getTimeSpaceRecallDetail(String time, String space) {
        String rank = "<http://www.owl-ontologies.com/Time.owl#排序时间>";
        String comment = "<http://www.w3.org/2000/01/rdf-schema#comment>";

        /**String sparqlStr =
         "SELECT ?s1 ?s3 ?s5 " +
         "Where {" +
         "  ?s1 ?s2 ?s3." +
         " FILTER (REGEX(STR(?s2), '时间'))." +
         " FILTER (REGEX(STR(?s3), '"+keyword+"'))." +
         " FILTER (REGEX(STR(?s1), 'Recall'))." +
         " ?s3 "+rank+" ?s4." +
         " ?s1 "+comment+"?s5.}" +
         " order by ?s4 ";
         **/
        String sparqlStr =
                "  SELECT ?s1  ?s3 ?s5  ?s7\n" +
                        "Where {  { ?s1 ?s2 ?s3   \n" +
                        "    FILTER (REGEX(STR(?s3), 'Time')).  \n" +
                        "    FILTER (REGEX(STR(?s3), '"+time+"')). \n" +
             //           "     FILTER (REGEX(STR(?s1), 'Recall')). \n" +
                        "    ?s1 "+comment+" ?s7.\n" +
                        "    ?s3 "+rank+" ?s6.\n" +
                        "    ?s1 ?s4 ?s5.  \n" +
                        "    FILTER (REGEX(STR(?s5), 'Location')).  \n" +
                        "    FILTER (REGEX(STR(?s5), '"+space+"')).\n" +
                        "  }\n" +
                        "} \n" +
                        "order by ?s6";

        Collection<Clearance> statements = getOntologyResolver().Fquery(sparqlStr);

        if (statements.size() > 0) {

            Iterator<Clearance> iter = statements.iterator();
            List<List> listt = new ArrayList();
            while (iter.hasNext()) {
                Clearance statement = iter.next();
                List list = new ArrayList();
                list.add(statement.getSubject());
                list.add(statement.getPredicate());
                list.add(statement.getObject());
                list.add(statement.getSubject2());
                listt.add(list);

            }
            return listt;
        }
        else {
            System.out.println("这个时间没有任何事情发生");
            return null;
        }
    }

    @Override
    public EchartsData getPeriodTime(String time1, String time2) {
        String rank = "<http://www.owl-ontologies.com/Time.owl#排序时间>";

        String sparqlStr =
                " SELECT ?subject ?relation ?composite " +
                        "WHERE { ?subject ?relation ?composite " +
                        " FILTER (REGEX(STR(?subject),'/*$'))." +
                        " {SELECT ?composite ?attribute1 ?value1 " +
                        " WHERE { ?composite ?attribute1 ?value1. " +
                        " FILTER (REGEX(STR(?attribute1),'时间'))." +
                        " FILTER (?value1<="+time2+").}}" +
                        " {SELECT ?composite ?attribute2 ?value2 " +
                        " WHERE { ?composite ?attribute2 ?value2. " +
                        " FILTER (REGEX(STR(?attribute2),'时间'))." +
                        " FILTER (?value2>="+time1+").}}" +
                        " }";

        Collection<Statement> statements = getOntologyResolver().query(sparqlStr);

        if (statements.size() > 0) {

            return subjectsearchData(statements);

        }
        else {
            System.out.println("这个时间段没有任何事情发生");
            return null;
        }

    }

    @Override
    public List<List> getPeriodRecallDetail(String time1, String time2) {
        String rank = "<http://www.owl-ontologies.com/Time.owl#排序时间>";
        String comment = "<http://www.w3.org/2000/01/rdf-schema#comment>";

        String sparqlStr =
                "SELECT ?subject  ?composite ?s3 ?c \n" +
                        "WHERE { ?subject ?relation ?composite  \n" +
                        "  FILTER (REGEX(STR(?subject),'/*$')).\n" +
            //            "  FILTER (REGEX(STR(?subject),'Recall')). \n" +
                        "  ?composite "+rank+" ?s4.\n" +
                        "  ?subject"+comment+" ?c.\n" +
                        "  optional{?subject ?s2 ?s3\n" +
                        "  FILTER (REGEX(STR(?s3),'Location')).  }\n" +
                        "    {SELECT ?composite ?attribute1 ?value1  \n" +
                        "    WHERE { ?composite ?attribute1 ?value1.  \n" +
                        "    FILTER (REGEX(STR(?attribute1),'时间')). \n" +
                        "    FILTER (?value1<="+time2+").}} \n" +
                        "    {SELECT ?composite ?attribute2 ?value2  \n" +
                        "    WHERE { ?composite ?attribute2 ?value2.  \n" +
                        "    FILTER (REGEX(STR(?attribute2),'时间')). \n" +
                        "    FILTER (?value2>="+time1+").}} \n" +
                        "\n" +
                        "}\n" +
                        "order by ?s4";

        Collection<Clearance> statements = getOntologyResolver().Fquery(sparqlStr);

        if (statements.size() > 0) {

            Iterator<Clearance> iter = statements.iterator();
            List<List> listt = new ArrayList();
            while (iter.hasNext()) {
                Clearance statement = iter.next();
                List list = new ArrayList();
                list.add(statement.getSubject());
                list.add(statement.getPredicate());
                list.add(statement.getObject());
                list.add(statement.getSubject2());
                listt.add(list);

            }
            return listt;
        }
        else {
            System.out.println("这个时间段没有任何事情发生");
            return null;
        }
    }

    public static EchartsData subjectsearchData(Collection<Statement> statements) {

        Iterator<Statement> iter = statements.iterator();
        EchartsData data = new EchartsData();
        Set<EchartsNode> nodes = new LinkedHashSet<>();
        Set<EchartsLink> links = new LinkedHashSet<>();
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
    }

