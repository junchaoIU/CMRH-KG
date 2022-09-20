package com.canton.controller;

import com.canton.dao.entity.Lucene;
import com.canton.dao.entity.Lucene2;
import com.canton.service.oldLuceneService;
import com.canton.service.LuceneService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Auther ChenX
 * @Date 2020.4.7
*/
@Controller
@RequestMapping(value = "/lucene", produces="application/json;charset=utf-8")
@CrossOrigin//允许跨域访问
public class LuceneController {
    @Autowired
    private oldLuceneService oldLuceneService;
    @Autowired
    private LuceneService luceneService;

    @PostMapping("/getkeyword")
    @ApiOperation(value="全文检索", notes="通过lucene的全文检索")
    @ResponseBody
    public List<Lucene2> getKeyword(@RequestParam("keyword") String keyword) throws Exception
    {
        return luceneService.getKeyword(keyword);
    }

    @PostMapping("/getSemanticAnalysisKeyword")
    @ApiOperation(value="全文检索", notes="通过lucene的全文检索")
    @ResponseBody
    public List<Lucene> SemanticAnalysis(@RequestParam("keyword") String keyword) throws Exception
    {
        return luceneService.SemanticAnalysis(keyword);
    }
}
