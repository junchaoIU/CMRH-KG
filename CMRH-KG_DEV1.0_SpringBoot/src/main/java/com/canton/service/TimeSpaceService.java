package com.canton.service;

import com.canton.dao.entity.EchartsData;

import java.util.List;

public interface TimeSpaceService {
    EchartsData getTime(String keyword);
    List<List> getTimeRecallDetail(String keyword);
    EchartsData getSpace(String keyword);
    List<List> getSpaceRecallDetail(String keyword);
    EchartsData getTimeSpace(String time,String space);
    List<List> getTimeSpaceRecallDetail(String time,String space);
    EchartsData getPeriodTime(String time1, String time2);
    List<List> getPeriodRecallDetail(String time1, String time2);
}
