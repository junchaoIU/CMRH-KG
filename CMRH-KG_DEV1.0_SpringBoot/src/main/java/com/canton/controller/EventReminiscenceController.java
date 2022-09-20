package com.canton.controller;

import com.canton.dao.entity.AllEvent;
import com.canton.dao.entity.Reminiscence;
import com.canton.service.EventReminiscenceService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Auther ChenX
 * @Date 2020.4.15
 **/
@Controller
@RequestMapping(value = "/eventReminiscence", produces="application/json;charset=utf-8")
@CrossOrigin//允许跨域访问
public class EventReminiscenceController {
    @Autowired
    private EventReminiscenceService eventReminiscence;

    @GetMapping("/getAllEvent")
    @ApiOperation(value="事件回溯", notes="ALL事件的回溯")
    @ResponseBody
    public List<AllEvent> getAllEvent() {
        return eventReminiscence.getAllEvent();
    }

    @PostMapping( "/getChildEvent")
    @ApiOperation(value="子事件回溯", notes="子事件的回溯，用links连接")
    @ResponseBody
    public Reminiscence getChildEvent(@RequestParam("event") String event) {
        return eventReminiscence.getChildEvent(event);
    }



}
