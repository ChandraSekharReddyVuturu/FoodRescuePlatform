package com.foodrescue.service;

import com.foodrescue.dto.LoginDTO;
import com.foodrescue.dto.LoginResponseDTO;
import com.foodrescue.dto.RegisterDTO;
import com.foodrescue.dto.RegisterResponseDTO;

public interface AuthService {

    // Register User
	RegisterResponseDTO register(RegisterDTO registerDTO);

    // Login User
    LoginResponseDTO login(LoginDTO loginDTO);

}