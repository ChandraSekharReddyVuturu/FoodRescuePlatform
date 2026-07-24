package com.foodrescue.dto;


import java.time.LocalDateTime;


public class AdminProfileDTO {


    private Long adminId;

    private String adminName;

    private String email;

    private String role;

    private String status;

    private LocalDateTime createdAt;



    public AdminProfileDTO(){

    }




    public AdminProfileDTO(
            Long adminId,
            String adminName,
            String email,
            String role,
            String status,
            LocalDateTime createdAt
    ){

        this.adminId = adminId;
        this.adminName = adminName;
        this.email = email;
        this.role = role;
        this.status = status;
        this.createdAt = createdAt;

    }




    public Long getAdminId() {
        return adminId;
    }


    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }



    public String getAdminName() {
        return adminName;
    }


    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }



    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }



    public String getRole() {
        return role;
    }


    public void setRole(String role) {
        this.role = role;
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

}