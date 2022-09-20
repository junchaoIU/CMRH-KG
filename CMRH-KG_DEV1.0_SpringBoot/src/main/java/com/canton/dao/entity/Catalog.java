package com.canton.dao.entity;

import lombok.Data;

import java.util.List;

/**
 * @Auther ChenX
 * @Date 2020.5.6
 * 目录entity
 **/
@Data
public class Catalog {
    private String title;
    private String key;
    private Boolean isLeaf = true;
    private List<Catalog> children;

    public Catalog(String localName) {
        super();
        this.title = localName;
        this.key = localName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Boolean getLeaf() {
        return isLeaf;
    }

    public void setLeaf(Boolean isleaf) {
        isLeaf = isleaf;
    }

    public List<Catalog> getChildren() {
        return children;
    }

    public void setChildren(List<Catalog> children) {
        this.children = children;
    }

}
