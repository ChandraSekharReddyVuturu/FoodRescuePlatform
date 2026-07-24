import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import '../../assets/css/public/login.css';

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('restaurant');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('Login');

  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter Email and Password.');
      return;
    }

    setLoading(true);
    setButtonText('Signing In...');

    try {
      const data = await authService.login(email, password, selectedRole);

      localStorage.clear();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('role', data.role);

      if (data.restaurantId) {
        localStorage.setItem('restaurantId', data.restaurantId);
        localStorage.setItem('restaurantName', data.restaurantName);
      }

      if (data.ngoId) {
        localStorage.setItem('ngoId', data.ngoId);
        localStorage.setItem('ngoName', data.ngoName);
      }

      if (data.volunteerId) {
        localStorage.setItem('volunteerId', data.volunteerId);
      }

      if (data.adminId) {
        localStorage.setItem('adminId', data.adminId);
      }

      setButtonText('Login Successful');

      setTimeout(() => {
        switch (data.role.toUpperCase()) {
          case 'RESTAURANT':
            navigate('/restaurant-dashboard');
            break;
          case 'NGO':
            navigate('/ngo-dashboard');
            break;
          case 'VOLUNTEER':
            navigate('/volunteer-dashboard');
            break;
          case 'ADMIN':
            navigate('/admin-dashboard');
            break;
          default:
            alert('Unknown User Role.');
            setLoading(false);
            setButtonText('Login');
        }
      }, 700);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Invalid Email or Password.');
      setLoading(false);
      setButtonText('Login');
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        {/* Left Side */}
        <div className="login-left">
          <div className="brand">
            <i className="fa-solid fa-bowl-food logo"></i>
            <h1>Food Rescue Platform</h1>
            <p>
              Connecting Restaurants, NGOs, Volunteers and
              Communities to reduce food waste.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="login-right">
          <div className="login-box">
            <h2>Welcome Back 👋</h2>
            <p className="subtitle">
              Select your account type and sign in.
            </p>

            <h3 className="role-title">Choose Your Role</h3>

            <div className="role-grid">
              <div
                className={`role-card ${selectedRole === 'restaurant' ? 'active' : ''}`}
                data-role="restaurant"
                onClick={() => handleRoleSelect('restaurant')}
              >
                <i className="fa-solid fa-utensils"></i>
                <span>Restaurant</span>
              </div>

              <div
                className={`role-card ${selectedRole === 'ngo' ? 'active' : ''}`}
                data-role="ngo"
                onClick={() => handleRoleSelect('ngo')}
              >
                <i className="fa-solid fa-hand-holding-heart"></i>
                <span>NGO</span>
              </div>

              <div
                className={`role-card ${selectedRole === 'volunteer' ? 'active' : ''}`}
                data-role="volunteer"
                onClick={() => handleRoleSelect('volunteer')}
              >
                <i className="fa-solid fa-truck-fast"></i>
                <span>Volunteer</span>
              </div>

              <div
                className={`role-card ${selectedRole === 'admin' ? 'active' : ''}`}
                data-role="admin"
                onClick={() => handleRoleSelect('admin')}
              >
                <i className="fa-solid fa-user-shield"></i>
                <span>Admin</span>
              </div>
            </div>

            <form id="loginForm" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-box">
                  <i className="fa-solid fa-envelope"></i>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="input-box">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <i
                    className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
                    id="togglePassword"
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>
              </div>

              <div className="remember">
                <label>
                  <input type="checkbox" /> Remember Me
                </label>
                <a href="#">Forgot Password?</a>
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-right-to-bracket'}`}></i>
                {buttonText}
              </button>
            </form>

            <div className="divider">
              <span>OR</span>
            </div>

            <p className="register-text">
              Don't have an account? <Link to="/register">Register Here</Link>
            </p>

            <Link to="/" className="back-home">
              <i className="fa-solid fa-arrow-left"></i> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
