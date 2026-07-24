package com.foodrescue.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.foodrescue.dto.DonationDTO;
import com.foodrescue.enums.DonationStatus;
import com.foodrescue.enums.FoodType;
import com.foodrescue.service.DonationService;


@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "*")
public class DonationController {


    @Autowired
    private DonationService donationService;



    // ======================================================
    // RESTAURANT MODULE
    // ======================================================


    // Create Donation

    @PostMapping
    public ResponseEntity<DonationDTO> addDonation(
            @RequestBody DonationDTO dto) {


        return new ResponseEntity<>(
                donationService.addDonation(dto),
                HttpStatus.CREATED);

    }



    // Get Donation By ID

    @GetMapping("/{donationId}")
    public ResponseEntity<DonationDTO> getDonationById(
            @PathVariable Long donationId) {


        return ResponseEntity.ok(
                donationService.getDonationById(donationId));

    }



    // Update Donation

    @PutMapping("/{donationId}")
    public ResponseEntity<DonationDTO> updateDonation(
            @PathVariable Long donationId,
            @RequestBody DonationDTO dto) {


        return ResponseEntity.ok(
                donationService.updateDonation(
                        donationId,
                        dto));

    }



    // Delete Donation

    @DeleteMapping("/{donationId}")
    public ResponseEntity<String> deleteDonation(
            @PathVariable Long donationId) {


        donationService.deleteDonation(donationId);


        return ResponseEntity.ok(
                "Donation deleted successfully");

    }



    // Restaurant Donations

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<DonationDTO>> getRestaurantDonations(
            @PathVariable Long restaurantId) {


        return ResponseEntity.ok(
                donationService
                .getDonationsByRestaurant(restaurantId));

    }



    // Restaurant Donations By Status

    @GetMapping("/restaurant/{restaurantId}/{status}")
    public ResponseEntity<List<DonationDTO>> getRestaurantDonationsByStatus(
            @PathVariable Long restaurantId,
            @PathVariable DonationStatus status) {


        return ResponseEntity.ok(
                donationService
                .getRestaurantDonationsByStatus(
                        restaurantId,
                        status));

    }



    // ======================================================
    // NGO MODULE
    // ======================================================


    // Available Donations

    @GetMapping("/available")
    public ResponseEntity<List<DonationDTO>> getAvailableDonations() {


        return ResponseEntity.ok(
                donationService.getAvailableDonations());

    }



    // NGO Accept Donation

    @PutMapping("/{donationId}/accept/{ngoId}")
    public ResponseEntity<DonationDTO> acceptDonation(
            @PathVariable Long donationId,
            @PathVariable Long ngoId) {


        return ResponseEntity.ok(
                donationService.acceptDonation(
                        donationId,
                        ngoId));

    }



    // NGO Donations

    @GetMapping("/ngo/{ngoId}")
    public ResponseEntity<List<DonationDTO>> getNGODonations(
            @PathVariable Long ngoId) {


        return ResponseEntity.ok(
                donationService
                .getDonationsByNGO(ngoId));

    }



    // NGO Donations By Status

    @GetMapping("/ngo/{ngoId}/{status}")
    public ResponseEntity<List<DonationDTO>> getNGODonationsByStatus(
            @PathVariable Long ngoId,
            @PathVariable DonationStatus status) {


        return ResponseEntity.ok(
                donationService
                .getNGODonationsByStatus(
                        ngoId,
                        status));

    }



    // ======================================================
    // VOLUNTEER MODULE
    // ======================================================


    // Assign Volunteer

    @PutMapping("/{donationId}/assign/{volunteerId}")
    public ResponseEntity<DonationDTO> assignVolunteer(
            @PathVariable Long donationId,
            @PathVariable Long volunteerId) {


        return ResponseEntity.ok(
                donationService.assignVolunteer(
                        donationId,
                        volunteerId));

    }



    // Pickup

    @PutMapping("/{donationId}/pickup")
    public ResponseEntity<DonationDTO> pickupDonation(
            @PathVariable Long donationId) {


        return ResponseEntity.ok(
                donationService.pickupDonation(
                        donationId));

    }



    // Deliver

    @PutMapping("/{donationId}/deliver")
    public ResponseEntity<DonationDTO> deliverDonation(
            @PathVariable Long donationId) {


        return ResponseEntity.ok(
                donationService.deliverDonation(
                        donationId));

    }



    // Complete

    @PutMapping("/{donationId}/complete")
    public ResponseEntity<DonationDTO> completeDonation(
            @PathVariable Long donationId) {


        return ResponseEntity.ok(
                donationService.completeDonation(
                        donationId));

    }



    // Volunteer Donations

    @GetMapping("/volunteer/{volunteerId}")
    public ResponseEntity<List<DonationDTO>> getVolunteerDonations(
            @PathVariable Long volunteerId) {


        return ResponseEntity.ok(
                donationService
                .getDonationsByVolunteer(
                        volunteerId));

    }



    // ======================================================
    // ADMIN MODULE
    // ======================================================


    // All Donations

    @GetMapping("/admin/all")
    public ResponseEntity<List<DonationDTO>> getAllDonations() {


        return ResponseEntity.ok(
                donationService.getAllDonations());

    }



    // Status Filter

    @GetMapping("/admin/status/{status}")
    public ResponseEntity<List<DonationDTO>> getByStatus(
            @PathVariable DonationStatus status) {


        return ResponseEntity.ok(
                donationService
                .getDonationsByStatus(status));

    }



    // Food Type Filter

    @GetMapping("/admin/type/{foodType}")
    public ResponseEntity<List<DonationDTO>> getByFoodType(
            @PathVariable FoodType foodType) {


        return ResponseEntity.ok(
                donationService
                .getDonationsByFoodType(foodType));

    }



    // City Filter

    @GetMapping("/admin/city/{city}")
    public ResponseEntity<List<DonationDTO>> getByCity(
            @PathVariable String city) {


        return ResponseEntity.ok(
                donationService
                .getDonationsByCity(city));

    }
//    @PutMapping("/{donationId}/status/{status}")
//    public ResponseEntity<?> updateDonationStatus(
//            @PathVariable Long donationId,
//            @PathVariable String status
//    ){
//
//        donationService.updateStatus(
//            donationId,
//            status
//        );
//
//        return ResponseEntity.ok(
//            "Status updated successfully"
//        );
//    }

}