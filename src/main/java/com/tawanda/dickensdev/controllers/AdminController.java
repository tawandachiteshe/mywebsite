package com.tawanda.dickensdev.controllers;

import com.tawanda.dickensdev.service.StoriesService;
import com.tawanda.dickensdev.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AdminController {
    private final com.tawanda.dickensdev.service.userService userService;
    private final StoriesService storiesService;
    @Autowired
    public AdminController(com.tawanda.dickensdev.service.userService userService, StoriesService storiesService) {
        this.userService = userService;
        this.storiesService = storiesService;
    }

    @GetMapping("/admin")
    public String admin(Model model){
        int count = userService.getAllpeople().size();
        int storyCount = storiesService.getAllStories().size();
        System.out.println(storyCount);
        model.addAttribute("userCount",count);
        model.addAttribute("storiesCount",storyCount);

        return "admin";
    }



}
