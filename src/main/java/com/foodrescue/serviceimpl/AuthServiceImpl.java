package com.foodrescue.serviceimpl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.foodrescue.dto.LoginDTO;
import com.foodrescue.dto.LoginResponseDTO;
import com.foodrescue.dto.RegisterDTO;
import com.foodrescue.dto.RegisterResponseDTO;

import com.foodrescue.entity.Admin;
import com.foodrescue.entity.NGO;
import com.foodrescue.entity.Restaurant;
import com.foodrescue.entity.User;
import com.foodrescue.entity.Volunteer;

import com.foodrescue.exception.InvalidRequestException;
import com.foodrescue.exception.ResourceNotFoundException;
import com.foodrescue.exception.UserAlreadyExistsException;

import com.foodrescue.repository.AdminRepository;
import com.foodrescue.repository.NGORepository;
import com.foodrescue.repository.RestaurantRepository;
import com.foodrescue.repository.UserRepository;
import com.foodrescue.repository.VolunteerRepository;

import com.foodrescue.security.JwtTokenProvider;
import com.foodrescue.service.AuthService;


@Service
public class AuthServiceImpl implements AuthService {


    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private RestaurantRepository restaurantRepository;


    @Autowired
    private NGORepository ngoRepository;


    @Autowired
    private VolunteerRepository volunteerRepository;


    @Autowired
    private AdminRepository adminRepository;


    @Autowired
    private JwtTokenProvider jwtTokenProvider;



    // ==========================================
    // REGISTER
    // ==========================================

    @Override
    public RegisterResponseDTO register(RegisterDTO registerDTO) {


        if(userRepository.existsByEmail(registerDTO.getEmail())){

            throw new UserAlreadyExistsException(
                    "Email already exists.");

        }


        if(!registerDTO.getPassword()
                .equals(registerDTO.getConfirmPassword())){


            throw new InvalidRequestException(
                    "Password and Confirm Password do not match.");

        }



        User user = new User();


        user.setFullName(registerDTO.getFullName());

        user.setEmail(registerDTO.getEmail());

        user.setPassword(
                passwordEncoder.encode(
                        registerDTO.getPassword()));

        user.setRole(registerDTO.getRole());

        user.setStatus("ACTIVE");

        user.setCreatedAt(LocalDateTime.now());


        User savedUser =
                userRepository.save(user);



        return new RegisterResponseDTO(

                savedUser.getUserId(),

                "User Registered Successfully"

        );

    }




    // ==========================================
    // LOGIN
    // ==========================================

    @Override
    public LoginResponseDTO login(LoginDTO loginDTO) {

    	
    	if("ADMIN".equalsIgnoreCase(loginDTO.getRole())){

    	    Admin admin =
    	            adminRepository.findByEmail(
    	                    loginDTO.getEmail()
    	            )
    	            .orElseThrow(() ->
    	                    new ResourceNotFoundException(
    	                    "Invalid Email or Password"));


    	    if(!passwordEncoder.matches(
    	            loginDTO.getPassword(),
    	            admin.getPassword())){

    	        throw new InvalidRequestException(
    	                "Invalid Email or Password");
    	    }


    	    String token =
    	            jwtTokenProvider.generateToken(
    	                    admin.getEmail(),
    	                    admin.getRole()
    	            );


    	    LoginResponseDTO response =
    	            new LoginResponseDTO();


    	    response.setToken(token);

    	    response.setAdminId(
    	            admin.getAdminId()
    	    );

    	    response.setRole(
    	            admin.getRole()
    	    );


    	    return response;
    	}
        User user =
                userRepository.findByEmail(loginDTO.getEmail())

                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Invalid Email or Password"));



        if(!passwordEncoder.matches(

                loginDTO.getPassword(),

                user.getPassword())){


            throw new InvalidRequestException(
                    "Invalid Email or Password");

        }



        if(!user.getRole()
                .equalsIgnoreCase(loginDTO.getRole())){


            throw new InvalidRequestException(
                    "Selected role does not match this account.");

        }




        if(!user.getStatus()
                .equalsIgnoreCase("ACTIVE")){


            throw new InvalidRequestException(
                    "Your account is inactive.");

        }



        String token =
                jwtTokenProvider.generateToken(

                        user.getEmail(),

                        user.getRole()

                );




        LoginResponseDTO response =
                new LoginResponseDTO();



        response.setToken(token);

        response.setUserId(
                user.getUserId());

        response.setRole(
                user.getRole());




        // ======================================
        // RESTAURANT
        // ======================================

        if("RESTAURANT"
                .equalsIgnoreCase(user.getRole())){


            Restaurant restaurant =
                    restaurantRepository
                    .findByUserUserId(
                            user.getUserId())

                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Restaurant profile not found."));


            response.setRestaurantId(
                    restaurant.getRestaurantId());
            
            response.setRestaurantName(restaurant.getRestaurantName());
        }
        
        




        // ======================================
        // NGO
        // ======================================

        if("NGO"
                .equalsIgnoreCase(user.getRole())){


            NGO ngo =
                    ngoRepository
                    .findByUserUserId(
                            user.getUserId())

                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "NGO profile not found."));


            response.setNgoId(
                    ngo.getNgoId());


            response.setNgoName(
                    ngo.getNgoName());

        }





     // ======================================
     // VOLUNTEER
     // ======================================

     if("VOLUNTEER"
             .equalsIgnoreCase(user.getRole())){


         Volunteer volunteer =
                 volunteerRepository
                 .findByUserUserId(
                         user.getUserId())

                 .orElseThrow(() ->
                         new ResourceNotFoundException(
                                 "Volunteer profile not found."));


         response.setVolunteerId(
                 volunteer.getVolunteerId());


         response.setVolunteerName(
                 volunteer.getFullName());

     }






        // ======================================
        // ADMIN
        // ======================================

        if("ADMIN"
                .equalsIgnoreCase(user.getRole())){


            Admin admin =
                    adminRepository
                    .findByEmail(
                            user.getEmail())

                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Admin profile not found."));


            response.setAdminId(
                    admin.getAdminId());

        }




        return response;

    }


}