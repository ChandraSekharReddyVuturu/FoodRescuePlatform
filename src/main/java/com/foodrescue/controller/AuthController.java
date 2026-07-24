package com.foodrescue.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.foodrescue.dto.LoginDTO;
import com.foodrescue.dto.LoginResponseDTO;
import com.foodrescue.dto.RegisterDTO;
import com.foodrescue.dto.RegisterResponseDTO;
import com.foodrescue.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Register User
    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(
            @RequestBody RegisterDTO registerDTO) {

        RegisterResponseDTO response = authService.register(registerDTO);

        return ResponseEntity.ok(response);
    }

    // Login User
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @Valid @RequestBody LoginDTO loginDTO) {

        LoginResponseDTO response = authService.login(loginDTO);

        return ResponseEntity.ok(response);
    }

}