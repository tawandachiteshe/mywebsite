package com.tawanda.dickensdev.controllers;

import com.tawanda.dickensdev.model.userInfo;
import com.tawanda.dickensdev.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api/v1/userinfo")
public class RestController {
    private final userService userService;
    @Autowired
    public RestController(com.tawanda.dickensdev.service.userService userService) {
        this.userService = userService;
    }

    @GetMapping
    List<userInfo> getallinfo(){
        return userService.getAllpeople();
    }

    @PostMapping
    public void addUser(@RequestBody userInfo userInfo){
        userService.registerUser(userInfo);
    }

    @GetMapping("/name")
    public String name(){
        Pbkdf2PasswordEncoder encoder = new Pbkdf2PasswordEncoder("secret", 10000, 128);
        String hash = encoder.encode("name");
        return "" + encoder.matches("name",hash);

    }
    @PostMapping("/validate")
    public boolean login(@RequestBody userInfo userInfo){
    return userService.validateLogin(userInfo);
    }

}
