package com.foodrescue.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.foodrescue.dto.ReportDTO;
import com.foodrescue.service.ReportService;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    @Autowired
    private ReportService reportService;

    // Generate Report
    @PostMapping
    public ResponseEntity<ReportDTO> generateReport(
            @RequestBody ReportDTO reportDTO) {

        ReportDTO savedReport = reportService.generateReport(reportDTO);

        return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
    }

    // Get All Reports
    @GetMapping
    public ResponseEntity<List<ReportDTO>> getAllReports() {

        List<ReportDTO> reports = reportService.getAllReports();

        return ResponseEntity.ok(reports);
    }

    // Get Report By ID
    @GetMapping("/{id}")
    public ResponseEntity<ReportDTO> getReportById(
            @PathVariable Long id) {

        ReportDTO report = reportService.getReportById(id);

        return ResponseEntity.ok(report);
    }

    // Get Reports By Type
    @GetMapping("/type/{reportType}")
    public ResponseEntity<List<ReportDTO>> getReportsByType(
            @PathVariable String reportType) {

        List<ReportDTO> reports =
                reportService.getReportsByType(reportType);

        return ResponseEntity.ok(reports);
    }

    // Delete Report
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReport(
            @PathVariable Long id) {

        reportService.deleteReport(id);

        return ResponseEntity.ok("Report Deleted Successfully");
    }

}