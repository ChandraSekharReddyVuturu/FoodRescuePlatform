import React, { useState, useEffect } from 'react';
import RestaurantSidebar from '../../components/RestaurantSidebar';
import donationService from '../../services/donationService';
import '../../assets/css/restaurant/donation-history.css';

export default function DonationHistory() {
  const [donations, setDonations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [viewDetails, setViewDetails] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    filterData();
  }, [donations, search, statusFilter]);

  const loadHistory = async () => {
    const restaurantId = localStorage.getItem('restaurantId');
    if (!restaurantId) return;

    try {
      const data = await donationService.getRestaurantDonations(restaurantId);
      const historyItems = (data || []).filter(
        (d) => d.status === 'COMPLETED' || d.status === 'EXPIRED' || d.status === 'DELIVERED'
      );
      setDonations(historyItems);
    } catch (err) {
      console.error(err);
    }
  };

  const filterData = () => {
    let temp = [...donations];

    if (statusFilter !== 'ALL') {
      temp = temp.filter((d) => d.status === statusFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      temp = temp.filter((d) => d.foodName?.toLowerCase().includes(q));
    }

    setFiltered(temp);
  };

  const totalHistory = donations.length;
  const completedCount = donations.filter((d) => d.status === 'COMPLETED' || d.status === 'DELIVERED').length;
  const expiredCount = donations.filter((d) => d.status === 'EXPIRED').length;
  const mealCount = donations.reduce((sum, d) => sum + (d.approxMeals || 0), 0);

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="restaurant-history">
      <RestaurantSidebar />

      <main className="content">
        <header className="page-header">
          <div>
            <h1>Donation History</h1>
            <p>View your completed and expired food donations.</p>
          </div>
        </header>

        {/* Statistics */}
        <section className="stats">
          <div className="card">
            <i className="fa-solid fa-box"></i>
            <h2 id="totalHistory">{totalHistory}</h2>
            <p>Total Records</p>
          </div>

          <div className="card">
            <i className="fa-solid fa-circle-check"></i>
            <h2 id="completedCount">{completedCount}</h2>
            <p>Completed</p>
          </div>

          <div className="card">
            <i className="fa-solid fa-calendar-xmark"></i>
            <h2 id="expiredCount">{expiredCount}</h2>
            <p>Expired</p>
          </div>

          <div className="card">
            <i className="fa-solid fa-utensils"></i>
            <h2 id="mealCount">{mealCount}</h2>
            <p>Meals Donated</p>
          </div>
        </section>

        {/* Toolbar */}
        <section className="toolbar">
          <div className="search-box">
            <i className="fa-solid fa-search"></i>
            <input
              type="text"
              placeholder="Search Food Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="COMPLETED">Completed</option>
            <option value="EXPIRED">Expired</option>
          </select>
        </section>

        {/* History Table */}
        <section className="table-card">
          <table>
            <thead>
              <tr>
                <th>Food</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Meals</th>
                <th>Status</th>
                <th>Completed Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                    No History Records Found
                  </td>
                </tr>
              ) : (
                filtered.map((d) => (
                  <tr key={d.donationId}>
                    <td>{d.foodName}</td>
                    <td>{d.foodType}</td>
                    <td>{d.quantity} Kg</td>
                    <td>{d.approxMeals}</td>
                    <td>
                      <span className={`status ${d.status ? d.status.toLowerCase() : ''}`}>
                        {d.status}
                      </span>
                    </td>
                    <td>{formatDate(d.updatedAt || d.createdAt)}</td>
                    <td>
                      <button className="view-btn" onClick={() => setViewDetails(d)} title="View Details">
                        <i className="fa-solid fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>

      {/* VIEW MODAL */}
      {viewDetails && (
        <div className="modal active" id="viewModal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Donation Details</h2>
              <span className="close" onClick={() => setViewDetails(null)}>
                &times;
              </span>
            </div>
            <div>
              <p><strong>Food Name:</strong> {viewDetails.foodName}</p>
              <p><strong>Type:</strong> {viewDetails.foodType}</p>
              <p><strong>Quantity:</strong> {viewDetails.quantity} Kg ({viewDetails.approxMeals} meals)</p>
              <p><strong>Status:</strong> {viewDetails.status}</p>
              <p><strong>Pickup Address:</strong> {viewDetails.pickupAddress}</p>
              <p><strong>Special Instructions:</strong> {viewDetails.specialInstructions || 'None'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
