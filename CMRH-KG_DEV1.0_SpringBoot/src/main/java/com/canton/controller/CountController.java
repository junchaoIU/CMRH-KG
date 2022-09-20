package com.canton.controller;

import com.canton.service.CountService;
import io.swagger.annotations.ApiOperation;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

/**
 * @Auther ChenX
 * @Date 2020.10.18
 **/
@RestController
@RequestMapping(value = "/count", produces="application/json;charset=utf-8")
@CrossOrigin//允许跨域访问
public class CountController {
    @Autowired
    private CountService countService;

    @GetMapping("/getCount")
    @SneakyThrows
    @ApiOperation(value="获取三元组 实体 关系 书籍数量")
    @ResponseBody
    public Map<String, Integer> getCount() throws Exception {
        CompletableFuture<Integer> statements = countService.countStatement();
        CompletableFuture<Integer> objectPropertys = countService.countobjectProperty();
        CompletableFuture<Integer> dataPropertys = countService.countdataProperty();
        CompletableFuture<Integer> individuals = countService.countIndividual();
        CompletableFuture<Integer> books = countService.countBook();
        // 等待所有任务都执行完
        CompletableFuture.allOf(statements,objectPropertys,dataPropertys,individuals,books).join();
        // 获取每个任务的返回结果
        Map<String, Integer> map = new HashMap<>();
        map.put("statement",statements.get());
        map.put("individual",individuals.get());
        map.put("objectProperty",objectPropertys.get());
        map.put("dataProperty",dataPropertys.get());
        map.put("books",books.get());
        return map;
    }
}
