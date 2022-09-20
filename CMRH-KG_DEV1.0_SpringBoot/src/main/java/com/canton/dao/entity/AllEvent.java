package com.canton.dao.entity;

/**
 * @Auther ChenX
 * @Date 2020.8.10
 **/
public class AllEvent {
    private String title;
    private String time;
    private String location = null;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
