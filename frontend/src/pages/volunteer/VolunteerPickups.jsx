import React, { useState, useEffect } from 'react';
import VolunteerSidebar from '../../components/VolunteerSidebar';
import donationService from '../../services/donationService';
import '../../assets/css/volunteer/pickups.css';

export default function VolunteerPickups() {
  const [pickups, setPickups] = useState([]);
  const [assignedCount, setAssignedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [pickedCount, setPickedCount] = useState(0);

  useEffect(() => {
    loadPickups();
  }, []);

  const loadPickups = async () => {
    const volunteerId = localStorage.getItem('volunteerId');
    if (!volunteerId) return;

    try {
      const data = await donationService.getVolunteerDonations(volunteerId);
      const list = (data || []).filter(
        (d) => d.status === 'ASSIGNED' || d.status === 'PICKED' || d.status === 'PICKED_UP' || d.status === 'PENDING'
      );
      setPickups(list);

      let assigned = 0;
      let pending = 0;
      let picked = 0;

      list.forEach((d) => {
        if (d.status === 'ASSIGNED') assigned++;
        if (d.status === 'PENDING') pending++;
        if (d.status === 'PICKED' || d.status === 'PICKED_UP') picked++;
      });

      setAssignedCount(assigned);
      setPendingCount(pending);
      setPickedCount(picked);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePickup = async (id) => {
    try {
      await donationService.pickupDonation(id);
      alert('Picked up successfully');
      loadPickups();
    } catch (err) {
      console.error(err);
      alert('Action failed');
    }
  };

  const handleDeliver = async (id) => {
    try {
      await donationService.deliverDonation(id);
      alert('Delivered successfully');
      loadPickups();
    } catch (err) {
      console.error(err);
      alert('Action failed');
    }
  };

  return (
    <div className="volunteer-pickups">
      <div className="dashboard-container">
        <VolunteerSidebar />

        <main className="main-content">
          <div className="topbar">
            <div>
              <h1>
                <i className="fa-solid fa-truck"></i> My Pickups
              </h1>
              <p>Manage assigned food pickups and deliveries.</p>
            </div>
            <div className="profile-icon">
              <i className="fa-solid fa-user"></i>
            </div>
          </div>

          {/* SUMMARY CARDS (HORIZONTAL GRID) */}
          <div className="cards-container">
            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-box"></i>
              </div>
              <div>
                <h3>Assigned</h3>
                <h2 id="assignedCount">{assignedCount}</h2>
              </div>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <div>
                <h3>Pending</h3>
                <h2 id="pendingCount">{pendingCount}</h2>
              </div>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <div>
                <h3>Picked</h3>
                <h2 id="pickedCount">{pickedCount}</h2>
              </div>
            </div>
          </div>

          {/* PICKUP TABLE */}
          <div className="section-card">
            <div className="section-header">
              <h2>
                <i className="fa-solid fa-list-check"></i> Assigned Pickups
              </h2>
              <p>Food donations assigned by NGO.</p>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Restaurant</th>
                    <th>Food</th>
                    <th>Quantity</th>
                    <th>Pickup Address</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody id="pickupTableBody">
                  {pickups.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                        No assigned pickups found.
                      </td>
                    </tr>
                  ) : (
                    pickups.map((d) => (
                      <tr key={d.donationId}>
                        <td>{d.restaurantName || '-'}</td>
                        <td>{d.foodName || '-'}</td>
                        <td>{d.quantity ? `${d.quantity} Kg` : '-'}</td>
                        <td>{d.pickupAddress || '-'}</td>
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
