import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PublicNavbar() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <header className="public-header">
      <div className="public-header-container">
        {/* LEFT: Logo Section */}
        <div className="public-logo">
          <i className="fa-solid fa-hand-holding-heart"></i>
          <span>Food Rescue</span>
        </div>

        {/* CENTER: Navigation Items */}
        <nav className={`public-nav-links ${menuActive ? "active" : ""}`}>
          <a href="/#home">Home</a>
          <a href="/#about">About</a>
          <a href="/#features">Features</a>
          <a href="/#contact">Contact</a>
          <a href="/#feedback">Feedback</a>
        </nav>

        {/* RIGHT: Buttons */}
        <div className="public-nav-buttons">
          <Link to="/login" className="public-login-btn">
            Login
          </Link>
          <Link to="/register" className="public-register-btn">
            Register
          </Link>
        </div>

        <div className="public-menu-btn" onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </header>
  );
}
