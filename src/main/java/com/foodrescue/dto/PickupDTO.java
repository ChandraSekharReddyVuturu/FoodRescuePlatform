package com.foodrescue.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PickupDTO {

    private Long pickupId;

    private Long donationId;

    private Long restaurantId;

    private Long ngoId;

    private Long volunteerId;

    private String restaurantName;

    private String ngoName;

    private String foodName;

    private Integer quantity;

    private String pickupAddress;

    private String deliveryAddress;

    private LocalDateTime pickupTime;

    private LocalDateTime deliveryTime;

    private String status;

    private String remarks;
    
    

	public PickupDTO() {
		
	}

	public PickupDTO(Long pickupId, Long donationId, Long restaurantId, Long ngoId, Long volunteerId,
			String restaurantName, String ngoName, String foodName, Integer quantity, String pickupAddress,
			String deliveryAddress, LocalDateTime pickupTime, LocalDateTime deliveryTime, String status,
			String remarks) {
		super();
		this.pickupId = pickupId;
		this.donationId = donationId;
		this.restaurantId = restaurantId;
		this.ngoId = ngoId;
		this.volunteerId = volunteerId;
		this.restaurantName = restaurantName;
		this.ngoName = ngoName;
		this.foodName = foodName;
		this.quantity = quantity;
		this.pickupAddress = pickupAddress;
		this.deliveryAddress = deliveryAddress;
		this.pickupTime = pickupTime;
		this.deliveryTime = deliveryTime;
		this.status = status;
		this.remarks = remarks;
	}

	public Long getPickupId() {
		return pickupId;
	}

	public void setPickupId(Long pickupId) {
		this.pickupId = pickupId;
	}

	public Long getDonationId() {
		return donationId;
	}

	public void setDonationId(Long donationId) {
		this.donationId = donationId;
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

	public Long getVolunteerId() {
		return volunteerId;
	}

	public void setVolunteerId(Long volunteerId) {
		this.volunteerId = volunteerId;
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

	public String getFoodName() {
		return foodName;
	}

	public void setFoodName(String foodName) {
		this.foodName = foodName;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public String getPickupAddress() {
		return pickupAddress;
	}

	public void setPickupAddress(String pickupAddress) {
		this.pickupAddress = pickupAddress;
	}

	public String getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	public LocalDateTime getPickupTime() {
		return pickupTime;
	}

	public void setPickupTime(LocalDateTime pickupTime) {
		this.pickupTime = pickupTime;
	}

	public LocalDateTime getDeliveryTime() {
		return deliveryTime;
	}

	public void setDeliveryTime(LocalDateTime deliveryTime) {
		this.deliveryTime = deliveryTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
    

}
