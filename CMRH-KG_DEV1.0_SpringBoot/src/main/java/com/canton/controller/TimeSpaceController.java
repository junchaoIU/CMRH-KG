package com.canton.controller;

import com.canton.dao.entity.EchartsData;
import com.canton.service.TimeSpaceService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Auther ChenX
 * @Date 2020.8.21
 **/
@Controller
@RequestMapping(value = "/timeSpaceSearch", produces="application/json;charset=utf-8")
@CrossOrigin//允许跨域访问
public class TimeSpaceController {
    @Autowired
    private TimeSpaceService timeSpaceService;
    @PostMapping("/getTime")
    @ApiOperation(value="空间检索", notes="时空检索")
    @ResponseBody
    public EchartsData getTime(@RequestParam("time") String time) {
        return timeSpaceService.getTime(time);
    }

    @PostMapping("/getSpace")
    @ApiOperation(value="空间检索", notes="时空检索")
    @ResponseBody
    public EchartsData getSpace(@RequestParam("space") String space) {
        return timeSpaceService.getSpace(space);
    }

    @PostMapping("/getTimeSpace")
    @ApiOperation(value="时空检索", notes="时空检索")
    @ResponseBody
    public EchartsData getTimeSpace(@RequestParam("time") String time,@RequestParam("space") String space) {
        return timeSpaceService.getTimeSpace(time,space);
    }

    @PostMapping("/getTimeSpaceRecallDetail")
    @ApiOperation(value="时空检索", notes="时空检索")
    @ResponseBody
    public List<List> getTimeSpaceRecallDetail(@RequestParam("time") String time, @RequestParam("space") String space) {
        return timeSpaceService.getTimeSpaceRecallDetail(time,space);
    }

    @PostMapping("/getTimeRecallDetail")
    @ApiOperation(value="时间检索", notes="时间检索recall详细")
    @ResponseBody
    public List<List> getTimeRecallDatil(@RequestParam("time") String time) {
        return timeSpaceService.getTimeRecallDetail(time);

    }

    @PostMapping("/getSpaceRecallDetail")
    @ApiOperation(value="空间检索", notes="空间检索recall详细")
    @ResponseBody
    public List<List> getSpaceRecallDatil(@RequestParam("space") String space) {
        return timeSpaceService.getSpaceRecallDetail(space);

    }

    @PostMapping("/getPeriodTime")
    @ApiOperation(value="时间段检索", notes="例如time1=19260204，time2=19670929")
    @ResponseBody
    public EchartsData getPeriodTime(@RequestParam("time1") String time1,@RequestParam("time2") String time2) {
        return timeSpaceService.getPeriodTime(time1,time2);
    }

    @PostMapping("/getPeriodTimeRecallDetail")
    @ApiOperation(value="时间段检索", notes="例如time1=19260204，time2=19670929")
    @ResponseBody
    public List<List> getPeriodTimeDetail(@RequestParam("time1") String time1, @RequestParam("time2") String time2) {
        return timeSpaceService.getPeriodRecallDetail(time1,time2);
    }


}
