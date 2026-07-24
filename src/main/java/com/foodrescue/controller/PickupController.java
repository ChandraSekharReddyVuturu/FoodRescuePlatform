package com.foodrescue.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.foodrescue.dto.PickupDTO;
import com.foodrescue.service.PickupService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/pickups")
@CrossOrigin(origins = "*")
public class PickupController {

    @Autowired
    private PickupService pickupService;

    // Create Pickup
    @PostMapping
    public ResponseEntity<PickupDTO> createPickup(
            @Valid @RequestBody PickupDTO pickupDTO) {

        PickupDTO savedPickup = pickupService.createPickup(pickupDTO);

        return new ResponseEntity<>(savedPickup, HttpStatus.CREATED);
    }

    // Get Pickup By ID
    @GetMapping("/{id}")
    public ResponseEntity<PickupDTO> getPickupById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                pickupService.getPickupById(id));
    }

    // Get All Pickups
    @GetMapping
    public ResponseEntity<List<PickupDTO>> getAllPickups() {

        return ResponseEntity.ok(
                pickupService.getAllPickups());
    }

    // Update Pickup
    @PutMapping("/{id}")
    public ResponseEntity<PickupDTO> updatePickup(
            @PathVariable Long id,
            @Valid @RequestBody PickupDTO pickupDTO) {

        return ResponseEntity.ok(
                pickupService.updatePickup(id, pickupDTO));
    }

    // Delete Pickup
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePickup(
            @PathVariable Long id) {

        pickupService.deletePickup(id);

        return ResponseEntity.ok("Pickup deleted successfully.");
    }

    // Get Pickups By Volunteer
    @GetMapping("/volunteer/{volunteerId}")
    public ResponseEntity<List<PickupDTO>> getPickupsByVolunteer(
            @PathVariable Long volunteerId) {

        return ResponseEntity.ok(
                pickupService.getPickupsByVolunteer(volunteerId));
    }

    // Get Pickups By Restaurant
    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<PickupDTO>> getPickupsByRestaurant(
            @PathVariable Long restaurantId) {

        return ResponseEntity.ok(
                pickupService.getPickupsByRestaurant(restaurantId));
    }

    // Get Pickups By NGO
    @GetMapping("/ngo/{ngoId}")
    public ResponseEntity<List<PickupDTO>> getPickupsByNGO(
            @PathVariable Long ngoId) {

        return ResponseEntity.ok(
                pickupService.getPickupsByNGO(ngoId));
    }

    // Get Pickups By Status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<PickupDTO>> getPickupsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                pickupService.getPickupsByStatus(status));
    }

    // Assign Volunteer
    @PutMapping("/{pickupId}/assign/{volunteerId}")
    public ResponseEntity<PickupDTO> assignVolunteer(
            @PathVariable Long pickupId,
            @PathVariable Long volunteerId) {

        return ResponseEntity.ok(
                pickupService.assignVolunteer(pickupId, volunteerId));
    }

    // Update Pickup Status
    @PutMapping("/{pickupId}/status")
    public ResponseEntity<PickupDTO> updatePickupStatus(
            @PathVariable Long pickupId,
            @RequestParam String status) {

        return ResponseEntity.ok(
                pickupService.updatePickupStatus(pickupId, status));
    }

}