package com.foodrescue.dto;

import java.time.LocalDateTime;

public class FoodRequestDTO {

    private Long requestId;

    private Long ngoId;

    private Long donationId;

    private String requestStatus;

    private LocalDateTime requestDate;

    private String remarks;
    
    private String restaurantName;

    private String foodName;

    private Integer requiredMeals;

    public FoodRequestDTO() {
    }

    public FoodRequestDTO(Long requestId,
                          Long ngoId,
                          Long donationId,
                          String requestStatus,
                          LocalDateTime requestDate,
                          String remarks) {

        this.requestId = requestId;
        this.ngoId = ngoId;
        this.donationId = donationId;
        this.requestStatus = requestStatus;
        this.requestDate = requestDate;
        this.remarks = remarks;
    }

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public Long getNgoId() {
        return ngoId;
    }

    public void setNgoId(Long ngoId) {
        this.ngoId = ngoId;
    }

    public Long getDonationId() {
        return donationId;
    }

    public void setDonationId(Long donationId) {
        this.donationId = donationId;
    }

    public String getRequestStatus() {
        return requestStatus;
    }

    public void setRequestStatus(String requestStatus) {
        this.requestStatus = requestStatus;
    }

    public LocalDateTime getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
    
    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public Integer getRequiredMeals() {
        return requiredMeals;
    }

    public void setRequiredMeals(Integer requiredMeals) {
        this.requiredMeals = requiredMeals;
    }

}