package com.canton.service.impl;

import com.canton.service.OntologyResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component(value="baseService")
public class BaseService {
    @Autowired
    private OntologyResolver ontologyResolver;



    public OntologyResolver getOntologyResolver() {
        return ontologyResolver;
    }

    public void setOntologyResolver(OntologyResolver ontologyResolver) {
        this.ontologyResolver = ontologyResolver;
    }
}
