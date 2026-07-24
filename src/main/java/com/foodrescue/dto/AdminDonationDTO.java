package com.foodrescue.dto;

import java.time.LocalDateTime;

public class AdminDonationDTO {

    private Long donationId;

    private String foodName;

    private String restaurantName;

    private String ngoName;

    public AdminDonationDTO() {
		
	}

	public AdminDonationDTO(Long donationId, String foodName, String restaurantName, String ngoName, Integer quantity,
			String status, LocalDateTime createdAt) {
		super();
		this.donationId = donationId;
		this.foodName = foodName;
		this.restaurantName = restaurantName;
		this.ngoName = ngoName;
		this.quantity = quantity;
		this.status = status;
		this.createdAt = createdAt;
	}

	public Long getDonationId() {
		return donationId;
	}

	public void setDonationId(Long donationId) {
		this.donationId = donationId;
	}

	public String getFoodName() {
		return foodName;
	}

	public void setFoodName(String foodName) {
		this.foodName = foodName;
	}

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public String getNgoName() {
		return ngoName;
	}

	public void setNgoName(String ngoName) {
		this.ngoName = ngoName;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
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

	private Integer quantity;

    private String status;

    private LocalDateTime createdAt;

}