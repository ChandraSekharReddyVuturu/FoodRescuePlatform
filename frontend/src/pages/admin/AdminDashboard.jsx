import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import adminService from '../../services/adminService';
import '../../assets/css/admin/dashboard.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRestaurants: 0,
    totalNgos: 0,
    totalVolunteers: 0,
    totalDonations: 0,
    completedDeliveries: 0,
  });

  const [recentDonations, setRecentDonations] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    loadDashboard();
    loadRecentDonations();
    loadRecentUsers();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await adminService.getDashboardData();
      if (data) {
        setStats({
          totalUsers: data.totalUsers || 0,
          totalRestaurants: data.totalRestaurants || 0,
          totalNgos: data.totalNgos || 0,
          totalVolunteers: data.totalVolunteers || 0,
          totalDonations: data.totalDonations || 0,
          completedDeliveries: data.completedDeliveries || 0,
        });
      }
    } catch (err) {
      console.error('Dashboard Error:', err);
    }
  };

  const loadRecentDonations = async () => {
    try {
      const data = await adminService.getRecentDonations();
      setRecentDonations(data || []);
    } catch (err) {
      console.error('Donation Error:', err);
    }
  };

  const loadRecentUsers = async () => {
    try {
      const data = await adminService.getRecentUsers();
      setRecentUsers(data || []);
    } catch (err) {
      console.error('Users Error:', err);
    }
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-IN');
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <AdminSidebar />

        <main className="main-content">
          <div className="topbar">
            <div>
              <h1>
                <i className="fa-solid fa-chart-line"></i> Admin Dashboard
              </h1>
              <p>Monitor and manage the complete food rescue platform.</p>
            </div>
            <div className="profile-icon">
              <i className="fa-solid fa-user-shield"></i>
            </div>
          </div>

          {/* STATISTICS */}
          <div className="cards-container">
            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-users"></i>
              </div>
              <h3>Total Users</h3>
              <h2 id="totalUsers">{stats.totalUsers}</h2>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-utensils"></i>
              </div>
              <h3>Restaurants</h3>
              <h2 id="totalRestaurants">{stats.totalRestaurants}</h2>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-hand-holding-heart"></i>
              </div>
              <h3>NGOs</h3>
              <h2 id="totalNgos">{stats.totalNgos}</h2>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-person-circle-check"></i>
              </div>
              <h3>Volunteers</h3>
              <h2 id="totalVolunteers">{stats.totalVolunteers}</h2>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-box-open"></i>
              </div>
              <h3>Total Donations</h3>
              <h2 id="totalDonations">{stats.totalDonations}</h2>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-truck-circle-check"></i>
              </div>
              <h3>Completed Deliveries</h3>
              <h2 id="completedDeliveries">{stats.completedDeliveries}</h2>
            </div>
          </div>

          {/* RECENT DONATIONS */}
          <div className="section-card">
            <div className="section-header">
              <h2>
                <i className="fa-solid fa-clock-rotate-left"></i> Recent Donations
              </h2>
              <p>Latest food donations in the system.</p>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Food</th>
                    <th>Restaurant</th>
                    <th>NGO</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody id="recentDonationTable">
                  {recentDonations.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                        No donations available
                      </td>
                    </tr>
                  ) : (
                    recentDonations.map((d, index) => (
                      <tr key={d.donationId || index}>
                        <td>{d.foodName || '-'}</td>
                        <td>{d.restaurantName || d.restaurant?.restaurantName || '-'}</td>
                        <td>{d.ngoName || d.ngo?.ngoName || '-'}</td>
                        <td>{d.quantity || '-'}</td>
                        <td>
                          <span className={`status ${d.status ? d.status.toLowerCase().replace('_', ' ') : ''}`}>
                            {d.status || '-'}
                          </span>
                        </td>
                        <td>{formatDate(d.createdAt)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* RECENT USERS */}
          <div className="section-card">
            <div className="section-header">
              <h2>
                <i className="fa-solid fa-user-plus"></i> Recent Registrations
              </h2>
              <p>Recently joined users.</p>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Created Date</th>
                  </tr>
                </thead>
                <tbody id="recentUsersTable">
                  {recentUsers.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                        No users available
                      </td>
                    </tr>
                  ) : (
                    recentUsers.map((u, index) => (
                      <tr key={u.userId || index}>
                        <td>{u.fullName || '-'}</td>
                        <td>{u.email || '-'}</td>
                        <td>{u.role || '-'}</td>
                        <td>
                          <span className={`status ${u.status ? u.status.toLowerCase().replace('_', ' ') : ''}`}>
                            {u.status || '-'}
                          </span>
                        </td>
                        <td>{formatDate(u.createdAt)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
