package com.foodrescue.service;

import java.util.List;

import com.foodrescue.dto.DonationDTO;
import com.foodrescue.enums.DonationStatus;
import com.foodrescue.enums.FoodType;

public interface DonationService {

    // ======================================================
    // Restaurant Module
    // ======================================================

    /**
     * Add new donation
     */
    DonationDTO addDonation(DonationDTO donationDTO);

    /**
     * Update donation
     */
    DonationDTO updateDonation(Long donationId,
                               DonationDTO donationDTO);

    /**
     * Delete donation
     */
    void deleteDonation(Long donationId);

    /**
     * Get donation by ID
     */
    DonationDTO getDonationById(Long donationId);

    /**
     * Get all donations of a restaurant
     */
    List<DonationDTO> getDonationsByRestaurant(Long restaurantId);

    /**
     * Get restaurant donations by status
     */
    List<DonationDTO> getRestaurantDonationsByStatus(
            Long restaurantId,
            DonationStatus status);

    // ======================================================
    // NGO Module
    // ======================================================

    /**
     * Available donations
     */
    List<DonationDTO> getAvailableDonations();

    /**
     * NGO accepts donation
     */
    DonationDTO acceptDonation(Long donationId,
                               Long ngoId);

    /**
     * NGO donations
     */
    List<DonationDTO> getDonationsByNGO(Long ngoId);

    /**
     * NGO donations by status
     */
    List<DonationDTO> getNGODonationsByStatus(
            Long ngoId,
            DonationStatus status);

    // ======================================================
    // Volunteer Module
    // ======================================================

    /**
     * Assign volunteer
     */
    DonationDTO assignVolunteer(Long donationId,
                                Long volunteerId);

    /**
     * Volunteer pickup
     */
    DonationDTO pickupDonation(Long donationId);

    /**
     * Volunteer delivered
     */
    DonationDTO deliverDonation(Long donationId);

    /**
     * Complete donation
     */
    DonationDTO completeDonation(Long donationId);

    /**
     * Volunteer donations
     */
    List<DonationDTO> getDonationsByVolunteer(
            Long volunteerId);

    /**
     * Volunteer donations by status
     */
    List<DonationDTO> getVolunteerDonationsByStatus(
            Long volunteerId,
            DonationStatus status);

    // ======================================================
    // Admin Module
    // ======================================================

    /**
     * Get all donations
     */
    List<DonationDTO> getAllDonations();

    /**
     * Get donations by status
     */
    List<DonationDTO> getDonationsByStatus(
            DonationStatus status);

    /**
     * Get donations by food type
     */
    List<DonationDTO> getDonationsByFoodType(
            FoodType foodType);

    /**
     * Get donations by city
     */
    List<DonationDTO> getDonationsByCity(
            String city);

}