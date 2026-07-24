package com.foodrescue.scheduler;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.foodrescue.entity.Donation;
import com.foodrescue.enums.DonationStatus;
import com.foodrescue.repository.DonationRepository;

@Component
public class DonationCleanupScheduler {

    @Autowired
    private DonationRepository donationRepository;

    @Scheduled(fixedRate = 60000) // Every 1 minute
    public void expireDonations() {

        List<Donation> donations =
                donationRepository.findByStatus(DonationStatus.AVAILABLE);

        LocalDateTime now = LocalDateTime.now();

        for (Donation donation : donations) {

            if (donation.getExpiryTime().isBefore(now)) {

                donation.setStatus(DonationStatus.EXPIRED);
            }
        }

        donationRepository.saveAll(donations);
    }
}