package com.foodrescue.dto;


public class AdminVolunteerDTO {


    private Long volunteerId;

    private String volunteerName;

    private String email;

    private String phone;

    private String city;

    private String vehicleType;

    private String status;



    // Default Constructor
    public AdminVolunteerDTO(){

    }




    // Parameterized Constructor
    public AdminVolunteerDTO(
            Long volunteerId,
            String volunteerName,
            String email,
            String phone,
            String city,
            String vehicleType,
            String status
    ){

        this.volunteerId = volunteerId;
        this.volunteerName = volunteerName;
        this.email = email;
        this.phone = phone;
        this.city = city;
        this.vehicleType = vehicleType;
        this.status = status;

    }




    public Long getVolunteerId() {
        return volunteerId;
    }


    public void setVolunteerId(Long volunteerId) {
        this.volunteerId = volunteerId;
    }



    public String getVolunteerName() {
        return volunteerName;
    }


    public void setVolunteerName(String volunteerName) {
        this.volunteerName = volunteerName;
    }



    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
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



    public String getVehicleType() {
        return vehicleType;
    }


    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }



    public String getStatus() {
        return status;
    }


    public void setStatus(String status) {
        this.status = status;
    }


}