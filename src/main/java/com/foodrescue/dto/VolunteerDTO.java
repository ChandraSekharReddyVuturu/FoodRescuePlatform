package com.foodrescue.dto;


public class VolunteerDTO {


    private Long volunteerId;


    private Long userId;


    private String fullName;
    
    private String email;

    private String phone;


    private String gender;


    private String city;


    private String address;


    private String availability;


    private String status;



    public VolunteerDTO() {

    }



    public Long getVolunteerId() {

        return volunteerId;

    }


    public void setVolunteerId(Long volunteerId) {

        this.volunteerId = volunteerId;

    }



    public Long getUserId() {

        return userId;

    }


    public void setUserId(Long userId) {

        this.userId = userId;

    }



    public String getFullName() {

        return fullName;

    }


    public void setFullName(String fullName) {

        this.fullName = fullName;

    }



    public String getPhone() {

        return phone;

    }


    public void setPhone(String phone) {

        this.phone = phone;

    }



    public String getGender() {

        return gender;

    }


    public void setGender(String gender) {

        this.gender = gender;

    }



    public String getCity() {

        return city;

    }


    public void setCity(String city) {

        this.city = city;

    }



    public String getAddress() {

        return address;

    }


    public void setAddress(String address) {

        this.address = address;

    }



    public String getAvailability() {

        return availability;

    }


    public void setAvailability(String availability) {

        this.availability = availability;

    }



    public String getStatus() {

        return status;

    }


    public void setStatus(String status) {

        this.status = status;

    }
    
    public String getEmail(){

        return email;

    }


    public void setEmail(String email){

        this.email = email;

    }

}