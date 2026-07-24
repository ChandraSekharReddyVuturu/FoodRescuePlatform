import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = Number(localStorage.getItem('userId'));
    const restaurantData = { ...formData, userId };

    if (!restaurantData.restaurantName.trim()) {
      alert('Enter Restaurant Name');
      return;
    }
    if (!restaurantData.ownerName.trim()) {
      alert('Enter Owner Name');
      return;
    }
    if (!/^[0-9]{10}$/.test(restaurantData.phone.trim())) {
      alert('Enter Valid Phone Number');
      return;
    }
    if (!restaurantData.licenseNumber.trim()) {
      alert('Enter License Number');
      return;
    }
    if (!restaurantData.city.trim()) {
      alert('Enter City');
      return;
    }
    if (!restaurantData.address.trim()) {
      alert('Enter Address');
      return;
    }

    setLoading(true);

    try {
      const data = await restaurantService.registerRestaurant(restaurantData);

      localStorage.setItem('restaurantId', data.restaurantId);
      localStorage.setItem('restaurantName', data.restaurantName);

      alert('Restaurant Registered Successfully!');
      navigate('/restaurant-dashboard');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="restaurant-register-page-wrapper">
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
                <span>Donate Extra Food</span>
              </div>

              <div className="benefit">
                <div className="benefit-icon">
                  <i className="fa-solid fa-earth-asia"></i>
                </div>
                <span>Reduce Food Waste</span>
              </div>

              <div className="benefit">
                <div className="benefit-icon">
                  <i className="fa-solid fa-hand-holding-heart"></i>
                </div>
                <span>Support Your Community</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <div className="register-card">
            <h2>Restaurant Details</h2>
            <p className="subtitle">Complete your restaurant profile to continue.</p>

            <form onSubmit={handleSubmit}>
              {/* Restaurant Name */}
              <div className="input-group">
                <label htmlFor="restaurantName">Restaurant Name</label>
                <div className="input-box">
                  <span className="icon-left">
                    <i className="fa-solid fa-store"></i>
                  </span>
                  <input
                    type="text"
                    id="restaurantName"
                    placeholder="Restaurant Name"
                    value={formData.restaurantName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Owner Name */}
              <div className="input-group">
                <label htmlFor="ownerName">Owner Name</label>
                <div className="input-box">
                  <span className="icon-left">
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <input
                    type="text"
                    id="ownerName"
                    placeholder="Owner Name"
                    value={formData.ownerName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="input-group">
                <label htmlFor="phone">Phone Number</label>
                <div className="input-box">
                  <span className="icon-left">
                    <i className="fa-solid fa-phone"></i>
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Phone Number"
                    maxLength="10"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* License Number */}
              <div className="input-group">
                <label htmlFor="licenseNumber">License Number</label>
                <div className="input-box">
                  <span className="icon-left">
                    <i className="fa-solid fa-id-card"></i>
                  </span>
                  <input
                    type="text"
                    id="licenseNumber"
                    placeholder="Food License Number"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* City */}
              <div className="input-group">
                <label htmlFor="city">City</label>
                <div className="input-box">
                  <span className="icon-left">
                    <i className="fa-solid fa-location-dot"></i>
                  </span>
                  <input
                    type="text"
                    id="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="input-group">
                <label htmlFor="address">Restaurant Address</label>
                <textarea
                  id="address"
                  rows="4"
                  placeholder="Complete Restaurant Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Button */}
              <button type="submit" className="register-btn" disabled={loading}>
                <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-store'}`}></i>
                {loading ? 'Registering...' : 'Register Restaurant'}
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
