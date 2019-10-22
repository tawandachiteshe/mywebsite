package com.tawanda.dickensdev.controllers;

import com.tawanda.dickensdev.model.StoriesInfo;
import com.tawanda.dickensdev.service.StoriesService;
import org.hibernate.validator.constraints.URL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stories")
public class StoryRestController {
    private StoriesService storiesService;

    @Autowired
    public StoryRestController(StoriesService storiesService) {
        this.storiesService = storiesService;
    }


    @PostMapping
    public void addStory(@RequestBody StoriesInfo storiesInfo){
        storiesService.addStory(storiesInfo);
    }
    @GetMapping
    public List<StoriesInfo> getAllStories(){
        return storiesService.getAllStories();
    }

    @GetMapping("/delete")
    public void deleteAll(){
        storiesService.deleteAll();
    }

    @GetMapping(value = "/delete",params = "id")
    public void deleteById(@RequestParam("id") String id){
        storiesService.deleteById(id);
    }
}
