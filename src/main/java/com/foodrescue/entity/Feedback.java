package com.foodrescue.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "feedbacks")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedback_id")
    private Long feedbackId;

    @Column(nullable = false)
    private Long donationId;

    @Column(nullable = false)
    private Long ngoId;

    @Column(nullable = false)
    private Long restaurantId;

    @Column(nullable = false)
    private Integer rating;

    @Column(length = 1000)
    private String comments;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // Default Constructor
    public Feedback() {
    }

    // Parameterized Constructor
    public Feedback(Long feedbackId,
                    Long donationId,
                    Long ngoId,
                    Long restaurantId,
                    Integer rating,
                    String comments,
                    LocalDateTime createdAt) {

        this.feedbackId = feedbackId;
        this.donationId = donationId;
        this.ngoId = ngoId;
        this.restaurantId = restaurantId;
        this.rating = rating;
        this.comments = comments;
        this.createdAt = createdAt;
    }

    public Long getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(Long feedbackId) {
        this.feedbackId = feedbackId;
    }

    public Long getDonationId() {
        return donationId;
    }

    public void setDonationId(Long donationId) {
        this.donationId = donationId;
    }

    public Long getNgoId() {
        return ngoId;
    }

    public void setNgoId(Long ngoId) {
        this.ngoId = ngoId;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}