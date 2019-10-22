package com.tawanda.dickensdev.controllers;


import com.tawanda.dickensdev.service.ServerInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Service
@RestController
@RequestMapping("api/v1/serverinfo")
public class
ServerInfoController {
@Autowired
    ServerInfoService serverInfoService;

@GetMapping("/time")
public String getTime(){
    return serverInfoService.getTime().getServerTime();
}


}
