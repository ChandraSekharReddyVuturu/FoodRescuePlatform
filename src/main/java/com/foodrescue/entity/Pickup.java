package com.foodrescue.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "pickups")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pickup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pickupId;

    public Long getPickupId() {
		return pickupId;
	}

	public void setPickupId(Long pickupId) {
		this.pickupId = pickupId;
	}

	public Long getDonationId() {
		return donationId;
	}

	public Pickup() {
		
	}

	public Pickup(Long pickupId, Long donationId, Long restaurantId, Long ngoId, Long volunteerId,
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

	@Column(nullable = false)
    private Long donationId;

    @Column(nullable = false)
    private Long restaurantId;

    @Column(nullable = false)
    private Long ngoId;

    @Column(nullable = false)
    private Long volunteerId;

    @Column(nullable = false)
    private String restaurantName;

    @Column(nullable = false)
    private String ngoName;

    @Column(nullable = false)
    private String foodName;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private String pickupAddress;

    @Column(nullable = false)
    private String deliveryAddress;

    @Column(nullable = false)
    private LocalDateTime pickupTime;

    private LocalDateTime deliveryTime;

    @Column(nullable = false)
    private String status;

    @Column(length = 500)
    private String remarks;
}
