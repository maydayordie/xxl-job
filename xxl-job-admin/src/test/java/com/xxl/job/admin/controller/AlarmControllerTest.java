package com.xxl.job.admin.controller;

import com.xxl.job.admin.service.LoginService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import javax.servlet.http.Cookie;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

public class AlarmControllerTest extends AbstractSpringMvcTest {
    private static Logger logger = LoggerFactory.getLogger(AlarmControllerTest.class);

    private Cookie cookie;

    @BeforeEach
    public void login() throws Exception {
        MvcResult ret = mockMvc.perform(
                post("/login")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("userName", "admin")
                        .param("password", "123456")
        ).andReturn();
        cookie = ret.getResponse().getCookie(LoginService.LOGIN_IDENTITY_KEY);
    }

    @Test
    public void testPageList() throws Exception {
        // 传给Controller的参数
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<String, String>();
        parameters.add("jobGroup", "0");
        parameters.add("jobId", "0");
        parameters.add("alarmType", "0");

        // 调用Controller函数
        MvcResult ret = mockMvc.perform(
                post("/alarm/pageList")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        //.content(paramsJson)
                        .params(parameters)
                        .cookie(cookie)
        ).andReturn();
        logger.info(ret.getResponse().getContentAsString());
    }

    @Test
    public void testRemove() throws Exception {
        // 传给Controller的参数
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<String, String>();
        parameters.add("id", "6");

        // 调用Controller函数
        MvcResult ret = mockMvc.perform(
                post("/alarm/remove")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        //.content(paramsJson)
                        .params(parameters)
                        .cookie(cookie)
        ).andReturn();
        logger.info(ret.getResponse().getContentAsString());
    }

}