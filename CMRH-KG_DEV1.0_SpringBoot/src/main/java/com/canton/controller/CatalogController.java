package com.canton.controller;

import com.canton.dao.entity.Catalog;
import com.canton.service.CatalogService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Auther ChenX
 * @Date 2020.5.6
 **/
@Controller
@CrossOrigin//允许跨域访问
@RequestMapping(value = "/Catalog", produces="application/json;charset=utf-8")
public class CatalogController {
    @Autowired
    private CatalogService testService;
    @GetMapping("getCatalog")
    @ApiOperation(value="获取顶层目录", notes="获取顶层目录")
    @ResponseBody
    public List<Catalog> getCatalog() {
        return testService.getTopCatalog();
    }

//    @GetMapping("getCatalog")
//    @ApiOperation(value="获取二级目录", notes="获取二级目录")
//    @ResponseBody
//    public List<Catalog> getChildrenCatalog(@RequestParam("topClass") String topClass) {
//        return testService.getChildrenCatalog(topClass);
//    }

}
