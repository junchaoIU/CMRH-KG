package com.canton.controller;

import com.canton.dao.entity.Reminiscence;
import com.canton.service.PeopleReminiscenceService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * @Auther ChenX
 * @Date 2020.4.14
 **/
@Controller
@RequestMapping(value = "/peopleReminiscence", produces="application/json;charset=utf-8")
@CrossOrigin//允许跨域访问
public class PeopleReminiscenceController {
    @Autowired
    private PeopleReminiscenceService peoplereminiscence ;

    @PostMapping("/getPeople")
    @ApiOperation(value="人物回溯", notes="人物—时间—事件回溯，用links连接")
    @ResponseBody
    public Reminiscence getAll(@RequestParam("people") String people) {
        return peoplereminiscence.getPeople(people);
    }


}
