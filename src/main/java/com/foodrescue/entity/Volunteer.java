package com.foodrescue.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "volunteers")
public class Volunteer {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long volunteerId;



    // Link with User table

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;



    @Column(nullable = false)
    private String fullName;



    @Column(nullable = false)
    private String phone;



    @Column(nullable = false)
    private String gender;



    @Column(nullable = false)
    private String city;



    @Column(nullable = false)
    private String address;



    @Column(nullable = false)
    private String availability;



    @Column(nullable = false)
    private String status;



    public Volunteer() {

    }



    public Long getVolunteerId() {

        return volunteerId;

    }


    public void setVolunteerId(Long volunteerId) {

        this.volunteerId = volunteerId;

    }



    public User getUser() {

        return user;

    }


    public void setUser(User user) {

        this.user = user;

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

}