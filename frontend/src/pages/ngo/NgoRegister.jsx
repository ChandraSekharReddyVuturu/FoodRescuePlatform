import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = Number(localStorage.getItem('userId'));
    const ngoData = { ...formData, userId };

    if (!ngoData.ngoName.trim()) {
      alert('Enter NGO Name');
      return;
    }
    if (!ngoData.ownerName.trim()) {
      alert('Enter Owner Name');
      return;
    }
    if (!/^[0-9]{10}$/.test(ngoData.phone.trim())) {
      alert('Enter Valid Phone Number');
      return;
    }
    if (!ngoData.registrationNumber.trim()) {
      alert('Enter NGO Registration Number');
      return;
    }
    if (!ngoData.city.trim()) {
      alert('Enter City');
      return;
    }
    if (!ngoData.address.trim()) {
      alert('Enter Address');
      return;
    }

    setLoading(true);

    try {
      const data = await ngoService.registerNgo(ngoData);

      localStorage.setItem('ngoId', data.ngoId);
      localStorage.setItem('ngoName', data.ngoName);

      alert('NGO Registered Successfully!');
      navigate('/ngo-dashboard');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ngo-register-page-wrapper">
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
                <span>Receive Food Donations</span>
              </div>

              <div className="benefit">
                <div className="benefit-icon">
                  <i className="fa-solid fa-hand-holding-heart"></i>
                </div>
                <span>Serve the Needy</span>
              </div>

              <div className="benefit">
                <div className="benefit-icon">
                  <i className="fa-solid fa-people-group"></i>
                </div>
                <span>Create Community Impact</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <div className="register-card">
            <h2>NGO Details</h2>
            <p className="subtitle">Complete your NGO profile to continue.</p>

            <form onSubmit={handleSubmit}>
              {/* NGO Name */}
              <div className="input-group">
                <label htmlFor="ngoName">NGO Name</label>
                <div className="input-box">
                  <span className="icon-left">
                    <i className="fa-solid fa-building"></i>
                  </span>
                  <input
                    type="text"
                    id="ngoName"
                    placeholder="NGO Name"
                    value={formData.ngoName}
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

              {/* Registration Number */}
              <div className="input-group">
                <label htmlFor="registrationNumber">Registration Number</label>
                <div className="input-box">
                  <span className="icon-left">
                    <i className="fa-solid fa-id-card"></i>
                  </span>
                  <input
                    type="text"
                    id="registrationNumber"
                    placeholder="NGO Registration Number"
                    value={formData.registrationNumber}
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
                <label htmlFor="address">NGO Address</label>
                <textarea
                  id="address"
                  rows="4"
                  placeholder="Complete NGO Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Button */}
              <button type="submit" className="register-btn" disabled={loading}>
                <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-hand-holding-heart'}`}></i>
                {loading ? 'Registering...' : 'Register NGO'}
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
