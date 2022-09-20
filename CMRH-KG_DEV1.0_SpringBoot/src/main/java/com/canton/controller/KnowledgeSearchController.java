package com.canton.controller;

import com.canton.dao.entity.EchartsData;
import com.canton.service.KnowledgeSearchService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/**
 * @Auther ChenX
 * @Date 2020.5.7
 **/
@Controller
@RequestMapping(value = "/knowledgeSearch", produces="application/json;charset=utf-8")
@CrossOrigin//允许跨域访问
public class KnowledgeSearchController {
    @Autowired
    private KnowledgeSearchService graphService;

    @GetMapping("/getGraph")
    @ApiOperation(value="获取全部图谱", notes="获取全部图谱")
    @ResponseBody
    public EchartsData getGraph() {
        return graphService.getGraph();
    }

    @PostMapping("/getkeyword")
    @ApiOperation(value="实体检索", notes="传入keyword")
    @ResponseBody
    public EchartsData getKeyword(@RequestParam("keyword") String keyword) {
        return graphService.getKeyword(keyword);
    }

    @PostMapping("/getAttribute")
    @ApiOperation(value="属性检索", notes="传入subject")
    @ResponseBody
    public EchartsData getAttribute(@RequestParam("subject") String subject) {
        return graphService.getAttribute(subject);
    }

    @PostMapping("getIndistinct")
    @ApiOperation(value="模糊检索", notes="传入subject")
    @ResponseBody
    public Collection<String> getIndistinct(@RequestParam("keyword") String keyword)
    {
        return graphService.getIndistinct(keyword);
    }
}
