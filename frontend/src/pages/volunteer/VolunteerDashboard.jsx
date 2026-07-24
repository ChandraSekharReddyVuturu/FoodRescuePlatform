import React, { useState, useEffect } from 'react';
import VolunteerSidebar from '../../components/VolunteerSidebar';
import donationService from '../../services/donationService';
import '../../assets/css/volunteer/dashboard.css';

export default function VolunteerDashboard() {
  const [volunteerName, setVolunteerName] = useState('Volunteer');
  const [donations, setDonations] = useState([]);
  const [availability, setAvailability] = useState('Available');

  useEffect(() => {
    const name = localStorage.getItem('volunteerName');
    if (name) {
      setVolunteerName(name);
    }
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const volunteerId = localStorage.getItem('volunteerId');
    if (!volunteerId) return;

    try {
      const data = await donationService.getVolunteerDonations(volunteerId);
      setDonations(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePickup = async (donationId) => {
    try {
      await donationService.pickupDonation(donationId);
      alert('Updated successfully');
      loadDashboard();
    } catch (err) {
      console.error(err);
      alert('Action failed');
    }
  };

  const handleDeliver = async (donationId) => {
    try {
      await donationService.deliverDonation(donationId);
      alert('Updated successfully');
      loadDashboard();
    } catch (err) {
      console.error(err);
      alert('Action failed');
    }
  };

  const handleComplete = async (donationId) => {
    try {
      await donationService.completeDonation(donationId);
      alert('Updated successfully');
      loadDashboard();
    } catch (err) {
      console.error(err);
      alert('Action failed');
    }
  };

  const pending = donations.filter((d) => d.status === 'ASSIGNED' || d.status === 'PENDING').length;
  const completed = donations.filter((d) => d.status === 'COMPLETED' || d.status === 'DELIVERED').length;

  return (
    <div className="volunteer-dashboard">
      <div className="dashboard-container">
        <VolunteerSidebar />

        <main className="main-content">
          {/* TOP BAR */}
          <div className="topbar">
            <div>
              <h1>
                Welcome, <span id="volunteerName">{volunteerName}</span>
              </h1>
              <p>Help deliver food and create impact.</p>
            </div>
            <div className="profile-icon">
              <i className="fa-solid fa-user"></i>
            </div>
          </div>

          {/* DASHBOARD CARDS (HORIZONTAL GRID) */}
          <div className="cards-container">
            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-box"></i>
              </div>
              <div>
                <h3>Total Pickups</h3>
                <h2 id="totalPickups">{donations.length}</h2>
              </div>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <div>
                <h3>Pending Pickups</h3>
                <h2 id="pendingPickups">{pending}</h2>
              </div>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <div>
                <h3>Completed</h3>
                <h2 id="completedDeliveries">{completed}</h2>
              </div>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-user-check"></i>
              </div>
              <div>
                <h3>Availability</h3>
                <h2 id="availability">{availability}</h2>
              </div>
            </div>
          </div>

          {/* ASSIGNED DONATIONS */}
          <div className="section-card">
            <div className="section-header">
              <h2>
                <i className="fa-solid fa-box-open"></i> Assigned Donations
              </h2>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Restaurant</th>
                    <th>Food</th>
                    <th>Quantity</th>
                    <th>Pickup Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody id="donationTableBody">
                  {donations.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="empty-message" style={{ textAlign: 'center', padding: '20px' }}>
                        No assigned donations.
                      </td>
                    </tr>
                  ) : (
                    donations.map((d) => (
                      <tr key={d.donationId}>
                        <td>{d.restaurantName || '-'}</td>
                        <td>{d.foodName || '-'}</td>
                        <td>{d.quantity || '-'}</td>
                        <td>{d.pickupTime || '-'}</td>
                        <td>
                          <span className={`status ${d.status ? d.status.toLowerCase() : ''}`}>
                            {d.status}
                          </span>
                        </td>
                        <td>
                          {d.status === 'ASSIGNED' && (
                            <button
                              className="action-btn pickup-btn"
                              onClick={() => handlePickup(d.donationId)}
                            >
                              Pickup
                            </button>
                          )}
                          {(d.status === 'PICKED' || d.status === 'PICKED_UP') && (
                            <button
                              className="action-btn deliver-btn"
                              onClick={() => handleDeliver(d.donationId)}
                            >
                              Deliver
                            </button>
                          )}
                          {d.status === 'DELIVERED' && (
                            <button
                              className="action-btn complete-btn"
                              onClick={() => handleComplete(d.donationId)}
                            >
                              Complete
                            </button>
                          )}
                          {d.status === 'COMPLETED' && '-'}
                        </td>
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
