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
    <aside className="sidebar" style={{ width: '260px', background: 'linear-gradient(180deg, #F4B400 0%, #E6A700 100%)', color: '#374151', minHeight: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 100, boxShadow: '2px 0 10px rgba(0,0,0,0.05)' }}>
      <div className="logo" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <i className="fa-solid fa-shield-halved" style={{ fontSize: '28px', color: '#374151' }}></i>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: '#374151' }}>Food Rescue</h2>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#374151', fontWeight: '700' }}>Admin Console</span>
        </div>
      </div>

      <ul style={{ listStyle: 'none', padding: '20px 10px', margin: 0 }}>
        <li style={{ marginBottom: '8px' }}>
          <Link
            to="/admin-dashboard"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 18px',
              borderRadius: '10px',
              color: location.pathname === '/admin-dashboard' ? '#F4B400' : '#374151',
              background: location.pathname === '/admin-dashboard' ? '#374151' : 'transparent',
              fontWeight: location.pathname === '/admin-dashboard' ? '700' : '600',
              textDecoration: 'none',
              transition: '0.2s ease',
            }}
          >
            <i className="fa-solid fa-chart-line" style={{ width: '20px' }}></i>
            Dashboard
          </Link>
        </li>

        <li style={{ marginBottom: '8px' }}>
          <Link
            to="/admin-restaurants"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 18px',
              borderRadius: '10px',
              color: location.pathname === '/admin-restaurants' ? '#F4B400' : '#374151',
              background: location.pathname === '/admin-restaurants' ? '#374151' : 'transparent',
              fontWeight: location.pathname === '/admin-restaurants' ? '700' : '600',
              textDecoration: 'none',
              transition: '0.2s ease',
            }}
          >
            <i className="fa-solid fa-utensils" style={{ width: '20px' }}></i>
            Restaurants
          </Link>
        </li>

        <li style={{ marginBottom: '8px' }}>
          <Link
            to="/admin-ngos"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 18px',
              borderRadius: '10px',
              color: location.pathname === '/admin-ngos' ? '#F4B400' : '#374151',
              background: location.pathname === '/admin-ngos' ? '#374151' : 'transparent',
              fontWeight: location.pathname === '/admin-ngos' ? '700' : '600',
              textDecoration: 'none',
              transition: '0.2s ease',
            }}
          >
            <i className="fa-solid fa-hand-holding-heart" style={{ width: '20px' }}></i>
            NGOs
          </Link>
        </li>

        <li style={{ marginBottom: '8px' }}>
          <Link
            to="/admin-volunteers"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 18px',
              borderRadius: '10px',
              color: location.pathname === '/admin-volunteers' ? '#F4B400' : '#374151',
              background: location.pathname === '/admin-volunteers' ? '#374151' : 'transparent',
              fontWeight: location.pathname === '/admin-volunteers' ? '700' : '600',
              textDecoration: 'none',
              transition: '0.2s ease',
            }}
          >
            <i className="fa-solid fa-person-circle-check" style={{ width: '20px' }}></i>
            Volunteers
          </Link>
        </li>

        <li style={{ marginBottom: '8px' }}>
          <Link
            to="/admin-donations"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 18px',
              borderRadius: '10px',
              color: location.pathname === '/admin-donations' ? '#F4B400' : '#374151',
              background: location.pathname === '/admin-donations' ? '#374151' : 'transparent',
              fontWeight: location.pathname === '/admin-donations' ? '700' : '600',
              textDecoration: 'none',
              transition: '0.2s ease',
            }}
          >
            <i className="fa-solid fa-box-open" style={{ width: '20px' }}></i>
            Donations
          </Link>
        </li>

        <li style={{ marginBottom: '8px' }}>
          <Link
            to="/admin-reports"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 18px',
              borderRadius: '10px',
              color: location.pathname === '/admin-reports' ? '#F4B400' : '#374151',
              background: location.pathname === '/admin-reports' ? '#374151' : 'transparent',
              fontWeight: location.pathname === '/admin-reports' ? '700' : '600',
              textDecoration: 'none',
              transition: '0.2s ease',
            }}
          >
            <i className="fa-solid fa-chart-pie" style={{ width: '20px' }}></i>
            Reports & Analytics
          </Link>
        </li>

        <li style={{ marginBottom: '8px' }}>
          <Link
            to="/admin-profile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 18px',
              borderRadius: '10px',
              color: location.pathname === '/admin-profile' ? '#F4B400' : '#374151',
              background: location.pathname === '/admin-profile' ? '#374151' : 'transparent',
              fontWeight: location.pathname === '/admin-profile' ? '700' : '600',
              textDecoration: 'none',
              transition: '0.2s ease',
            }}
          >
            <i className="fa-solid fa-user-shield" style={{ width: '20px' }}></i>
            Admin Profile
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
