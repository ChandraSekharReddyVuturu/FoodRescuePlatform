package com.foodrescue.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "food_requests")
public class FoodRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    @ManyToOne
    @JoinColumn(name = "ngo_id")
    @JsonIgnore
    private NGO ngo;

    @ManyToOne
    @JoinColumn(name = "donation_id")
    @JsonIgnore
    private Donation donation;

    @Column(nullable = false)
    private String requestStatus;

    @Column(nullable = false)
    private LocalDateTime requestDate;

    @Column(length = 300)
    private String remarks;

    public FoodRequest() {
    }

    public FoodRequest(Long requestId, NGO ngo, Donation donation,
                       String requestStatus,
                       LocalDateTime requestDate,
                       String remarks) {

        this.requestId = requestId;
        this.ngo = ngo;
        this.donation = donation;
        this.requestStatus = requestStatus;
        this.requestDate = requestDate;
        this.remarks = remarks;
    }

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public NGO getNgo() {
        return ngo;
    }

    public void setNgo(NGO ngo) {
        this.ngo = ngo;
    }

    public Donation getDonation() {
        return donation;
    }

    public void setDonation(Donation donation) {
        this.donation = donation;
    }

    public String getRequestStatus() {
        return requestStatus;
    }

    public void setRequestStatus(String requestStatus) {
        this.requestStatus = requestStatus;
    }

    public LocalDateTime getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}