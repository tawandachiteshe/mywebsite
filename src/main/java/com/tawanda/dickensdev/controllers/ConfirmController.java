package com.tawanda.dickensdev.controllers;

import com.tawanda.dickensdev.model.userInfo;
import com.tawanda.dickensdev.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ConfirmController {
    private com.tawanda.dickensdev.service.userService userService;
    @Autowired
    public ConfirmController(com.tawanda.dickensdev.service.userService userService) {
        this.userService = userService;
    }
    @GetMapping(value = "/confirm",params = "token")
    public userInfo confirm(@RequestParam("token") String token){
        userInfo info = userService.findById(token).get(0);
        if(info!=null){
            info.setEnabled(true);
            userService.enableUser(info);
        }
        return info;
    }


    @GetMapping(value = "/disable",params = "id")
    public userInfo disable(@RequestParam("id") String token){
        userInfo info = userService.findById(token).get(0);
        if(info!=null){
            info.setEnabled(false);
            userService.enableUser(info);
        }
        return info;
    }


    @GetMapping(value = "/delete",params = "id")
    public void delete(@RequestParam("id") String token){
        userService.deleteFindById(token);
    }
}
