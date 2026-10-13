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
    <aside className="sidebar" style={{ width: '260px', background: 'linear-gradient(180deg, #F4B400 0%, #E6A700 100%)', color: '#374151', minHeight: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 100, boxShadow: '2px 0 10px rgba(0,0,0,0.05)' }}>
      <div className="logo" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <i className="fa-solid fa-person-shelter" style={{ fontSize: '28px', color: '#374151' }}></i>
        <h2 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: '#374151' }}>Volunteer Portal</h2>
      </div>

      <ul style={{ listStyle: 'none', padding: '20px 10px', margin: 0 }}>
        <li style={{ marginBottom: '8px' }}>
          <Link
            to="/volunteer-dashboard"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 18px',
              borderRadius: '10px',
              color: location.pathname === '/volunteer-dashboard' ? '#F4B400' : '#374151',
              background: location.pathname === '/volunteer-dashboard' ? '#374151' : 'transparent',
              fontWeight: location.pathname === '/volunteer-dashboard' ? '700' : '600',
              textDecoration: 'none',
              transition: '0.2s ease',
            }}
          >
            <i className="fa-solid fa-gauge-high" style={{ width: '20px' }}></i>
            Dashboard
          </Link>
        </li>

        <li style={{ marginBottom: '8px' }}>
          <Link
            to="/pickups"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 18px',
              borderRadius: '10px',
              color: location.pathname === '/pickups' ? '#F4B400' : '#374151',
              background: location.pathname === '/pickups' ? '#374151' : 'transparent',
              fontWeight: location.pathname === '/pickups' ? '700' : '600',
              textDecoration: 'none',
              transition: '0.2s ease',
            }}
          >
            <i className="fa-solid fa-truck-ramp-box" style={{ width: '20px' }}></i>
            Active Pickups
          </Link>
        </li>

        <li style={{ marginBottom: '8px' }}>
          <Link
            to="/delivery-history"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 18px',
              borderRadius: '10px',
              color: location.pathname === '/delivery-history' ? '#F4B400' : '#374151',
              background: location.pathname === '/delivery-history' ? '#374151' : 'transparent',
              fontWeight: location.pathname === '/delivery-history' ? '700' : '600',
              textDecoration: 'none',
              transition: '0.2s ease',
            }}
          >
            <i className="fa-solid fa-clock-rotate-left" style={{ width: '20px' }}></i>
            Delivery History
          </Link>
        </li>

        <li style={{ marginBottom: '8px' }}>
          <Link
            to="/volunteer-profile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 18px',
              borderRadius: '10px',
              color: location.pathname === '/volunteer-profile' ? '#F4B400' : '#374151',
              background: location.pathname === '/volunteer-profile' ? '#374151' : 'transparent',
              fontWeight: location.pathname === '/volunteer-profile' ? '700' : '600',
              textDecoration: 'none',
              transition: '0.2s ease',
            }}
          >
            <i className="fa-solid fa-id-card" style={{ width: '20px' }}></i>
            My Profile
          </Link>
        </li>

        <li style={{ marginTop: '30px' }}>
          <a
            href="#"
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 18px',
              borderRadius: '10px',
              color: '#b91c1c',
              textDecoration: 'none',
              fontWeight: '700',
              transition: '0.2s ease',
            }}
          >
            <i className="fa-solid fa-right-from-bracket" style={{ width: '20px' }}></i>
            Logout
          </a>
        </li>
      </ul>
    </aside>
  );
}
