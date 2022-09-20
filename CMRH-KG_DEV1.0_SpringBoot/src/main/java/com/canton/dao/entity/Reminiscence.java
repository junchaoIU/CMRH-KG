package com.canton.dao.entity;

import java.util.List;

/**
 * @Auther ChenX
 * @Date 2020.7.22
 **/
public class Reminiscence {
    private List counties;
    private List series;

    public List getSeries() {
        return series;
    }

    public void setSeries(List series) {
        this.series = series;
    }


    public List getCounties() {
        return counties;
    }

    public void setCounties(List counties) {
        this.counties = counties;
    }


}
