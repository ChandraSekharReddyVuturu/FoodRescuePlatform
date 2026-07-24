package com.foodrescue.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.foodrescue.entity.Feedback;
import com.foodrescue.service.FeedbackService;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // Add Feedback
    @PostMapping
    public ResponseEntity<Feedback> addFeedback(
            @RequestBody Feedback feedback) {

        Feedback savedFeedback = feedbackService.addFeedback(feedback);

        return ResponseEntity.ok(savedFeedback);
    }

    // Get All Feedback
    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedback() {

        List<Feedback> feedbackList = feedbackService.getAllFeedback();

        return ResponseEntity.ok(feedbackList);
    }

    // Get Feedback By ID
    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getFeedbackById(
            @PathVariable Long id) {

        Feedback feedback = feedbackService.getFeedbackById(id);

        return ResponseEntity.ok(feedback);
    }

    // Get Feedback By NGO
    @GetMapping("/ngo/{ngoId}")
    public ResponseEntity<List<Feedback>> getFeedbackByNgo(
            @PathVariable Long ngoId) {

        List<Feedback> feedbackList =
                feedbackService.getFeedbackByNgo(ngoId);

        return ResponseEntity.ok(feedbackList);
    }

    // Get Feedback By Restaurant
    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Feedback>> getFeedbackByRestaurant(
            @PathVariable Long restaurantId) {

        List<Feedback> feedbackList =
                feedbackService.getFeedbackByRestaurant(restaurantId);

        return ResponseEntity.ok(feedbackList);
    }

    // Get Feedback By Donation
    @GetMapping("/donation/{donationId}")
    public ResponseEntity<List<Feedback>> getFeedbackByDonation(
            @PathVariable Long donationId) {

        List<Feedback> feedbackList =
                feedbackService.getFeedbackByDonation(donationId);

        return ResponseEntity.ok(feedbackList);
    }

    // Delete Feedback
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFeedback(
            @PathVariable Long id) {

        feedbackService.deleteFeedback(id);

        return ResponseEntity.ok("Feedback Deleted Successfully");
    }

}