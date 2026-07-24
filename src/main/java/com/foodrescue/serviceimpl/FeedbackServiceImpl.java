package com.foodrescue.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodrescue.entity.Feedback;
import com.foodrescue.exception.InvalidRequestException;
import com.foodrescue.exception.ResourceNotFoundException;
import com.foodrescue.repository.FeedbackRepository;
import com.foodrescue.service.FeedbackService;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Override
    public Feedback addFeedback(Feedback feedback) {

        if (feedback.getRating() < 1 || feedback.getRating() > 5) {
            throw new InvalidRequestException("Rating must be between 1 and 5.");
        }

        feedback.setCreatedAt(LocalDateTime.now());

        return feedbackRepository.save(feedback);
    }

    @Override
    public List<Feedback> getAllFeedback() {

        return feedbackRepository.findAll();
    }

    @Override
    public Feedback getFeedbackById(Long feedbackId) {

        return feedbackRepository.findById(feedbackId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Feedback not found with ID : " + feedbackId));
    }

    @Override
    public List<Feedback> getFeedbackByNgo(Long ngoId) {

        return feedbackRepository.findByNgoId(ngoId);
    }

    @Override
    public List<Feedback> getFeedbackByRestaurant(Long restaurantId) {

        return feedbackRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public List<Feedback> getFeedbackByDonation(Long donationId) {

        return feedbackRepository.findByDonationId(donationId);
    }

    @Override
    public void deleteFeedback(Long feedbackId) {

        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Feedback not found with ID : " + feedbackId));

        feedbackRepository.delete(feedback);
    }

}