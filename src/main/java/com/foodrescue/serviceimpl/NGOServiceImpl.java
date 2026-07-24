package com.foodrescue.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodrescue.dto.NGODTO;
import com.foodrescue.dto.NGORegisterDTO;
import com.foodrescue.entity.NGO;
import com.foodrescue.entity.User;
import com.foodrescue.exception.InvalidRequestException;
import com.foodrescue.repository.NGORepository;
import com.foodrescue.repository.UserRepository;
import com.foodrescue.service.NGOService;

@Service
public class NGOServiceImpl implements NGOService {

    @Autowired
    private NGORepository ngoRepository;

    @Autowired
    private UserRepository userRepository;

    // =========================================
    // Register NGO
    // =========================================

    @Override
    public NGODTO registerNGO(NGORegisterDTO dto) {

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() ->
                        new InvalidRequestException("User not found."));

        if (ngoRepository.findByUserUserId(dto.getUserId()).isPresent()) {
            throw new InvalidRequestException("NGO profile already exists.");
        }

        if (ngoRepository.existsByRegistrationNumber(dto.getRegistrationNumber())) {
            throw new InvalidRequestException("Registration Number already exists.");
        }

        NGO ngo = new NGO();

        ngo.setUser(user);
        ngo.setNgoName(dto.getNgoName());
        ngo.setOwnerName(dto.getOwnerName());
        ngo.setPhone(dto.getPhone());
        ngo.setAddress(dto.getAddress());
        ngo.setCity(dto.getCity());
        ngo.setRegistrationNumber(dto.getRegistrationNumber());
        ngo.setStatus("ACTIVE");

        ngo = ngoRepository.save(ngo);

        NGODTO dtoResponse = new NGODTO();

        dtoResponse.setNgoId(ngo.getNgoId());
        dtoResponse.setUserId(user.getUserId());
        dtoResponse.setEmail(user.getEmail());
        dtoResponse.setNgoName(ngo.getNgoName());
        dtoResponse.setOwnerName(ngo.getOwnerName());
        dtoResponse.setPhone(ngo.getPhone());
        dtoResponse.setAddress(ngo.getAddress());
        dtoResponse.setCity(ngo.getCity());
        dtoResponse.setRegistrationNumber(ngo.getRegistrationNumber());
        dtoResponse.setStatus(ngo.getStatus());

        return dtoResponse;
    }

    // =========================================
    // Get NGO By ID
    // =========================================

    @Override
    public NGO getNGOById(Long ngoId) {

        return ngoRepository.findById(ngoId)
                .orElseThrow(() ->
                        new InvalidRequestException("NGO not found."));

    }

    // =========================================
    // Update NGO
    // =========================================

    @Override
    public NGO updateNGO(Long ngoId, NGO updatedNGO) {

        NGO ngo = ngoRepository.findById(ngoId)
                .orElseThrow(() ->
                        new InvalidRequestException("NGO not found."));

        ngo.setNgoName(updatedNGO.getNgoName());
        ngo.setOwnerName(updatedNGO.getOwnerName());
        ngo.setPhone(updatedNGO.getPhone());
        ngo.setAddress(updatedNGO.getAddress());
        ngo.setCity(updatedNGO.getCity());
        ngo.setRegistrationNumber(updatedNGO.getRegistrationNumber());

        return ngoRepository.save(ngo);

    }
    public NGODTO getNGOProfile(Long ngoId){

        NGO ngo = ngoRepository.findById(ngoId)
                .orElseThrow(() ->
                        new InvalidRequestException(
                                "NGO not found."));


        NGODTO dto = new NGODTO();


        dto.setNgoId(ngo.getNgoId());

        dto.setNgoName(ngo.getNgoName());

        dto.setOwnerName(ngo.getOwnerName());

        dto.setPhone(ngo.getPhone());

        dto.setAddress(ngo.getAddress());

        dto.setCity(ngo.getCity());

        dto.setRegistrationNumber(
                ngo.getRegistrationNumber()
        );

        dto.setStatus(ngo.getStatus());



        if(ngo.getUser()!=null){

            dto.setUserId(
                    ngo.getUser().getUserId()
            );


            dto.setEmail(
                    ngo.getUser().getEmail()
            );

        }


        return dto;

    }

}