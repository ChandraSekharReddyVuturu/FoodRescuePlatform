import React, { useState, useEffect } from 'react';
import NgoSidebar from '../../components/NgoSidebar';
import donationService from '../../services/donationService';
import '../../assets/css/ngo/available-food.css';

export default function AvailableFood() {
  const [donations, setDonations] = useState([]);
  const [ngoName, setNgoName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('ngoName');
    if (name) {
      setNgoName(name);
    }
    loadAvailableFood();
  }, []);

  const loadAvailableFood = async () => {
    try {
      const data = await donationService.getAvailableDonations();
      setDonations(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAccept = async (donationId) => {
    const ngoId = localStorage.getItem('ngoId');
    if (!ngoId) {
      alert('NGO login required');
      return;
    }

    try {
      await donationService.acceptDonation(donationId, ngoId);
      alert('Donation accepted successfully');
      loadAvailableFood();
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
    <div className="ngo-available">
      <NgoSidebar />

      <main className="main-content">
        <div className="topbar">
          <h1>Available Food Donations</h1>
          <span id="ngoName">{ngoName}</span>
        </div>

        <div className="table-container">
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
            <tbody id="foodTableBody">
              {donations.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '30px' }}>
                    No donations available.
                  </td>
                </tr>
              ) : (
                donations.map((d) => (
                  <tr key={d.donationId}>
                    <td>{d.restaurantName}</td>
                    <td>{d.foodName}</td>
                    <td>{d.foodType}</td>
                    <td>{d.quantity} Kg</td>
                    <td>{d.approxMeals}</td>
                    <td>{formatDate(d.expiryTime)}</td>
                    <td>
                      <span className="status available">{d.status}</span>
                    </td>
                    <td>
                      <button
                        className="action-btn accept-btn"
                        onClick={() => handleAccept(d.donationId)}
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
