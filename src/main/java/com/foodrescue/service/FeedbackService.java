package com.foodrescue.service;

import java.util.List;

import com.foodrescue.entity.Feedback;

public interface FeedbackService {

    /**
     * Add feedback
     *
     * @param feedback
     * @return Feedback
     */
    Feedback addFeedback(Feedback feedback);

    /**
     * Get all feedback
     *
     * @return List<Feedback>
     */
    List<Feedback> getAllFeedback();

    /**
     * Get feedback by ID
     *
     * @param feedbackId
     * @return Feedback
     */
    Feedback getFeedbackById(Long feedbackId);

    /**
     * Get feedback by NGO
     *
     * @param ngoId
     * @return List<Feedback>
     */
    List<Feedback> getFeedbackByNgo(Long ngoId);

    /**
     * Get feedback by Restaurant
     *
     * @param restaurantId
     * @return List<Feedback>
     */
    List<Feedback> getFeedbackByRestaurant(Long restaurantId);

    /**
     * Get feedback by Donation
     *
     * @param donationId
     * @return List<Feedback>
     */
    List<Feedback> getFeedbackByDonation(Long donationId);

    /**
     * Delete feedback
     *
     * @param feedbackId
     */
    void deleteFeedback(Long feedbackId);
}