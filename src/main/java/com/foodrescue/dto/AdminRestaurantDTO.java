package com.foodrescue.dto;

public class AdminRestaurantDTO {

    private Long restaurantId;

    private String restaurantName;

    private String ownerName;

    private String phone;

    private String city;

    private String licenseNumber;

    private String status;

	public Long getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(Long restaurantId) {
		this.restaurantId = restaurantId;
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

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getLicenseNumber() {
		return licenseNumber;
	}

	public void setLicenseNumber(String licenseNumber) {
		this.licenseNumber = licenseNumber;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public AdminRestaurantDTO(Long restaurantId, String restaurantName, String ownerName, String phone, String city,
			String licenseNumber, String status) {
		super();
		this.restaurantId = restaurantId;
		this.restaurantName = restaurantName;
		this.ownerName = ownerName;
		this.phone = phone;
		this.city = city;
		this.licenseNumber = licenseNumber;
		this.status = status;
	}

	public AdminRestaurantDTO() {
		
	}

}