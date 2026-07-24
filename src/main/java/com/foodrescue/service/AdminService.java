package com.foodrescue.service;

import java.util.Map;

import com.foodrescue.entity.Admin;

public interface AdminService {

    /**
     * Approve Restaurant
     *
     * @param restaurantId
     */
    void approveRestaurant(Long restaurantId);

    /**
     * Reject Restaurant
     *
     * @param restaurantId
     */
    void rejectRestaurant(Long restaurantId);

    /**
     * Block Restaurant
     *
     * @param restaurantId
     */
    void blockRestaurant(Long restaurantId);

    /**
     * Unblock Restaurant
     *
     * @param restaurantId
     */
    void unblockRestaurant(Long restaurantId);

    /**
     * Approve NGO
     *
     * @param ngoId
     */
    void approveNgo(Long ngoId);

    /**
     * Reject NGO
     *
     * @param ngoId
     */
    void rejectNgo(Long ngoId);

    /**
     * Block NGO
     *
     * @param ngoId
     */
    void blockNgo(Long ngoId);

    /**
     * Unblock NGO
     *
     * @param ngoId
     */
    void unblockNgo(Long ngoId);
    
    Admin registerAdmin(Admin admin);
    
    Map<String,Object> getDashboardData();
    void approveVolunteer(Long id);

    void rejectVolunteer(Long id);

    void blockVolunteer(Long id);

    void unblockVolunteer(Long id);

}