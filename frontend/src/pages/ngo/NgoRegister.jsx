import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast';
import ngoService from '../../services/ngoService';
import '../../assets/css/ngo/ngo-register.css';

export default function NgoRegister() {
  const [formData, setFormData] = useState({
    ngoName: '',
    ownerName: '',
    phone: '',
    registrationNumber: '',
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
    if (!formData.ngoName.trim()) {
      setToast({ message: 'Enter NGO Name', type: 'warning' });
      return false;
    }
    if (!formData.ownerName.trim()) {
      setToast({ message: 'Enter Owner / Representative Name', type: 'warning' });
      return false;
    }
    if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      setToast({ message: 'Enter Valid 10-digit Phone Number', type: 'warning' });
      return false;
    }
    if (!formData.registrationNumber.trim()) {
      setToast({ message: 'Enter NGO Registration Number', type: 'warning' });
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

    const ngoData = { ...formData, userId };

    setLoading(true);

    try {
      const data = await ngoService.registerNGO(ngoData);

      if (data && data.ngoId) {
        localStorage.setItem('ngoId', data.ngoId);
        localStorage.setItem('ngoName', data.ngoName);
      }

      setToast({ message: 'NGO Registered Successfully!', type: 'success' });
      setTimeout(() => {
        navigate('/ngo-dashboard');
      }, 1200);
    } catch (error) {
      console.error(error);
      setToast({
        message: error.response?.data?.message || error.message || 'NGO registration failed',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ngo-register-page-wrapper">
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <div className="register-container">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="bg-circle-1"></div>
          <div className="bg-circle-2"></div>
          <div className="overlay">
            <div className="logo">
              <i className="fa-solid fa-hand-holding-heart"></i>
              <h1>Food Rescue</h1>
            </div>

            <h2>NGO<br />Registration</h2>

            <p>
              Join the Food Rescue Platform and help distribute rescued food to people in need by connecting with restaurants and volunteers.
            </p>

            <div className="benefits">
              <div className="benefit">
                <div className="benefit-icon">
                  <i className="fa-solid fa-box-open"></i>
                </div>
                <span>Receive Surplus Food</span>
              </div>

              <div className="benefit">
                <div className="benefit-icon">
                  <i className="fa-solid fa-hand-holding-heart"></i>
                </div>
                <span>Feed Communities</span>
              </div>

              <div className="benefit">
                <div className="benefit-icon">
                  <i className="fa-solid fa-people-group"></i>
                </div>
                <span>Coordinate Volunteers</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <div className="register-card">
            <h2>Complete NGO Profile</h2>
            <p className="subtitle">Fill in your NGO details to start requesting food.</p>

            <form onSubmit={handleSubmit}>
              {/* NGO Name */}
              <div className="input-group">
                <label htmlFor="ngoName">NGO Name *</label>
                <div className="input-box">
                  <span className="icon-left">
                    <i className="fa-solid fa-building"></i>
                  </span>
                  <input
                    type="text"
                    id="ngoName"
                    placeholder="e.g. Hope Foundation NGO"
                    value={formData.ngoName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Owner Name */}
              <div className="input-group">
                <label htmlFor="ownerName">Owner / Representative Name *</label>
                <div className="input-box">
                  <span className="icon-left">
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <input
                    type="text"
                    id="ownerName"
                    placeholder="Representative Full Name"
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
                    placeholder="10-digit Phone Number"
                    maxLength="10"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Registration Number */}
              <div className="input-group">
                <label htmlFor="registrationNumber">NGO Registration / Tax ID *</label>
                <div className="input-box">
                  <span className="icon-left">
                    <i className="fa-solid fa-id-card"></i>
                  </span>
                  <input
                    type="text"
                    id="registrationNumber"
                    placeholder="e.g. NGO123456789"
                    value={formData.registrationNumber}
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
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="input-group">
                <label htmlFor="address">NGO Address *</label>
                <textarea
                  id="address"
                  rows="3"
                  placeholder="Complete NGO Office Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Button */}
              <button type="submit" className="register-btn" disabled={loading}>
                <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-hand-holding-heart'}`}></i>
                {loading ? 'Registering NGO...' : 'Register NGO'}
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
