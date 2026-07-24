import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NgoSidebar from '../../components/NgoSidebar';
import donationService from '../../services/donationService';
import '../../assets/css/ngo/received-food.css';

export default function ReceivedFood() {
  const [donations, setDonations] = useState([]);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [assignedCount, setAssignedCount] = useState(0);
  const [pickedCount, setPickedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [currentDateStr, setCurrentDateStr] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    setCurrentDateStr(
      today.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );

    loadReceivedFood();
  }, []);

  const loadReceivedFood = async () => {
    const ngoId = localStorage.getItem('ngoId');
    if (!ngoId) return;

    try {
      const data = await donationService.getNGODonations(ngoId);
      const list = data || [];
      setDonations(list);

      let accepted = 0;
      let assigned = 0;
      let picked = 0;
      let completed = 0;

      list.forEach((d) => {
        if (d.status === 'ACCEPTED') accepted++;
        if (d.status === 'ASSIGNED') assigned++;
        if (d.status === 'PICKED_UP') picked++;
        if (d.status === 'COMPLETED' || d.status === 'DELIVERED') completed++;
      });

      setAcceptedCount(accepted);
      setAssignedCount(assigned);
      setPickedCount(picked);
      setCompletedCount(completed);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleString();
  };

  return (
    <div className="ngo-received">
      <NgoSidebar />

      <main className="main-content">
        <div className="topbar">
          <div>
            <h1>
              <i className="fa-solid fa-box-open"></i> Received Food
            </h1>
            <p>View accepted food donations and assign volunteers.</p>
          </div>
          <div id="currentDate">{currentDateStr}</div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="cards">
          <div className="card">
            <i className="fa-solid fa-box"></i>
            <div className="card-info">
              <h2 id="acceptedCount">{acceptedCount}</h2>
              <p>Accepted</p>
            </div>
          </div>

          <div className="card">
            <i className="fa-solid fa-user-check"></i>
            <div className="card-info">
              <h2 id="assignedCount">{assignedCount}</h2>
              <p>Assigned</p>
            </div>
          </div>

          <div className="card">
            <i className="fa-solid fa-truck"></i>
            <div className="card-info">
              <h2 id="pickedCount">{pickedCount}</h2>
              <p>Picked Up</p>
            </div>
          </div>

          <div className="card">
            <i className="fa-solid fa-circle-check"></i>
            <div className="card-info">
              <h2 id="completedCount">{completedCount}</h2>
              <p>Completed</p>
            </div>
          </div>
        </div>

        {/* DONATION TABLE */}
        <div className="table-container">
          <div className="section-header">
            <h2>
              <i className="fa-solid fa-list-check"></i> Donation History
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
                <th>Accepted At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="receivedFoodTableBody">
              {donations.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '30px' }}>
                    No received food records found.
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
                    <td>{formatDate(d.updatedAt || d.createdAt)}</td>
                    <td>
                      <span className={`status ${d.status ? d.status.toLowerCase() : ''}`}>
                        {d.status}
                      </span>
                    </td>
                    <td>
                      {d.status === 'ACCEPTED' ? (
                        <button
                          className="action-btn assign-btn"
                          onClick={() => navigate(`/assign-volunteer?donationId=${d.donationId}`)}
                        >
                          Assign Volunteer
                        </button>
                      ) : (
                        <button
                          className="action-btn details-btn"
                          onClick={() => navigate(`/donation-details?donationId=${d.donationId}`)}
                        >
                          View Details
                        </button>
                      )}
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
