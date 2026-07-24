package com.foodrescue.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.foodrescue.entity.WebsiteFeedback;
import com.foodrescue.service.WebsiteFeedbackService;

@RestController
@RequestMapping("/api/website-feedback")
@CrossOrigin(origins = "*")
public class WebsiteFeedbackController {

    @Autowired
    private WebsiteFeedbackService service;

    @PostMapping
    public ResponseEntity<WebsiteFeedback> saveFeedback(
            @RequestBody WebsiteFeedback feedback) {

        return ResponseEntity.ok(service.saveFeedback(feedback));
    }

    @GetMapping
    public ResponseEntity<List<WebsiteFeedback>> getAllFeedback() {

        return ResponseEntity.ok(service.getAllFeedback());
    }
}