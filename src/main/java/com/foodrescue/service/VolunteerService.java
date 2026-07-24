package com.foodrescue.service;


import java.util.List;

import com.foodrescue.dto.VolunteerDTO;


public interface VolunteerService {



    // Register Volunteer Profile

    VolunteerDTO registerVolunteer(
            VolunteerDTO volunteerDTO
    );



    // Get Volunteer By ID

    VolunteerDTO getVolunteerById(
            Long volunteerId
    );



    // Get Volunteer Profile By User ID

    VolunteerDTO getVolunteerByUserId(
            Long userId
    );



    // Get All Volunteers

    List<VolunteerDTO> getAllVolunteers();



    // Update Volunteer Profile

    VolunteerDTO updateVolunteer(
            Long volunteerId,
            VolunteerDTO volunteerDTO
    );



    // Delete Volunteer

    void deleteVolunteer(
            Long volunteerId
    );



    // Find By City

    List<VolunteerDTO> getVolunteersByCity(
            String city
    );



    // Find By Status

    List<VolunteerDTO> getVolunteersByStatus(
            String status
    );



    // Find By Availability

    List<VolunteerDTO> getVolunteersByAvailability(
            String availability
    );



    // Search By Name

    List<VolunteerDTO> searchVolunteerByName(
            String fullName
    );


}