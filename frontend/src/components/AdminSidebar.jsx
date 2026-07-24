import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export default function AdminSidebar() {
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
        <i className="fa-solid fa-shield-heart"></i>
        <h2>Admin Panel</h2>
      </div>

      <ul>
        <li className={location.pathname === '/admin-dashboard' ? 'active' : ''}>
          <Link to="/admin-dashboard">
            <i className="fa-solid fa-chart-line"></i>
            Dashboard
          </Link>
        </li>

        <li className={location.pathname === '/admin-restaurants' ? 'active' : ''}>
          <Link to="/admin-restaurants">
            <i className="fa-solid fa-utensils"></i>
            Restaurants
          </Link>
        </li>

        <li className={location.pathname === '/admin-ngos' ? 'active' : ''}>
          <Link to="/admin-ngos">
            <i className="fa-solid fa-hand-holding-heart"></i>
            NGOs
          </Link>
        </li>

        <li className={location.pathname === '/admin-volunteers' ? 'active' : ''}>
          <Link to="/admin-volunteers">
            <i className="fa-solid fa-person-circle-check"></i>
            Volunteers
          </Link>
        </li>

        <li className={location.pathname === '/admin-donations' ? 'active' : ''}>
          <Link to="/admin-donations">
            <i className="fa-solid fa-box-open"></i>
            Donations
          </Link>
        </li>

        <li className={location.pathname === '/admin-reports' ? 'active' : ''}>
          <Link to="/admin-reports">
            <i className="fa-solid fa-chart-pie"></i>
            Reports
          </Link>
        </li>

        <li className={location.pathname === '/admin-profile' ? 'active' : ''}>
          <Link to="/admin-profile">
            <i className="fa-solid fa-user-shield"></i>
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
