import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import adminService from '../../services/adminService';
import '../../assets/css/admin/donations.css';

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [pickedUpCount, setPickedUpCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      const data = await adminService.getDonations();
      const list = data || [];
      setDonations(list);

      let completed = 0;
      let picked = 0;
      let pending = 0;

      list.forEach((d) => {
        if (d.status === 'COMPLETED' || d.status === 'DELIVERED') completed++;
        if (d.status === 'PICKED_UP' || d.status === 'PICKED') picked++;
        if (d.status === 'PENDING' || d.status === 'AVAILABLE' || d.status === 'ASSIGNED') pending++;
      });

      setCompletedCount(completed);
      setPickedUpCount(picked);
      setPendingCount(pending);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-IN');
  };

  return (
    <div className="admin-donations">
      <div className="dashboard-container">
        <AdminSidebar />

        <main className="main-content">
          <div className="topbar">
            <div>
              <h1>
                <i className="fa-solid fa-box-open"></i> Donations
              </h1>
              <p>Monitor all food donations across the platform.</p>
            </div>
            <div className="profile-icon">
              <i className="fa-solid fa-user-shield"></i>
            </div>
          </div>

          {/* CARDS */}
          <div className="cards-container">
            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-box"></i>
              </div>
              <h3>Total Donations</h3>
              <h2 id="totalDonations">{donations.length}</h2>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h3>Completed</h3>
              <h2 id="completedDonations">{completedCount}</h2>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-truck"></i>
              </div>
              <h3>Picked Up</h3>
              <h2 id="pickedUpDonations">{pickedUpCount}</h2>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <h3>Pending</h3>
              <h2 id="pendingDonations">{pendingCount}</h2>
            </div>
          </div>

          {/* TABLE */}
          <div className="section-card">
            <div className="section-header">
              <h2>
                <i className="fa-solid fa-list"></i> Donation History
              </h2>
              <p>Track food rescue activities and delivery status.</p>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Food Name</th>
                    <th>Restaurant</th>
                    <th>NGO</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Created Date</th>
                  </tr>
                </thead>
                <tbody id="donationTable">
                  {donations.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                        No donations found.
                      </td>
                    </tr>
                  ) : (
                    donations.map((d, index) => (
                      <tr key={d.donationId || index}>
                        <td>{d.foodName || '-'}</td>
                        <td>{d.restaurantName || '-'}</td>
                        <td>{d.ngoName || '-'}</td>
                        <td>{d.quantity ? `${d.quantity} Kg` : '-'}</td>
                        <td>
                          <span className={`status ${d.status ? d.status.toLowerCase() : ''}`}>
                            {d.status}
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
        </main>
      </div>
    </div>
  );
}
