import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

// Restaurant Pages
import RestaurantRegister from './pages/restaurant/RestaurantRegister';
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard';
import DonateFood from './pages/restaurant/DonateFood';
import RestaurantRequests from './pages/restaurant/RestaurantRequests';
import DonationHistory from './pages/restaurant/DonationHistory';
import RestaurantProfile from './pages/restaurant/RestaurantProfile';

// NGO Pages
import NgoRegister from './pages/ngo/NgoRegister';
import NgoDashboard from './pages/ngo/NgoDashboard';
import AvailableFood from './pages/ngo/AvailableFood';
import ReceivedFood from './pages/ngo/ReceivedFood';
import NgoProfile from './pages/ngo/NgoProfile';
import DonationDetails from './pages/ngo/DonationDetails';
import AssignVolunteer from './pages/ngo/AssignVolunteer';

// Volunteer Pages
import VolunteerRegister from './pages/volunteer/VolunteerRegister';
import VolunteerDashboard from './pages/volunteer/VolunteerDashboard';
import VolunteerPickups from './pages/volunteer/VolunteerPickups';
import DeliveryHistory from './pages/volunteer/DeliveryHistory';
import VolunteerProfile from './pages/volunteer/VolunteerProfile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRestaurants from './pages/admin/AdminRestaurants';
import AdminNgos from './pages/admin/AdminNgos';
import AdminVolunteers from './pages/admin/AdminVolunteers';
import AdminDonations from './pages/admin/AdminDonations';
import AdminReports from './pages/admin/AdminReports';
import AdminProfile from './pages/admin/AdminProfile';

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Restaurant Routes */}
      <Route path="/restaurant-register" element={<RestaurantRegister />} />
      <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
      <Route path="/donate-food" element={<DonateFood />} />
      <Route path="/requests" element={<RestaurantRequests />} />
      <Route path="/food-list" element={<RestaurantRequests />} />
      <Route path="/donation-history" element={<DonationHistory />} />
      <Route path="/history" element={<DonationHistory />} />
      <Route path="/profile" element={<RestaurantProfile />} />

      {/* NGO Routes */}
      <Route path="/ngo-register" element={<NgoRegister />} />
      <Route path="/ngo-dashboard" element={<NgoDashboard />} />
      <Route path="/available-food" element={<AvailableFood />} />
      <Route path="/received-food" element={<ReceivedFood />} />
      <Route path="/ngo-profile" element={<NgoProfile />} />
      <Route path="/donation-details" element={<DonationDetails />} />
      <Route path="/assign-volunteer" element={<AssignVolunteer />} />

      {/* Volunteer Routes */}
      <Route path="/volunteer-register" element={<VolunteerRegister />} />
      <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
      <Route path="/pickups" element={<VolunteerPickups />} />
      <Route path="/delivery-history" element={<DeliveryHistory />} />
      <Route path="/volunteer-profile" element={<VolunteerProfile />} />
      <Route path="/volunteer-update-profile" element={<VolunteerProfile />} />

      {/* Admin Routes */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-restaurants" element={<AdminRestaurants />} />
      <Route path="/admin-ngos" element={<AdminNgos />} />
      <Route path="/admin-volunteers" element={<AdminVolunteers />} />
      <Route path="/admin-donations" element={<AdminDonations />} />
      <Route path="/admin-reports" element={<AdminReports />} />
      <Route path="/admin-profile" element={<AdminProfile />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
