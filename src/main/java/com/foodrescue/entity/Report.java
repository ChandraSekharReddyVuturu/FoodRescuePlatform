package com.foodrescue.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "reports")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long reportId;

    @Column(nullable = false)
    private String reportName;

    @Column(nullable = false)
    private String reportType;
    // DAILY, WEEKLY, MONTHLY, YEARLY

    @Column(nullable = false)
    private Integer totalDonations;

    @Column(nullable = false)
    private Integer totalRestaurants;

    @Column(nullable = false)
    private Integer totalNgos;

    @Column(nullable = false)
    private Integer completedDonations;

    @Column(nullable = false)
    private Integer pendingDonations;

    @Column(nullable = false)
    private Integer expiredDonations;

    @Column(nullable = false)
    private LocalDateTime generatedAt;

    // Default Constructor
    public Report() {

    }

    // Parameterized Constructor
    public Report(Long reportId,
                  String reportName,
                  String reportType,
                  Integer totalDonations,
                  Integer totalRestaurants,
                  Integer totalNgos,
                  Integer completedDonations,
                  Integer pendingDonations,
                  Integer expiredDonations,
                  LocalDateTime generatedAt) {

        this.reportId = reportId;
        this.reportName = reportName;
        this.reportType = reportType;
        this.totalDonations = totalDonations;
        this.totalRestaurants = totalRestaurants;
        this.totalNgos = totalNgos;
        this.completedDonations = completedDonations;
        this.pendingDonations = pendingDonations;
        this.expiredDonations = expiredDonations;
        this.generatedAt = generatedAt;
    }

    public Long getReportId() {
        return reportId;
    }

    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public String getReportName() {
        return reportName;
    }

    public void setReportName(String reportName) {
        this.reportName = reportName;
    }

    public String getReportType() {
        return reportType;
    }

    public void setReportType(String reportType) {
        this.reportType = reportType;
    }

    public Integer getTotalDonations() {
        return totalDonations;
    }

    public void setTotalDonations(Integer totalDonations) {
        this.totalDonations = totalDonations;
    }

    public Integer getTotalRestaurants() {
        return totalRestaurants;
    }

    public void setTotalRestaurants(Integer totalRestaurants) {
        this.totalRestaurants = totalRestaurants;
    }

    public Integer getTotalNgos() {
        return totalNgos;
    }

    public void setTotalNgos(Integer totalNgos) {
        this.totalNgos = totalNgos;
    }

    public Integer getCompletedDonations() {
        return completedDonations;
    }

    public void setCompletedDonations(Integer completedDonations) {
        this.completedDonations = completedDonations;
    }

    public Integer getPendingDonations() {
        return pendingDonations;
    }

    public void setPendingDonations(Integer pendingDonations) {
        this.pendingDonations = pendingDonations;
    }

    public Integer getExpiredDonations() {
        return expiredDonations;
    }

    public void setExpiredDonations(Integer expiredDonations) {
        this.expiredDonations = expiredDonations;
    }

    public LocalDateTime getGeneratedAt() {
        return generatedAt;
    }

    public void setGeneratedAt(LocalDateTime generatedAt) {
        this.generatedAt = generatedAt;
    }
}