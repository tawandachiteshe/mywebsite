package com.tawanda.dickensdev.controllers;

import com.tawanda.dickensdev.model.UserRoles;
import com.tawanda.dickensdev.model.userInfo;
import com.tawanda.dickensdev.service.EmailService;
import com.tawanda.dickensdev.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
@Controller
public class RegisterController {
    private UserRoles roles;
    private Pbkdf2PasswordEncoder pbkdf2PasswordEncoder;
    private com.tawanda.dickensdev.service.userService UserService;
    private EmailService emailService;

    @Autowired
    public RegisterController(Pbkdf2PasswordEncoder pbkdf2PasswordEncoder, userService UserService, EmailService emailService) {

        this.pbkdf2PasswordEncoder = pbkdf2PasswordEncoder;
        this.UserService = UserService;
        this.emailService = emailService;
    }

    // Return registration form template
    @RequestMapping("/register")
    public String register(Model model){
        model.addAttribute("userInfo",new userInfo());
        return "register";
    }

    @PostMapping("/register")
    public String submitRegister(@ModelAttribute userInfo userInfo,Model model){
        // 281b9c37caa072691e3ff1424c84a7128e4e2922
        if(UserService.validateRegister(userInfo)){
            userInfo.setEnabled(true);
            userInfo.setRoles(UserRoles.ROLE_ADMIN.toString());
            UserService.registerUser(userInfo);
            model.addAttribute("registration_success");

            return "index";
        }else {
            model.addAttribute("usernameError","username already exist!");
            return "register";
        }
    }




}