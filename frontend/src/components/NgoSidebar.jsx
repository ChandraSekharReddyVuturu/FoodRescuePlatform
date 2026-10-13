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
    <aside className="sidebar" style={{ width: '260px', background: 'linear-gradient(180deg, #F4B400 0%, #E6A700 100%)', color: '#374151', minHeight: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 100, boxShadow: '2px 0 10px rgba(0,0,0,0.05)' }}>
      <div className="logo" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <i className="fa-solid fa-hand-holding-heart" style={{ fontSize: '28px', color: '#374151' }}></i>
        <h2 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: '#374151' }}>Food Rescue NGO</h2>
      </div>

      <ul style={{ listStyle: 'none', padding: '20px 10px', margin: 0 }}>
        <li style={{ marginBottom: '8px' }}>
          <Link
            to="/ngo-dashboard"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 18px',
              borderRadius: '10px',
              color: location.pathname === '/ngo-dashboard' ? '#F4B400' : '#374151',
              background: location.pathname === '/ngo-dashboard' ? '#374151' : 'transparent',
              fontWeight: location.pathname === '/ngo-dashboard' ? '700' : '600',
              textDecoration: 'none',
              transition: '0.2s ease',
            }}
          >
            <i className="fa-solid fa-house" style={{ width: '20px' }}></i>
            Dashboard
          </Link>
        </li>

        <li style={{ marginBottom: '8px' }}>
          <Link
            to="/available-food"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 18px',
              borderRadius: '10px',
              color: location.pathname === '/available-food' ? '#F4B400' : '#374151',
              background: location.pathname === '/available-food' ? '#374151' : 'transparent',
              fontWeight: location.pathname === '/available-food' ? '700' : '600',
              textDecoration: 'none',
              transition: '0.2s ease',
            }}
          >
            <i className="fa-solid fa-bowl-food" style={{ width: '20px' }}></i>
            Discover Available Food
          </Link>
        </li>

        <li style={{ marginBottom: '8px' }}>
          <Link
            to="/received-food"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 18px',
              borderRadius: '10px',
              color: location.pathname === '/received-food' ? '#F4B400' : '#374151',
              background: location.pathname === '/received-food' ? '#374151' : 'transparent',
              fontWeight: location.pathname === '/received-food' ? '700' : '600',
              textDecoration: 'none',
              transition: '0.2s ease',
            }}
          >
            <i className="fa-solid fa-list-check" style={{ width: '20px' }}></i>
            My NGO Requests & Food
          </Link>
        </li>

        <li style={{ marginBottom: '8px' }}>
          <Link
            to="/assign-volunteer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 18px',
              borderRadius: '10px',
              color: location.pathname === '/assign-volunteer' ? '#F4B400' : '#374151',
              background: location.pathname === '/assign-volunteer' ? '#374151' : 'transparent',
              fontWeight: location.pathname === '/assign-volunteer' ? '700' : '600',
              textDecoration: 'none',
              transition: '0.2s ease',
            }}
          >
            <i className="fa-solid fa-user-plus" style={{ width: '20px' }}></i>
            Assign Volunteers
          </Link>
        </li>

        <li style={{ marginBottom: '8px' }}>
          <Link
            to="/ngo-profile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 18px',
              borderRadius: '10px',
              color: location.pathname === '/ngo-profile' || location.pathname === '/profile' ? '#F4B400' : '#374151',
              background: location.pathname === '/ngo-profile' || location.pathname === '/profile' ? '#374151' : 'transparent',
              fontWeight: location.pathname === '/ngo-profile' || location.pathname === '/profile' ? '700' : '600',
              textDecoration: 'none',
              transition: '0.2s ease',
            }}
          >
            <i className="fa-solid fa-user" style={{ width: '20px' }}></i>
            NGO Profile
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
