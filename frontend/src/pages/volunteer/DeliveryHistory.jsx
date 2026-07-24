import React, { useState, useEffect } from 'react';
import VolunteerSidebar from '../../components/VolunteerSidebar';
import donationService from '../../services/donationService';
import '../../assets/css/volunteer/delivery-history.css';

export default function DeliveryHistory() {
  const [history, setHistory] = useState([]);
  const [totalMeals, setTotalMeals] = useState(0);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const volunteerId = localStorage.getItem('volunteerId');
    if (!volunteerId) return;

    try {
      const data = await donationService.getVolunteerDonations(volunteerId);
      const list = (data || []).filter(
        (d) => d.status === 'COMPLETED' || d.status === 'DELIVERED'
      );
      setHistory(list);

      const meals = list.reduce((acc, curr) => acc + (curr.approxMeals || 0), 0);
      setTotalMeals(meals);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="volunteer-history">
      <div className="dashboard-container">
        <VolunteerSidebar />

        <main className="main-content">
          <div className="topbar">
            <div>
              <h1>
                <i className="fa-solid fa-clock-rotate-left"></i> Delivery History
              </h1>
              <p>View your completed food deliveries.</p>
            </div>

            <div className="profile-icon">
              <i className="fa-solid fa-user"></i>
            </div>
          </div>

          <div className="cards-container">
            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-box"></i>
              </div>
              <div>
                <h3>Total Deliveries</h3>
                <h2 id="totalDeliveries">{history.length}</h2>
              </div>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-utensils"></i>
              </div>
              <div>
                <h3>Total Meals Delivered</h3>
                <h2 id="totalMeals">{totalMeals}</h2>
              </div>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <div>
                <h3>Status</h3>
                <h2>Completed</h2>
              </div>
            </div>
          </div>

          <div className="section-card">
            <div className="section-header">
              <h2>
                <i className="fa-solid fa-list-check"></i> Completed Deliveries
              </h2>
              <p>History of successfully delivered food donations.</p>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Restaurant</th>
                    <th>Food</th>
                    <th>Quantity</th>
                    <th>NGO</th>
                    <th>Delivered Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody id="historyTableBody">
                  {history.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                        No completed deliveries found.
                      </td>
                    </tr>
                  ) : (
                    history.map((d) => (
                      <tr key={d.donationId}>
                        <td>{d.restaurantName || '-'}</td>
                        <td>{d.foodName || '-'}</td>
                        <td>{d.quantity ? `${d.quantity} Kg` : '-'}</td>
                        <td>{d.ngoName || '-'}</td>
                        <td>{formatDate(d.updatedAt || d.createdAt)}</td>
                        <td>
                          <span className={`status ${d.status ? d.status.toLowerCase() : ''}`}>
                            {d.status}
                          </span>
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
