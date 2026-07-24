package com.foodrescue.dto;


public class AdminReportDTO {


    private long totalDonations;

    private long completedDonations;

    private long pendingDonations;

    private long expiredDonations;

    private long totalRestaurants;

    private long totalNgos;

    private long totalVolunteers;



    public AdminReportDTO(){

    }



    public long getTotalDonations() {
        return totalDonations;
    }


    public void setTotalDonations(long totalDonations) {
        this.totalDonations = totalDonations;
    }



    public long getCompletedDonations() {
        return completedDonations;
    }


    public void setCompletedDonations(long completedDonations) {
        this.completedDonations = completedDonations;
    }



    public long getPendingDonations() {
        return pendingDonations;
    }


    public void setPendingDonations(long pendingDonations) {
        this.pendingDonations = pendingDonations;
    }



    public long getExpiredDonations() {
        return expiredDonations;
    }


    public void setExpiredDonations(long expiredDonations) {
        this.expiredDonations = expiredDonations;
    }



    public long getTotalRestaurants() {
        return totalRestaurants;
    }


    public void setTotalRestaurants(long totalRestaurants) {
        this.totalRestaurants = totalRestaurants;
    }



    public long getTotalNgos() {
        return totalNgos;
    }


    public void setTotalNgos(long totalNgos) {
        this.totalNgos = totalNgos;
    }



    public long getTotalVolunteers() {
        return totalVolunteers;
    }


    public void setTotalVolunteers(long totalVolunteers) {
        this.totalVolunteers = totalVolunteers;
    }

}