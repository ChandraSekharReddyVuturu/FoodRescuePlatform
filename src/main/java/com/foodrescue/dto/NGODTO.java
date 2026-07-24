package com.foodrescue.dto;

public class NGODTO {

    private Long ngoId;

    private String ngoName;

    private String ownerName;
    
    private Long userId;

    private String email;
    
    private String phone;

    private String address;

    private String city;

    private String registrationNumber;

    private String status;

    public NGODTO() {
    }

    public NGODTO(Long ngoId, String ngoName, String ownerName,
                  String phone,
                  String address, String city,
                  String registrationNumber,
                  String status) {

        this.ngoId = ngoId;
        this.ngoName = ngoName;
        this.ownerName = ownerName;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.registrationNumber = registrationNumber;
        this.status = status;
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

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	public String getEmail() {
	    return email;
	}

	public void setEmail(String email) {
	    this.email = email;
	}
}