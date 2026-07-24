package com.foodrescue.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    /* ==========================================
                    PUBLIC
    ========================================== */

    @GetMapping("/")
    public String home() {
        return "public/home";
    }

    @GetMapping("/login")
    public String login() {
        return "public/login";
    }

    @GetMapping("/register")
    public String register() {
        return "public/register";
    }

    /* ==========================================
                RESTAURANT
    ========================================== */

    @GetMapping("/restaurant-register")
    public String restaurantRegister() {
        return "restaurant/restaurant-register";
    }

    @GetMapping("/restaurant-dashboard")
    public String restaurantDashboard() {
        return "restaurant/dashboard";
    }

    @GetMapping("/donate-food")
    public String donateFood() {
        return "restaurant/donate-food";
    }

    @GetMapping("/requests")
    public String requests() {
        return "restaurant/requests";
    }
    @GetMapping("/food-list")
    public String foodlist() {
        return "restaurant/requests";
    }

    @GetMapping("/donation-history")
    public String donationHistory() {
        return "restaurant/donation-history";
    }
    
    @GetMapping("/history")
    public String history() {
        return "restaurant/donation-history";
    }

    @GetMapping("/profile")
    public String profile() {
        return "restaurant/profile";
    }

    /* ==========================================
                    NGO
    ========================================== */

@GetMapping("/ngo-register")
public String ngoRegister() {
return "ngo/ngo-register";
}

@GetMapping("/ngo-dashboard")
public String ngoDashboard() {
return "ngo/dashboard";
}

/* ==========================================
AVAILABLE FOOD
========================================== */

@GetMapping("/available-food")
public String availableFood() {
return "ngo/available-food";
}

/* ==========================================
RECEIVED FOOD
========================================== */

@GetMapping("/received-food")
public String receivedFood() {
return "ngo/received-food";
}

/* ==========================================
NGO PROFILE
========================================== */

@GetMapping("/ngo-profile")
public String ngoProfile() {
return "ngo/profile";
}

@GetMapping("/donation-details")
public String donationDetails(){

    return "ngo/donation-details";

}
//======================================
//NGO ASSIGN VOLUNTEER PAGE
//======================================

@GetMapping("/assign-volunteer")
public String assignVolunteerPage(){

 return "ngo/assign-volunteer";

}

    /* ==========================================
                VOLUNTEER
    ========================================== */

//======================================
//VOLUNTEER DASHBOARD
//======================================

//================================
//VOLUNTEER UPDATE PROFILE
//================================

@GetMapping("/volunteer-update-profile")
public String volunteerUpdateProfile(){

 return "volunteer/update-profile";

}

@GetMapping("/volunteer-dashboard")
public String volunteerDashboard(){

 return "volunteer/dashboard";

}





//======================================
//VOLUNTEER PICKUPS
//======================================

@GetMapping("/pickups")
public String volunteerPickups(){

 return "volunteer/pickups";

}





//======================================
//DELIVERY HISTORY
//======================================

@GetMapping("/delivery-history")
public String deliveryHistory(){

 return "volunteer/delivery-history";

}





//======================================
//VOLUNTEER PROFILE
//======================================

@GetMapping("/volunteer-profile")
public String volunteerProfile(){

 return "volunteer/profile";

}





//======================================
//VOLUNTEER REGISTER
//======================================

@GetMapping("/volunteer-register")
public String volunteerRegister(){

 return "volunteer/volunteer-register";

}
    

@GetMapping("/admin-dashboard")
public String adminDashboard(){

    return "admin/dashboard";

}



// =========================
// RESTAURANTS
// =========================

@GetMapping("/admin-restaurants")
public String restaurants(){

    return "admin/restaurants";

}



// =========================
// NGOS
// =========================

@GetMapping("/admin-ngos")
public String ngos(){

    return "admin/ngos";

}




// =========================
// VOLUNTEERS
// =========================

@GetMapping("/admin-volunteers")
public String volunteers(){

    return "admin/volunteers";

}





// =========================
// DONATIONS
// =========================

@GetMapping("/admin-donations")
public String donations(){

    return "admin/donations";

}





// =========================
// USERS
// =========================

@GetMapping("/admin-users")
public String users(){

    return "admin/users";

}





// =========================
// REPORTS
// =========================

@GetMapping("/admin-reports")
public String reports(){

    return "admin/reports";

}





// =========================
// PROFILE
// =========================

@GetMapping("/admin-profile")
public String adminprofile(){

    return "admin/profile";

}

}