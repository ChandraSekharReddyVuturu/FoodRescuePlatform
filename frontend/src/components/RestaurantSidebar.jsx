import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export default function RestaurantSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    authService.logout();
    navigate('/login');
  };

  return (
    <aside className="restaurant-sidebar">
      <div className="logo">
        <i className="fa-solid fa-utensils"></i>
        <h2>Food Rescue</h2>
      </div>

      <ul className="menu">
        <li className={location.pathname === '/restaurant-dashboard' ? 'active' : ''}>
          <Link to="/restaurant-dashboard">
            <i className="fa-solid fa-house"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <li className={location.pathname === '/donate-food' ? 'active' : ''}>
          <Link to="/donate-food">
            <i className="fa-solid fa-bowl-food"></i>
            <span>Donate Food</span>
          </Link>
        </li>

        <li className={location.pathname === '/requests' || location.pathname === '/food-list' || location.pathname === '/restaurant-requests' ? 'active' : ''}>
          <Link to="/requests">
            <i className="fa-solid fa-list-check"></i>
            <span>Manage Donations</span>
          </Link>
        </li>

        <li className={location.pathname === '/donation-history' || location.pathname === '/history' ? 'active' : ''}>
          <Link to="/donation-history">
            <i className="fa-solid fa-clock-rotate-left"></i>
            <span>Donation History</span>
          </Link>
        </li>

        <li className={location.pathname === '/profile' || location.pathname === '/restaurant-profile' ? 'active' : ''}>
          <Link to="/profile">
            <i className="fa-solid fa-user"></i>
            <span>Profile</span>
          </Link>
        </li>

        <li>
          <a href="#" onClick={handleLogout} id="logoutBtn">
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}
