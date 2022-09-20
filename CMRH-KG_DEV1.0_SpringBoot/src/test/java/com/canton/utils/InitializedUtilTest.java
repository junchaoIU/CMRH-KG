package com.canton.utils;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

//表示使用SpringRunner来执行我们的测试
@RunWith(SpringRunner.class)
//表示这是个springboot测试类
@SpringBootTest
class InitializedUtilTest {


    @Test
    public void readConfigNode() {

        System.out.println("配置文件加载中:"+InitializedUtil.getMyUri());
        //获取Ontology_File元素的URI值和File_Path值,并添加映射
        for( int i = 0 ; i < InitializedUtil.getMyontology().size() ; i++) {
            System.out.println(InitializedUtil.getMyUri()+InitializedUtil.getMyontology().get(i)+InitializedUtil.getMyUrl()+InitializedUtil.getMyontology().get(i));
            System.out.println(InitializedUtil.getMyUri());
        }
    }
}