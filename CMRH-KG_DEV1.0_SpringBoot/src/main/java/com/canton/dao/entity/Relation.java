package com.canton.dao.entity;

/**
 * @Auther ChenX
 * @Date 2020.8.11
 **/
public class Relation {
    private String subject;
    private String predicate;
    private String object;

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getPredicate() {
        return predicate;
    }

    public void setPredicate(String predicate) {
        this.predicate = predicate;
    }

    public String getObject() {
        return object;
    }

    public void setObject(String object) {
        this.object = object;
    }
}
