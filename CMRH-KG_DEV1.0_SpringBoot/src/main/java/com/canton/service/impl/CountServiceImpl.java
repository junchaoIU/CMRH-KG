package com.canton.service.impl;

import com.canton.dao.entity.Book;
import com.canton.dao.mapper.BookMapper;
import com.canton.dao.utils.DefaultOntModel;
import com.canton.service.CountService;
import com.canton.service.OntologyResolver;
import org.apache.jena.ontology.*;
import org.apache.jena.rdf.model.StmtIterator;
import org.apache.jena.util.iterator.ExtendedIterator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

/**
 * @Auther ChenX
 * @Date 2020.10.19
 **/
@Service
public class CountServiceImpl implements CountService {


    @Autowired
    private BookMapper bookMapper;


    @Async("countExecutor")
    public CompletableFuture<Integer> countBook()  {
        return CompletableFuture.completedFuture(bookMapper.getCountBook());
    }


    @Async("countExecutor")
    public CompletableFuture<Integer> countIndividual(){

        int individual = 0;
        OntModel ontModel = DefaultOntModel.getInstance().getOntModel();
        ExtendedIterator<Individual> individualsIter = ontModel.listIndividuals();
        while (individualsIter.hasNext()) {
            individualsIter.next();
            individual++;
        }

        return CompletableFuture.completedFuture(individual);
    }

    @Async("countExecutor")
    public CompletableFuture<Integer> countdataProperty() {

        int dataProperty = 0;
        OntModel ontModel = DefaultOntModel.getInstance().getOntModel();
        ExtendedIterator<DatatypeProperty> dataPropertysIter = ontModel.listDatatypeProperties();
        while (dataPropertysIter.hasNext()) {
            dataPropertysIter.next();
            dataProperty++;
        }

        return CompletableFuture.completedFuture(dataProperty);
    }

    @Async("countExecutor")
    public CompletableFuture<Integer> countobjectProperty() {

        int objectProperty = 0;
        OntModel ontModel = DefaultOntModel.getInstance().getOntModel();
        ExtendedIterator<ObjectProperty> objectPropertysIter = ontModel.listObjectProperties();
        while (objectPropertysIter.hasNext()) {
            objectPropertysIter.next();
            objectProperty++;
        }

        return CompletableFuture.completedFuture(objectProperty);
    }

    @Async("countExecutor")
    public CompletableFuture<Integer> countStatement() {

        int statement = 0;
        OntModel ontModel = DefaultOntModel.getInstance().getOntModel();
        StmtIterator statementsIter = ontModel.listStatements();
        while (statementsIter.hasNext()) {
            statementsIter.next();
            statement++;
        }

        return CompletableFuture.completedFuture(statement);
    }

}
