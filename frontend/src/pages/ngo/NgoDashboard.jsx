import React, { useState, useEffect } from 'react';
import NgoSidebar from '../../components/NgoSidebar';
import donationService from '../../services/donationService';
import '../../assets/css/ngo/dashboard.css';

export default function NgoDashboard() {
  const [ngoName, setNgoName] = useState('NGO');
  const [availableDonations, setAvailableDonations] = useState([]);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [currentDateStr, setCurrentDateStr] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('ngoName');
    if (name) {
      setNgoName(name);
    }

    const today = new Date();
    setCurrentDateStr(
      today.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    );

    const ngoId = localStorage.getItem('ngoId');
    if (ngoId) {
      loadDashboardCounts(ngoId);
    }
    loadAvailableDonations();
  }, []);

  const loadDashboardCounts = async (ngoId) => {
    try {
      const donations = await donationService.getNGODonations(ngoId);
      let accepted = 0;
      let pending = 0;
      let completed = 0;

      (donations || []).forEach((d) => {
        if (d.status === 'ACCEPTED' || d.status === 'ASSIGNED' || d.status === 'PICKED_UP') {
          accepted++;
        }
        if (d.status === 'PENDING') {
          pending++;
        }
        if (d.status === 'COMPLETED' || d.status === 'DELIVERED') {
          completed++;
        }
      });

      setAcceptedCount(accepted);
      setPendingCount(pending);
      setCompletedCount(completed);
    } catch (err) {
      console.error(err);
    }
  };

  const loadAvailableDonations = async () => {
    try {
      const donations = await donationService.getAvailableDonations();
      setAvailableDonations(donations || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAcceptDonation = async (donationId) => {
    const ngoId = localStorage.getItem('ngoId');
    if (!ngoId) {
      alert('NGO login required');
      return;
    }

    try {
      await donationService.acceptDonation(donationId, ngoId);
      alert('Donation accepted successfully');
      loadDashboardCounts(ngoId);
      loadAvailableDonations();
    } catch (err) {
      console.error(err);
      alert('Unable to accept donation');
    }
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleString();
  };

  return (
    <div className="ngo-dashboard">
      <NgoSidebar />

      <main className="main-content">
        <div className="topbar">
          <div>
            <h1>NGO Dashboard</h1>
            <p>
              Welcome, <strong id="ngoName">{ngoName}</strong>
            </p>
          </div>
          <span id="currentDate">{currentDateStr}</span>
        </div>

        {/* Dashboard Statistics */}
        <section className="cards">
          <div className="card">
            <div className="card-info">
              <h3>Available Donations</h3>
              <h2 id="availableCount">{availableDonations.length}</h2>
            </div>
            <i className="fa-solid fa-bowl-food"></i>
          </div>

          <div className="card">
            <div className="card-info">
              <h3>Accepted Donations</h3>
              <h2 id="acceptedCount">{acceptedCount}</h2>
            </div>
            <i className="fa-solid fa-circle-check"></i>
          </div>

          <div className="card">
            <div className="card-info">
              <h3>Pending Requests</h3>
              <h2 id="pendingCount">{pendingCount}</h2>
            </div>
            <i className="fa-solid fa-hourglass-half"></i>
          </div>

          <div className="card">
            <div className="card-info">
              <h3>Completed Pickups</h3>
              <h2 id="completedCount">{completedCount}</h2>
            </div>
            <i className="fa-solid fa-hand-holding-heart"></i>
          </div>
        </section>

        {/* Recent Donations */}
        <div className="table-container">
          <div className="section-header">
            <h2>
              <i className="fa-solid fa-list"></i> Recent Donations
            </h2>
          </div>

          <table>
            <thead>
              <tr>
                <th>Restaurant</th>
                <th>Food</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Meals</th>
                <th>Expiry</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="donationTableBody">
              {availableDonations.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '30px' }}>
                    No donations available.
                  </td>
                </tr>
              ) : (
                availableDonations.map((d) => (
                  <tr key={d.donationId}>
                    <td>{d.restaurantName}</td>
                    <td>{d.foodName}</td>
                    <td>{d.foodType}</td>
                    <td>{d.quantity}</td>
                    <td>{d.approxMeals}</td>
                    <td>{formatDate(d.expiryTime)}</td>
                    <td>
                      <span className="status available">{d.status}</span>
                    </td>
                    <td>
                      <button
                        className="action-btn accept-btn"
                        onClick={() => handleAcceptDonation(d.donationId)}
                      >
                        Accept
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
