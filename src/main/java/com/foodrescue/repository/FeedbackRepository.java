package com.foodrescue.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodrescue.entity.Feedback;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    // Get feedback by NGO
    List<Feedback> findByNgoId(Long ngoId);

    // Get feedback by Restaurant
    List<Feedback> findByRestaurantId(Long restaurantId);

    // Get feedback for a Donation
    List<Feedback> findByDonationId(Long donationId);

    // Get feedback by Rating
    List<Feedback> findByRating(Integer rating);

}