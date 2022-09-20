package com.canton.utils;

import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;

/**
 * @Auther ChenX
 * @Date 2020.4.16
 * 获取静态资源工具类resources
 **/

public class ClassPathUtil {
    //获取跟目录
    public static String getClassPath() {
        File path = null;
        try {
            path = new File(ResourceUtils.getURL("classpath:").getPath());
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        if (!path.exists()) path = new File("");
        //System.out.println("path:" + path.getAbsolutePath());
        return path.getAbsolutePath();

    }
}
