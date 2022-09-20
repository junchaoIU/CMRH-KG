package com.canton.model.ontology;

/**
 * @Auther ChenX
 * @Date 2020.8.29
 **/
public class Clearance {

    private String subject;

    private String subjectClassName;

    private String predicate;

    private String predicateClassName;

    private String object;

    private String objectClassName = "null";

    private String subject2;

    private String subject2ClassName;


    private String namedGraph;

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getSubjectClassName() {
        return subjectClassName;
    }

    public void setSubjectClassName(String subjectClassName) {
        this.subjectClassName = subjectClassName;
    }

    public String getPredicate() {
        return predicate;
    }

    public void setPredicate(String predicate) {
        this.predicate = predicate;
    }

    public String getPredicateClassName() {
        return predicateClassName;
    }

    public void setPredicateClassName(String predicateClassName) {
        this.predicateClassName = predicateClassName;
    }

    public String getObject() {
        return object;
    }

    public void setObject(String object) {
        this.object = object;
    }

    public String getObjectClassName() {
        return objectClassName;
    }

    public void setObjectClassName(String objectClassName) {
        this.objectClassName = objectClassName;
    }

    public String getSubject2() {
        return subject2;
    }

    public void setSubject2(String subject2) {
        this.subject2 = subject2;
    }

    public String getSubject2ClassName() {
        return subject2ClassName;
    }

    public void setSubject2ClassName(String subject2ClassName) {
        this.subject2ClassName = subject2ClassName;
    }

    public String getNamedGraph() {
        return namedGraph;
    }

    public void setNamedGraph(String namedGraph) {
        this.namedGraph = namedGraph;
    }
}
