import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VolunteerSidebar from '../../components/VolunteerSidebar';
import volunteerService from '../../services/volunteerService';
import authService from '../../services/authService';
import '../../assets/css/volunteer/profile.css';

export default function VolunteerProfile() {
  const [profile, setProfile] = useState({
    fullName: '',
    phone: '',
    email: '',
    gender: '',
    city: '',
    address: '',
    availability: '',
    status: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const volunteerId = localStorage.getItem('volunteerId');
    const userId = localStorage.getItem('userId');

    try {
      let data = null;
      if (volunteerId) {
        data = await volunteerService.getVolunteerById(volunteerId);
      } else if (userId) {
        data = await volunteerService.getVolunteerByUserId(userId);
      }

      if (data) {
        setProfile({
          fullName: data.fullName || data.volunteerName || 'Volunteer',
          phone: data.phone || '-',
          email: data.email || data.user?.email || '-',
          gender: data.gender || '-',
          city: data.city || '-',
          address: data.address || '-',
          availability: data.availability || 'AVAILABLE',
          status: 'ACTIVE',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="volunteer-profile">
      <div className="dashboard-container">
        <VolunteerSidebar />

        <main className="main-content">
          <div className="topbar">
            <div>
              <h1>
                <i className="fa-solid fa-user"></i> My Profile
              </h1>
              <p>View and manage your volunteer information.</p>
            </div>
            <div className="profile-icon">
              <i className="fa-solid fa-user"></i>
            </div>
          </div>

          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-image">
                <i className="fa-solid fa-user"></i>
              </div>
              <h2 id="volunteerName">{profile.fullName}</h2>
              <span className="status-badge active-badge" id="volunteerStatus">
                {profile.status}
              </span>
            </div>

            <div className="divider"></div>

            <div className="profile-details">
              <div className="detail-box">
                <i className="fa-solid fa-phone"></i>
                <div>
                  <h4>Phone</h4>
                  <p id="phone">{profile.phone}</p>
                </div>
              </div>

              <div className="detail-box">
                <i className="fa-solid fa-envelope"></i>
                <div>
                  <h4>Email</h4>
                  <p id="email">{profile.email}</p>
                </div>
              </div>

              <div className="detail-box">
                <i className="fa-solid fa-venus-mars"></i>
                <div>
                  <h4>Gender</h4>
                  <p id="gender">{profile.gender}</p>
                </div>
              </div>

              <div className="detail-box">
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h4>City</h4>
                  <p id="city">{profile.city}</p>
                </div>
              </div>

              <div className="detail-box">
                <i className="fa-solid fa-house"></i>
                <div>
                  <h4>Address</h4>
                  <p id="address">{profile.address}</p>
                </div>
              </div>

              <div className="detail-box">
                <i className="fa-solid fa-clock"></i>
                <div>
                  <h4>Availability</h4>
                  <p id="availability">{profile.availability}</p>
                </div>
              </div>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
