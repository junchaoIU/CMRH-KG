package com.canton.service;

import com.canton.dao.entity.Catalog;

import java.io.IOException;
import java.util.List;

public interface CatalogService {
    List<Catalog> getTopCatalog();
    List<Catalog> getChildrenCatalog(String topname);
    List<Catalog>getContent(String name);

}
