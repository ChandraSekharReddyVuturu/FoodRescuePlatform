package com.foodrescue.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodrescue.dto.ReportDTO;
import com.foodrescue.entity.Report;
import com.foodrescue.exception.ResourceNotFoundException;
import com.foodrescue.repository.ReportRepository;
import com.foodrescue.service.ReportService;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Override
    public ReportDTO generateReport(ReportDTO reportDTO) {

        Report report = mapToEntity(reportDTO);

        report.setGeneratedAt(LocalDateTime.now());

        Report savedReport = reportRepository.save(report);

        return mapToDTO(savedReport);
    }

    @Override
    public List<ReportDTO> getAllReports() {

        return reportRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ReportDTO getReportById(Long reportId) {

        Report report = reportRepository.findById(reportId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Report not found with ID : " + reportId));

        return mapToDTO(report);
    }

    @Override
    public List<ReportDTO> getReportsByType(String reportType) {

        return reportRepository.findByReportType(reportType)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteReport(Long reportId) {

        Report report = reportRepository.findById(reportId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Report not found with ID : " + reportId));

        reportRepository.delete(report);
    }

    // ===========================
    // DTO → Entity
    // ===========================

    private Report mapToEntity(ReportDTO dto) {

        Report report = new Report();

        report.setReportId(dto.getReportId());
        report.setReportName(dto.getReportName());
        report.setReportType(dto.getReportType());
        report.setTotalDonations(dto.getTotalDonations());
        report.setTotalRestaurants(dto.getTotalRestaurants());
        report.setTotalNgos(dto.getTotalNgos());
        report.setCompletedDonations(dto.getCompletedDonations());
        report.setPendingDonations(dto.getPendingDonations());
        report.setExpiredDonations(dto.getExpiredDonations());
        report.setGeneratedAt(dto.getGeneratedAt());

        return report;
    }

    // ===========================
    // Entity → DTO
    // ===========================

    private ReportDTO mapToDTO(Report report) {

        ReportDTO dto = new ReportDTO();

        dto.setReportId(report.getReportId());
        dto.setReportName(report.getReportName());
        dto.setReportType(report.getReportType());
        dto.setTotalDonations(report.getTotalDonations());
        dto.setTotalRestaurants(report.getTotalRestaurants());
        dto.setTotalNgos(report.getTotalNgos());
        dto.setCompletedDonations(report.getCompletedDonations());
        dto.setPendingDonations(report.getPendingDonations());
        dto.setExpiredDonations(report.getExpiredDonations());
        dto.setGeneratedAt(report.getGeneratedAt());

        return dto;
    }

}