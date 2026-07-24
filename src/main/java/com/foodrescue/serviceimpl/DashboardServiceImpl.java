package com.foodrescue.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodrescue.dto.DashboardDTO;
import com.foodrescue.enums.DonationStatus;
import com.foodrescue.repository.DonationRepository;
import com.foodrescue.repository.FeedbackRepository;
import com.foodrescue.repository.NGORepository;
import com.foodrescue.repository.RestaurantRepository;
import com.foodrescue.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private NGORepository ngoRepository;

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Override
    public DashboardDTO getDashboardDetails() {

        DashboardDTO dashboard = new DashboardDTO();

        dashboard.setTotalRestaurants(
                restaurantRepository.count());

        dashboard.setTotalNgos(
                ngoRepository.count());

        dashboard.setTotalDonations(
                donationRepository.count());

        dashboard.setPendingDonations(
                (long) donationRepository.findByStatus(DonationStatus.PENDING).size());

        dashboard.setCompletedDonations(
                (long) donationRepository.findByStatus(DonationStatus.COMPLETED).size());

        dashboard.setExpiredDonations(
                (long) donationRepository.findByStatus(DonationStatus.EXPIRED).size());

        dashboard.setTotalFeedbacks(
                feedbackRepository.count());

        return dashboard;
    }

}