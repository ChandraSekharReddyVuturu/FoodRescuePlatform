package com.foodrescue.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "ngos")
public class NGO {

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ngoId;

    @Column(nullable = false)
    private String ngoName;

    @Column(nullable = false)
    private String ownerName;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String registrationNumber;

    @Column(nullable = false)
    private String status;

    public NGO() {
    }

    public NGO(Long ngoId, String ngoName, String ownerName,
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}