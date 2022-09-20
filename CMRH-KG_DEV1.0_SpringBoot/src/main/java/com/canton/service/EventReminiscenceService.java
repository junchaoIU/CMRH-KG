package com.canton.service;

import com.canton.dao.entity.AllEvent;
import com.canton.dao.entity.Reminiscence;

import java.util.List;

public interface EventReminiscenceService {
    List<AllEvent> getAllEvent();
    Reminiscence getChildEvent(String event);

}
