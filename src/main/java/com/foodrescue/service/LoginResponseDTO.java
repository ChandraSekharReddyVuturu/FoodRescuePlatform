package com.foodrescue.service;


public class LoginResponseDTO {


    private String token;

    private String role;

    private Long userId;


    // Restaurant

    private Long restaurantId;



    // NGO

    private Long ngoId;

    private String ngoName;



    // Volunteer

    private Long volunteerId;

    private String volunteerName;



    // Admin

    private Long adminId;



    public LoginResponseDTO() {

    }



    public String getToken() {
        return token;
    }


    public void setToken(String token) {
        this.token = token;
    }


    public String getRole() {
        return role;
    }


    public void setRole(String role) {
        this.role = role;
    }


    public Long getUserId() {
        return userId;
    }


    public void setUserId(Long userId) {
        this.userId = userId;
    }


    public Long getRestaurantId() {
        return restaurantId;
    }


    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }



    public Long getNgoId() {
        return ngoId;
    }


    public void setNgoId(Long ngoId) {
        this.ngoId = ngoId;
    }


    public String getNgoName() {
        return ngoName;
    }


    public void setNgoName(String ngoName) {
        this.ngoName = ngoName;
    }



    public Long getVolunteerId() {
        return volunteerId;
    }


    public void setVolunteerId(Long volunteerId) {
        this.volunteerId = volunteerId;
    }


    public String getVolunteerName() {
        return volunteerName;
    }


    public void setVolunteerName(String volunteerName) {
        this.volunteerName = volunteerName;
    }



    public Long getAdminId() {
        return adminId;
    }


    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }

}