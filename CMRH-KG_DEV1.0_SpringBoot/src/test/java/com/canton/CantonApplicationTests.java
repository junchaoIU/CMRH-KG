package com.canton;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertNotNull;


import org.junit.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

    //表示使用SpringRunner来执行我们的测试
    @RunWith(SpringRunner.class)
//表示这是个springboot测试类
    @SpringBootTest
    class CantonApplicationTests {

        @Autowired
        private WebApplicationContext wac ;

        //伪造一个MVC的环境，伪造的环境不会启动tomcat，
        // 所以测试用例会启动的很快
        private MockMvc mockMvc;

        //在测试之前注册mockmvc
        @Before
        public void setUp(){
            mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
        }

        @Test
        public void whenQuerySuccess() throws  Exception{
            mockMvc.perform(MockMvcRequestBuilders.get("/catalog-getTopClasses")//发送get请求
                    .contentType(MediaType.APPLICATION_JSON_UTF8))//设置返回类型
                    .andExpect(MockMvcResultMatchers.status().isOk())//添加期望，如果返回结果是ok的
                    //用jsonpath来判断，如果返回的json是个集合且长度为3
                    .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(3));
        }


    }
