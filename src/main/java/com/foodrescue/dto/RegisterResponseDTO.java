package com.foodrescue.dto;

public class RegisterResponseDTO {

    private Long userId;
    private String message;

    public RegisterResponseDTO() {
    }

    public RegisterResponseDTO(Long userId, String message) {
        this.userId = userId;
        this.message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}