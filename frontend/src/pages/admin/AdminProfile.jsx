import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import adminService from '../../services/adminService';
import '../../assets/css/admin/profile.css';

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: 'Administrator',
    email: 'admin@foodrescue.com',
    phone: '+91 9876543210',
    role: 'SYSTEM_ADMIN',
    status: 'ACTIVE',
    createdDate: '2025-01-01',
    lastLogin: 'Today, 10:30 AM',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const adminId = localStorage.getItem('adminId');
    if (!adminId) return;

    try {
      const data = await adminService.getProfile(adminId);
      if (data) {
        setProfile((prev) => ({
          ...prev,
          name: data.adminName || data.fullName || 'Administrator',
          email: data.email || 'admin@foodrescue.com',
          phone: data.phone || prev.phone,
          role: data.role || 'SYSTEM_ADMIN',
          status: data.status || 'ACTIVE',
          createdDate: data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-IN') : prev.createdDate,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-profile">
      <div className="dashboard-container">
        <AdminSidebar />

        <main className="main-content">
          <div className="topbar">
            <div>
              <h1>
                <i className="fa-solid fa-user-shield"></i> Admin Profile
              </h1>
              <p>Monitor and manage your system administrator credentials and account settings.</p>
            </div>

            <div className="profile-icon">
              <i className="fa-solid fa-user-shield"></i>
            </div>
          </div>

          <div className="profile-card">
            {/* TOP HEADER */}
            <div className="profile-header">
              <div className="avatar">
                <i className="fa-solid fa-user-shield"></i>
              </div>
              <h2 id="adminName">{profile.name}</h2>
              <p className="profile-email">{profile.email}</p>
              
              <div className="badges-wrapper">
                <span className="badge role-badge">{profile.role}</span>
                <span className="badge status-badge">{profile.status}</span>
              </div>
            </div>

            <div className="divider"></div>

            {/* INFORMATION CARDS */}
            <div className="profile-details">
              <div className="detail-box">
                <div className="box-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <h4>Phone</h4>
                  <p id="phone">{profile.phone}</p>
                </div>
              </div>

              <div className="detail-box">
                <div className="box-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <h4>Email</h4>
                  <p id="email">{profile.email}</p>
                </div>
              </div>

              <div className="detail-box">
                <div className="box-icon">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <div>
                  <h4>Role</h4>
                  <p id="role">{profile.role}</p>
                </div>
              </div>

              <div className="detail-box">
                <div className="box-icon">
                  <i className="fa-solid fa-calendar-check"></i>
                </div>
                <div>
                  <h4>Created Date</h4>
                  <p id="createdDate">{profile.createdDate}</p>
                </div>
              </div>

              <div className="detail-box">
                <div className="box-icon">
                  <i className="fa-solid fa-clock-rotate-left"></i>
                </div>
                <div>
                  <h4>Last Login</h4>
                  <p id="lastLogin">{profile.lastLogin}</p>
                </div>
              </div>

              <div className="detail-box">
                <div className="box-icon">
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <div>
                  <h4>Account Status</h4>
                  <p id="status">{profile.status}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
