package com.foodrescue.serviceimpl;


import java.util.List;
import java.util.stream.Collectors;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.foodrescue.dto.VolunteerDTO;
import com.foodrescue.entity.User;
import com.foodrescue.entity.Volunteer;

import com.foodrescue.exception.InvalidRequestException;
import com.foodrescue.exception.ResourceNotFoundException;

import com.foodrescue.repository.UserRepository;
import com.foodrescue.repository.VolunteerRepository;

import com.foodrescue.service.VolunteerService;



@Service
public class VolunteerServiceImpl implements VolunteerService {



    @Autowired
    private VolunteerRepository volunteerRepository;


    @Autowired
    private UserRepository userRepository;





    // =========================================
    // REGISTER VOLUNTEER PROFILE
    // =========================================

    @Override
    public VolunteerDTO registerVolunteer(
            VolunteerDTO dto) {


        User user =
                userRepository.findById(
                        dto.getUserId())

                .orElseThrow(() ->
                        new InvalidRequestException(
                                "User not found."));



        if(volunteerRepository
                .existsByUserUserId(
                        dto.getUserId())){


            throw new InvalidRequestException(
                    "Volunteer profile already exists.");

        }



        Volunteer volunteer =
                new Volunteer();



        volunteer.setUser(user);

        volunteer.setFullName(
                dto.getFullName());

        volunteer.setPhone(
                dto.getPhone());

        volunteer.setGender(
                dto.getGender());

        volunteer.setCity(
                dto.getCity());

        volunteer.setAddress(
                dto.getAddress());

        volunteer.setAvailability(
                dto.getAvailability());

        volunteer.setStatus(
                "ACTIVE");



        Volunteer saved =
                volunteerRepository.save(
                        volunteer);



        return convertToDTO(saved);

    }






    // =========================================
    // GET BY VOLUNTEER ID
    // =========================================

    @Override
    public VolunteerDTO getVolunteerById(
            Long volunteerId) {


        Volunteer volunteer =
                volunteerRepository.findById(
                        volunteerId)

                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Volunteer not found."));



        return convertToDTO(volunteer);

    }







    // =========================================
    // GET BY USER ID
    // =========================================

    @Override
    public VolunteerDTO getVolunteerByUserId(
            Long userId) {


        Volunteer volunteer =
                volunteerRepository
                .findByUserUserId(userId)

                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Volunteer profile not found."));



        return convertToDTO(volunteer);

    }







    // =========================================
    // GET ALL
    // =========================================

    @Override
    public List<VolunteerDTO> getAllVolunteers(){


        return volunteerRepository
                .findAll()

                .stream()

                .map(this::convertToDTO)

                .collect(Collectors.toList());

    }








    // =========================================
    // UPDATE
    // =========================================

    @Override
    public VolunteerDTO updateVolunteer(
            Long volunteerId,
            VolunteerDTO dto) {


        Volunteer volunteer =
                volunteerRepository.findById(
                        volunteerId)

                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Volunteer not found."));



        volunteer.setFullName(
                dto.getFullName());


        volunteer.setPhone(
                dto.getPhone());


        volunteer.setGender(
                dto.getGender());


        volunteer.setCity(
                dto.getCity());


        volunteer.setAddress(
                dto.getAddress());


        volunteer.setAvailability(
                dto.getAvailability());



        Volunteer updated =
                volunteerRepository.save(
                        volunteer);



        return convertToDTO(updated);

    }







    // =========================================
    // DELETE
    // =========================================

    @Override
    public void deleteVolunteer(
            Long volunteerId) {


        Volunteer volunteer =
                volunteerRepository.findById(
                        volunteerId)

                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Volunteer not found."));


        volunteerRepository.delete(
                volunteer);

    }







    // =========================================
    // CITY
    // =========================================

    @Override
    public List<VolunteerDTO> getVolunteersByCity(
            String city){


        return volunteerRepository
                .findByCity(city)

                .stream()

                .map(this::convertToDTO)

                .collect(Collectors.toList());

    }







    // =========================================
    // STATUS
    // =========================================

    @Override
    public List<VolunteerDTO> getVolunteersByStatus(
            String status){


        return volunteerRepository
                .findByStatus(status)

                .stream()

                .map(this::convertToDTO)

                .collect(Collectors.toList());

    }







    // =========================================
    // AVAILABILITY
    // =========================================

    @Override
    public List<VolunteerDTO> getVolunteersByAvailability(
            String availability){


        return volunteerRepository
                .findByAvailability(availability)

                .stream()

                .map(this::convertToDTO)

                .collect(Collectors.toList());

    }







    // =========================================
    // SEARCH
    // =========================================

    @Override
    public List<VolunteerDTO> searchVolunteerByName(
            String fullName){


        return volunteerRepository
                .findByFullNameContainingIgnoreCase(
                        fullName)

                .stream()

                .map(this::convertToDTO)

                .collect(Collectors.toList());

    }







    // =========================================
    // ENTITY TO DTO
    // =========================================

    private VolunteerDTO convertToDTO(
            Volunteer volunteer){


        VolunteerDTO dto =
                new VolunteerDTO();


        dto.setVolunteerId(
                volunteer.getVolunteerId());


        if(volunteer.getUser()!=null){

            dto.setUserId(
                    volunteer.getUser()
                    .getUserId());

        }


        dto.setFullName(
                volunteer.getFullName());


        if(volunteer.getUser()!=null){

            dto.setEmail(
                    volunteer.getUser().getEmail());

        }
        
        dto.setPhone(
                volunteer.getPhone());


        dto.setGender(
                volunteer.getGender());


        dto.setCity(
                volunteer.getCity());


        dto.setAddress(
                volunteer.getAddress());


        dto.setAvailability(
                volunteer.getAvailability());


        dto.setStatus(
                volunteer.getStatus());



        return dto;

    }


}