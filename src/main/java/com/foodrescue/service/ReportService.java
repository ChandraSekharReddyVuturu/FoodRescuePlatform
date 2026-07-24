package com.foodrescue.service;

import java.util.List;

import com.foodrescue.dto.ReportDTO;

public interface ReportService {

    /**
     * Generate a new report
     *
     * @param reportDTO
     * @return ReportDTO
     */
    ReportDTO generateReport(ReportDTO reportDTO);

    /**
     * Get all reports
     *
     * @return List<ReportDTO>
     */
    List<ReportDTO> getAllReports();

    /**
     * Get report by ID
     *
     * @param reportId
     * @return ReportDTO
     */
    ReportDTO getReportById(Long reportId);

    /**
     * Get reports by report type
     *
     * @param reportType
     * @return List<ReportDTO>
     */
    List<ReportDTO> getReportsByType(String reportType);

    /**
     * Delete report
     *
     * @param reportId
     */
    void deleteReport(Long reportId);
}