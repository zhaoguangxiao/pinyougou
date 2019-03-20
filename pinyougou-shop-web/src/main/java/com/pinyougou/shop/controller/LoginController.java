package com.pinyougou.shop.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * 保存登录的用户信息
 */

@RestController
@RequestMapping("/login")
public class LoginController {

    @RequestMapping("/userName")
    public Map getUserName(){
        HashMap<String, Object> map = new HashMap<>();
        map.put("loginName", SecurityContextHolder.getContext().getAuthentication().getName());
        return map;
    }
}
