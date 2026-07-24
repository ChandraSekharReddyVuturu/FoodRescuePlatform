package com.foodrescue.dto;

import java.time.LocalDateTime;

public class RestaurantDTO {

    private Long restaurantId;
    
    private Long userId;
    
    private String email;

    private String restaurantName;

    private String ownerName;

    private String phone;

    private String licenseNumber;

    private String address;

    private String city;

    private String status;

    private LocalDateTime createdAt;

    // Default Constructor
    public RestaurantDTO() {

    }

    // Parameterized Constructor
    public RestaurantDTO(Long restaurantId,
                         Long userId,
                         String email,
                         String restaurantName,
                         String ownerName,
                         String phone,
                         String licenseNumber,
                         String address,
                         String city,
                         String status,
                         LocalDateTime createdAt) {

        this.restaurantId = restaurantId;
        this.userId = userId;
        this.email = email;
        this.restaurantName = restaurantName;
        this.ownerName = ownerName;
        this.phone = phone;
        this.licenseNumber = licenseNumber;
        this.address = address;
        this.city = city;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
}