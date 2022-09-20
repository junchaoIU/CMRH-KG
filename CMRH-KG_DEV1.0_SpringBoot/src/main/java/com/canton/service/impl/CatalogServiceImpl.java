package com.canton.service.impl;

import com.canton.dao.entity.Catalog;
import com.canton.model.ontology.OntologyClass;
import com.canton.model.ontology.OntologyInstance;
import com.canton.service.CatalogService;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

/**
 * @Auther ChenX
 * @Date 2020.5.5
 **/
@Service
public class CatalogServiceImpl extends BaseService implements CatalogService {


    @Override
    public List<Catalog> getTopCatalog() {
        // TODO Auto-generated method stub

        //调用本体解析器的方法获取顶层类集合
        Collection<OntologyClass> classes = getOntologyResolver().getTopClasses();

        //创建类节点对象集合
        List<Catalog> catalogs = new ArrayList<Catalog>();

        Iterator<OntologyClass> iter = null;

        if (classes != null) iter = classes.iterator();

        //遍历顶层类集合
        while (iter != null && iter.hasNext()) {

            OntologyClass aClass = iter.next();

            //创建类节点对象
            Catalog catalog = new Catalog(aClass.getLocalName());
           if (aClass.getLocalName().equals("时间")) continue;
            //如果存在子类,那么该节点不是子节点
            else if (aClass.isHasSubClass())
            {   catalog.setLeaf(false);
               // catalog.setChildren(getChildrenCatalog(aClass.getLocalName()));
              //  System.out.println(getChildrenCatalog(aClass.getLocalName()).size());
                catalogs.add(catalog);
            }
            else
            {   catalog.setLeaf(false);
                //catalog.setChildren(getContent(catalog.getTitle()));
                catalogs.add(catalog);
                }
            }


        return catalogs;
    }

    @Override
    public List<Catalog> getChildrenCatalog(String topname) {
        // TODO Auto-generated method stub

        //将类节点名称封装成ontologyClass对象
        OntologyClass ontologyClass = new OntologyClass();

        //设置类名
        ontologyClass.setLocalName(topname);

        //调用本体解析器的方法获取子类集合
        Collection<OntologyClass> subClasses = getOntologyResolver().getSubClasses(ontologyClass);

        //创建类节点对象集合
        List<Catalog> catalogs = new ArrayList<>();

        Iterator<OntologyClass> iter = null;

        if(subClasses!=null) iter = subClasses.iterator();

        //遍历子类集合
        while(iter!=null&&iter.hasNext()) {

            OntologyClass aClass = iter.next();

            //创建类节点对象
            Catalog catalog = new Catalog(aClass.getLocalName());

            //如果存在子类,那么就该节点属于父节点
            if(aClass.isHasSubClass())
            {
                catalog.setLeaf(false);
                //catalog.setChildren(getChildrenCatalog(aClass.getLocalName()));
            }
            else
            {
                catalog.setLeaf(false);
               // catalog.setChildren(getContent(catalog.getTitle()));
                String size = "("+getContent(catalog.getTitle()).size()+")";
                catalog.setTitle(catalog.getTitle().concat(size));
                catalog.setKey(catalog.getKey().concat(size));


            }


            //将该节点添加到类节点对象集合中
            catalogs.add(catalog);

        }

        return catalogs;
    }
    @Override
    public List<Catalog> getContent(String name) {
        // TODO Auto-generated method stub

        //将类节点名称封装成ontologyClass对象
        OntologyClass ontologyClass = new OntologyClass();

        //设置类名
        ontologyClass.setLocalName(name);

        //调用本体解析器的方法获取实例集合
        Collection<OntologyInstance> instances = getOntologyResolver().getInstances(ontologyClass);


        //创建实例节点对象集合
        //Collection<CatalogInstanceNode> nodes = new ArrayList<CatalogInstanceNode>();
        List<Catalog> catalogs = new ArrayList<>();

        Iterator<OntologyInstance> iter = null;

        if(instances!=null) iter = instances.iterator();

        //遍历实例集合
        while(iter!=null&&iter.hasNext()) {

            OntologyInstance instance = iter.next();
            //为该实例创建一个实例节点对象
            //CatalogInstanceNode node = new CatalogInstanceNode(instance.getLocalName());

            Catalog catalog = new Catalog(instance.getLocalName());
            //添加到实例节点对象集合中
            catalogs.add(catalog);
        }

        return catalogs;
    }



}

