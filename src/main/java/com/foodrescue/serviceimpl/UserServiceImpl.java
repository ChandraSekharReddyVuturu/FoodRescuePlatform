package com.foodrescue.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.foodrescue.entity.User;
import com.foodrescue.exception.ResourceNotFoundException;
import com.foodrescue.repository.UserRepository;
import com.foodrescue.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long userId) {

        return userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with ID : " + userId));
    }

    @Override
    public User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with Email : " + email));
    }

    @Override
    public List<User> getUsersByRole(String role) {

        return userRepository.findByRole(role);
    }

    @Override
    public User updateUser(Long userId, User updatedUser) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with ID : " + userId));

        user.setFullName(updatedUser.getFullName());
        user.setEmail(updatedUser.getEmail());

        if (updatedUser.getPassword() != null &&
                !updatedUser.getPassword().isBlank()) {

            user.setPassword(
                    passwordEncoder.encode(updatedUser.getPassword()));
        }

        user.setRole(updatedUser.getRole());
        user.setStatus(updatedUser.getStatus());

        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with ID : " + userId));

        userRepository.delete(user);
    }

}