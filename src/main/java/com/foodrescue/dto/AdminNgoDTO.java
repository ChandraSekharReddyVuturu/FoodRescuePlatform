package com.foodrescue.dto;

public class AdminNgoDTO {

    private Long ngoId;

    private String ngoName;

    private String ownerName;

    private String phone;

    private String city;

    private String registrationNumber;

    private String status;



    public AdminNgoDTO() {

    }



    public AdminNgoDTO(
            Long ngoId,
            String ngoName,
            String ownerName,
            String phone,
            String city,
            String registrationNumber,
            String status
    ) {

        this.ngoId = ngoId;
        this.ngoName = ngoName;
        this.ownerName = ownerName;
        this.phone = phone;
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

}