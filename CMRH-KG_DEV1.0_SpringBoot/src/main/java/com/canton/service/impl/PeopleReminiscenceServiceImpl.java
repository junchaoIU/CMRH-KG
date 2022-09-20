package com.canton.service.impl;

import com.canton.dao.entity.Reminiscence;
import com.canton.model.ontology.Clearance;
import com.canton.model.ontology.Statement;
import com.canton.service.PeopleReminiscenceService;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * @Auther ChenX
 * @Date 2020.4.14
 **/
@Service
public class PeopleReminiscenceServiceImpl extends BaseService implements PeopleReminiscenceService {


    @Override
    public Reminiscence getPeople(String people) {
        String parentEvent=  "<http://www.owl-ontologies.com/Recall.owl#"+people+"_回溯>";
        String time =  "<http://www.owl-ontologies.com/Recall.owl#time>";
        String location =  "<http://www.owl-ontologies.com/Recall.owl#回溯地点>";
        String LatitudeALongitude =  "<http://www.owl-ontologies.com/Location.owl#经纬度>";
        String comment =  "<http://www.w3.org/2000/01/rdf-schema#comment>";

        String sparqlStr =
                "SELECT DISTINCT  ?childEvent ?time ?location ?LatitudeALongitude " +
                        "WHERE {" +
                        "  ?subject ?predicate "+parentEvent+"." +
                        "  ?subject "+comment+" ?childEvent. " +
                        "  ?subject "+time+" ?time." +
                        "  ?subject "+location+" ?location. " +
                        "  ?location "+LatitudeALongitude+" ?LatitudeALongitude }" +
                        "  ORDER BY ?subject";


        Collection<Clearance> statements = getOntologyResolver().Fquery(sparqlStr);

        if (statements.size() > 0) {
            return peoplereminiscenceData(statements,people);
        } else {
            System.out.println("无检索people");
            return null;
        }
    }


    public static Reminiscence peoplereminiscenceData(Collection<Clearance> statements, String people) {

        Iterator<Clearance> iter = statements.iterator();
        String space = null;
        String data = "";
        int i = 0;

        List<List> listtt = new ArrayList();
        while (iter.hasNext()) {
            List<List> listt = new ArrayList();
            Clearance statement = iter.next();
            List list = new ArrayList();
            //记录一下日期
            System.out.println(statement.getPredicate());
            System.out.println(data);
//            if (data.equals(statement.getPredicate()))
//            {
//                listtt.remove(listtt.size()-1);
//                space = space.concat("、"+statement.getObject());
//            }
//            else { space = statement.getObject(); }
            space = statement.getObject();
            //记录日期地点
            data = statement.getPredicate();

            list.add(statement.getPredicate());
            list.add(space);
            list.add(statement.getSubject2());
            list.add(people);
            list.add(statement.getSubject());
            listt.add(list);
            listtt.add(listt);
            i = i+1;
        }
        Reminiscence reminiscence = new Reminiscence();
        reminiscence.setSeries(listtt);
        reminiscence.setCounties(Collections.singletonList(people));
        return reminiscence;
    }
}
