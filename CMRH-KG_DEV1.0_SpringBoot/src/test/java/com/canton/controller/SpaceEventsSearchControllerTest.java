package com.canton.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import java.io.Serializable;

import com.canton.CantonApplication;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {CantonApplication.class},webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SpaceEventsSearchControllerTest implements Serializable {
    private static final long serialVersionUID = 2585236388671661262L;

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setup(){
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void getSpace()throws Exception {
       // SpaceEventsSearchController sesc = new SpaceEventsSearchController();
      //  sesc.getSpace("遵义市");

      //   ObjectMapper mm = new ObjectMapper();
      //  String requestJson = mm.writeValueAsString(sesc);

        this.mockMvc
                .perform(get("/space-events-getspace?space=遵义市"))
                     //  .contentType(MediaType.APPLICATION_JSON)
                    //   .content(requestJson))
              // .andExpect(status().isOk())
              .andDo(print())
               .andReturn();
    }



    @Test
    public void getEvent() throws Exception{
        this.mockMvc
                .perform(get("/space-events-getspace?event=遵义会议"))
                //  .contentType(MediaType.APPLICATION_JSON)
                //   .content(requestJson))
                // .andExpect(status().isOk())
                .andDo(print())
                .andReturn();
    }
}