package com.foodrescue.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.foodrescue.dto.DashboardDTO;
import com.foodrescue.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    // Get Dashboard Details
    @GetMapping
    public ResponseEntity<DashboardDTO> getDashboardDetails() {

        DashboardDTO dashboard =
                dashboardService.getDashboardDetails();

        return ResponseEntity.ok(dashboard);
    }

}