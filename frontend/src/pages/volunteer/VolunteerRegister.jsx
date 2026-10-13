import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast';
import volunteerService from '../../services/volunteerService';
import '../../assets/css/volunteer/volunteer-register.css';

export default function VolunteerRegister() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    gender: '',
    city: '',
    address: '',
    availability: 'AVAILABLE',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validate = () => {
    if (!formData.fullName.trim()) {
      setToast({ message: 'Enter Full Name', type: 'warning' });
      return false;
    }
    if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      setToast({ message: 'Enter Valid 10-digit Phone Number', type: 'warning' });
      return false;
    }
    if (!formData.gender) {
      setToast({ message: 'Select Gender', type: 'warning' });
      return false;
    }
    if (!formData.city.trim()) {
      setToast({ message: 'Enter City', type: 'warning' });
      return false;
    }
    if (!formData.address.trim()) {
      setToast({ message: 'Enter Address', type: 'warning' });
      return false;
    }
    if (!formData.availability) {
      setToast({ message: 'Select Availability', type: 'warning' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      setToast({ message: 'User account session missing. Please register or login first.', type: 'error' });
      setTimeout(() => navigate('/register'), 1500);
      return;
    }

    const volunteerData = { ...formData, userId };

    setLoading(true);

    try {
      const data = await volunteerService.registerVolunteer(volunteerData);

      if (data && data.volunteerId) {
        localStorage.setItem('volunteerId', data.volunteerId);
        localStorage.setItem('volunteerName', data.fullName);
      }

      setToast({ message: 'Volunteer Profile Registered Successfully!', type: 'success' });
      setTimeout(() => {
        navigate('/volunteer-dashboard');
      }, 1200);
    } catch (error) {
      console.error(error);
      setToast({
        message: error.response?.data?.message || error.message || 'Volunteer registration failed',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="volunteer-register-page-wrapper">
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

            <h2>Volunteer<br />Registration</h2>

            <p>
              Join the Food Rescue Platform and help deliver rescued food from restaurants to NGOs and people in need.
            </p>

            <div className="benefits">
              <div className="benefit">
                <div className="benefit-icon">
                  <i className="fa-solid fa-truck"></i>
                </div>
                <span>Deliver Food Donations</span>
              </div>

              <div className="benefit">
                <div className="benefit-icon">
                  <i className="fa-solid fa-hand-holding-heart"></i>
                </div>
                <span>Support Local NGOs</span>
              </div>

              <div className="benefit">
                <div className="benefit-icon">
                  <i className="fa-solid fa-people-group"></i>
                </div>
                <span>Create Social Impact</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <div className="register-card">
            <h2>Volunteer Details</h2>
            <p className="subtitle">Complete your volunteer profile to continue.</p>

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="input-group">
                <label htmlFor="fullName">Full Name *</label>
                <div className="input-box">
                  <span className="icon-left">
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
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

              {/* Gender */}
              <div className="input-group">
                <label htmlFor="gender">Gender *</label>
                <div className="input-box">
                  <span className="icon-left">
                    <i className="fa-solid fa-venus-mars"></i>
                  </span>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
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
                <label htmlFor="address">Address *</label>
                <textarea
                  id="address"
                  rows="3"
                  placeholder="Complete Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Availability */}
              <div className="input-group">
                <label htmlFor="availability">Availability *</label>
                <div className="input-box">
                  <span className="icon-left">
                    <i className="fa-solid fa-clock"></i>
                  </span>
                  <select
                    id="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="NOT_AVAILABLE">Not Available</option>
                  </select>
                </div>
              </div>

              {/* Button */}
              <button type="submit" className="register-btn" disabled={loading}>
                <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-user-plus'}`}></i>
                {loading ? 'Registering Volunteer...' : 'Register Volunteer'}
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
