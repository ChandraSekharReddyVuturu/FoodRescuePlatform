import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export default function VolunteerSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    authService.logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <i className="fa-solid fa-person-carry-box"></i>
        <h2>Volunteer Panel</h2>
      </div>

      <ul>
        <li className={location.pathname === '/volunteer-dashboard' ? 'active' : ''}>
          <Link to="/volunteer-dashboard">
            <i className="fa-solid fa-chart-line"></i>
            Dashboard
          </Link>
        </li>

        <li className={location.pathname === '/pickups' ? 'active' : ''}>
          <Link to="/pickups">
            <i className="fa-solid fa-truck"></i>
            Pickups
          </Link>
        </li>

        <li className={location.pathname === '/delivery-history' ? 'active' : ''}>
          <Link to="/delivery-history">
            <i className="fa-solid fa-clock-rotate-left"></i>
            Delivery History
          </Link>
        </li>

        <li className={location.pathname === '/volunteer-profile' ? 'active' : ''}>
          <Link to="/volunteer-profile">
            <i className="fa-solid fa-user"></i>
            Profile
          </Link>
        </li>

        <li>
          <a href="#" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            Logout
          </a>
        </li>
      </ul>
    </aside>
  );
}
