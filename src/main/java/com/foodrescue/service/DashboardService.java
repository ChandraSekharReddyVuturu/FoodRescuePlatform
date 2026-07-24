package com.foodrescue.service;

import com.foodrescue.dto.DashboardDTO;

public interface DashboardService {

    /**
     * Get complete dashboard statistics
     *
     * @return DashboardDTO
     */
    DashboardDTO getDashboardDetails();

}