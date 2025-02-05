package com.xxx.proj.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/index")
public class IndexController {

    @RequestMapping("/showName")
    public Map<String,String> showName() {
        //从安全框架中读取当前登录用户名
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Map map = new HashMap();
        map.put("username", username);
        System.out.println(map);
        return map;
    }
}
