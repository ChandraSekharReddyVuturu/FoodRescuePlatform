import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export default function NgoSidebar() {
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
        <i className="fa-solid fa-hand-holding-heart"></i>
        <h2>NGO Panel</h2>
      </div>

      <ul>
        <li className={location.pathname === '/ngo-dashboard' ? 'active' : ''}>
          <Link to="/ngo-dashboard">
            <i className="fa-solid fa-house"></i>
            Dashboard
          </Link>
        </li>

        <li className={location.pathname === '/available-food' ? 'active' : ''}>
          <Link to="/available-food">
            <i className="fa-solid fa-bowl-food"></i>
            Available Food
          </Link>
        </li>

        <li className={location.pathname === '/received-food' ? 'active' : ''}>
          <Link to="/received-food">
            <i className="fa-solid fa-box-open"></i>
            Received Food
          </Link>
        </li>

        <li className={location.pathname === '/ngo-profile' || location.pathname === '/profile' ? 'active' : ''}>
          <Link to="/ngo-profile">
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
