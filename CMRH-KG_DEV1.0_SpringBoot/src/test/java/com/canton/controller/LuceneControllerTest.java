package com.canton.controller;

import com.canton.CantonApplication;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = {CantonApplication.class},webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class LuceneControllerTest {
    private static final long serialVersionUID = 2585236388671661262L;

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setup(){
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }


    @Test
    public void getKeyword() throws Exception{
        this.mockMvc
                .perform(get("/lucene-getcontents?keyword=鲁迅"))
                .andDo(print())
                .andReturn();
    }
}