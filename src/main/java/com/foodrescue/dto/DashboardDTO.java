package com.foodrescue.dto;

public class DashboardDTO {

    private Long totalRestaurants;

    private Long totalNgos;

    private Long totalDonations;

    private Long pendingDonations;

    private Long completedDonations;

    private Long expiredDonations;

    private Long totalFeedbacks;

    private Long totalNotifications;

    // Default Constructor
    public DashboardDTO() {

    }

    // Parameterized Constructor
    public DashboardDTO(Long totalRestaurants,
                        Long totalNgos,
                        Long totalDonations,
                        Long pendingDonations,
                        Long completedDonations,
                        Long expiredDonations,
                        Long totalFeedbacks,
                        Long totalNotifications) {

        this.totalRestaurants = totalRestaurants;
        this.totalNgos = totalNgos;
        this.totalDonations = totalDonations;
        this.pendingDonations = pendingDonations;
        this.completedDonations = completedDonations;
        this.expiredDonations = expiredDonations;
        this.totalFeedbacks = totalFeedbacks;
        this.totalNotifications = totalNotifications;
    }

    public Long getTotalRestaurants() {
        return totalRestaurants;
    }

    public void setTotalRestaurants(Long totalRestaurants) {
        this.totalRestaurants = totalRestaurants;
    }

    public Long getTotalNgos() {
        return totalNgos;
    }

    public void setTotalNgos(Long totalNgos) {
        this.totalNgos = totalNgos;
    }

    public Long getTotalDonations() {
        return totalDonations;
    }

    public void setTotalDonations(Long totalDonations) {
        this.totalDonations = totalDonations;
    }

    public Long getPendingDonations() {
        return pendingDonations;
    }

    public void setPendingDonations(Long pendingDonations) {
        this.pendingDonations = pendingDonations;
    }

    public Long getCompletedDonations() {
        return completedDonations;
    }

    public void setCompletedDonations(Long completedDonations) {
        this.completedDonations = completedDonations;
    }

    public Long getExpiredDonations() {
        return expiredDonations;
    }

    public void setExpiredDonations(Long expiredDonations) {
        this.expiredDonations = expiredDonations;
    }

    public Long getTotalFeedbacks() {
        return totalFeedbacks;
    }

    public void setTotalFeedbacks(Long totalFeedbacks) {
        this.totalFeedbacks = totalFeedbacks;
    }

    public Long getTotalNotifications() {
        return totalNotifications;
    }

    public void setTotalNotifications(Long totalNotifications) {
        this.totalNotifications = totalNotifications;
    }
}