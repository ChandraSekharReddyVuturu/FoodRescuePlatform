import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast';
import restaurantService from '../../services/restaurantService';
import '../../assets/css/restaurant/restaurant-register.css';

export default function RestaurantRegister() {
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    phone: '',
    licenseNumber: '',
    city: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validate = () => {
    if (!formData.restaurantName.trim()) {
      setToast({ message: 'Enter Restaurant Name', type: 'warning' });
      return false;
    }
    if (!formData.ownerName.trim()) {
      setToast({ message: 'Enter Owner Name', type: 'warning' });
      return false;
    }
    if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      setToast({ message: 'Enter Valid 10-digit Phone Number', type: 'warning' });
      return false;
    }
    if (!formData.licenseNumber.trim()) {
      setToast({ message: 'Enter Food License Number', type: 'warning' });
      return false;
    }
    if (!formData.city.trim()) {
      setToast({ message: 'Enter City', type: 'warning' });
      return false;
    }
    if (!formData.address.trim()) {
      setToast({ message: 'Enter Complete Address', type: 'warning' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      setToast({ message: 'User account session not found. Please register/login first.', type: 'error' });
      setTimeout(() => navigate('/register'), 1500);
      return;
    }

    const restaurantData = { ...formData, userId };

    setLoading(true);

    try {
      const data = await restaurantService.registerRestaurant(restaurantData);

      if (data && data.restaurantId) {
        localStorage.setItem('restaurantId', data.restaurantId);
        localStorage.setItem('restaurantName', data.restaurantName);
      }

      setToast({ message: 'Restaurant Profile Registered Successfully!', type: 'success' });
      setTimeout(() => {
        navigate('/restaurant-dashboard');
      }, 1200);
    } catch (error) {
      console.error(error);
      setToast({
        message: error.response?.data?.message || error.message || 'Restaurant registration failed',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="restaurant-register-page-wrapper">
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <div className="register-container">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="bg-circle-1"></div>
          <div className="bg-circle-2"></div>
          <div className="overlay">
            <div className="logo">
              <i className="fa-solid fa-utensils"></i>
              <h1>Food Rescue</h1>
            </div>

            <h2>Restaurant<br />Registration</h2>

            <p>
              Join the Food Rescue Platform and help reduce food waste by donating surplus food to NGOs and people in need.
            </p>

            <div className="benefits">
              <div className="benefit">
                <div className="benefit-icon">
                  <i className="fa-solid fa-utensils"></i>
                </div>
                <span>Donate Surplus Food</span>
              </div>

              <div className="benefit">
                <div className="benefit-icon">
                  <i className="fa-solid fa-earth-asia"></i>
                </div>
                <span>Zero Food Waste</span>
              </div>

              <div className="benefit">
                <div className="benefit-icon">
                  <i className="fa-solid fa-hand-holding-heart"></i>
                </div>
                <span>Social Impact Metrics</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <div className="register-card">
            <h2>Complete Restaurant Details</h2>
            <p className="subtitle">Provide your establishment details to activate your restaurant account.</p>

            <form onSubmit={handleSubmit}>
              {/* Restaurant Name */}
              <div className="input-group">
                <label htmlFor="restaurantName">Restaurant Name *</label>
                <div className="input-box">
                  <span className="icon-left">
                    <i className="fa-solid fa-store"></i>
                  </span>
                  <input
                    type="text"
                    id="restaurantName"
                    placeholder="e.g. Spice Garden Bistro"
                    value={formData.restaurantName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Owner Name */}
              <div className="input-group">
                <label htmlFor="ownerName">Owner / Manager Name *</label>
                <div className="input-box">
                  <span className="icon-left">
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <input
                    type="text"
                    id="ownerName"
                    placeholder="Owner Full Name"
                    value={formData.ownerName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="input-group">
                <label htmlFor="phone">Phone Number *</label>
                <div className="input-box">
                  <span className="icon-left">
                    <i className="fa-solid fa-phone"></i>
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="10-digit phone number"
                    maxLength="10"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* License Number */}
              <div className="input-group">
                <label htmlFor="licenseNumber">Food License / FSSAI Number *</label>
                <div className="input-box">
                  <span className="icon-left">
                    <i className="fa-solid fa-id-card"></i>
                  </span>
                  <input
                    type="text"
                    id="licenseNumber"
                    placeholder="e.g. FSSAI123456789"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* City */}
              <div className="input-group">
                <label htmlFor="city">City *</label>
                <div className="input-box">
                  <span className="icon-left">
                    <i className="fa-solid fa-location-dot"></i>
                  </span>
                  <input
                    type="text"
                    id="city"
                    placeholder="e.g. Mumbai"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="input-group">
                <label htmlFor="address">Restaurant Address *</label>
                <textarea
                  id="address"
                  rows="3"
                  placeholder="Complete Street Address & Landmark"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Button */}
              <button type="submit" className="register-btn" disabled={loading}>
                <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-store'}`}></i>
                {loading ? 'Registering Restaurant...' : 'Complete Registration'}
              </button>
            </form>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="login-link">
              Already registered? <Link to="/login">Login</Link>
            </div>

            <div className="back-home">
              <Link to="/">
                <i className="fa-solid fa-arrow-left"></i> Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
