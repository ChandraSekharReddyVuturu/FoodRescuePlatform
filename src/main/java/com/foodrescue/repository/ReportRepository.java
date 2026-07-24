package com.foodrescue.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodrescue.entity.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    // Get reports by report type
    List<Report> findByReportType(String reportType);

    // Get reports by report name
    List<Report> findByReportName(String reportName);

}