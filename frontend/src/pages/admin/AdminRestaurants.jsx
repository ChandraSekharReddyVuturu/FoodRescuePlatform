import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import adminService from '../../services/adminService';
import '../../assets/css/admin/restaurants.css';

export default function AdminRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [blockedCount, setBlockedCount] = useState(0);

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      const data = await adminService.getRestaurants();
      const list = data || [];
      setRestaurants(list);

      let active = 0;
      let pending = 0;
      let blocked = 0;

      list.forEach((r) => {
        if (r.status === 'APPROVED' || r.status === 'ACTIVE') active++;
        if (r.status === 'PENDING') pending++;
        if (r.status === 'BLOCKED' || r.status === 'REJECTED') blocked++;
      });

      setActiveCount(active);
      setPendingCount(pending);
      setBlockedCount(blocked);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await adminService.approveRestaurant(id);
      alert('Restaurant Approved Successfully');
      loadRestaurants();
    } catch (err) {
      console.error(err);
      alert('Action failed');
    }
  };

  const handleBlock = async (id) => {
    try {
      await adminService.blockRestaurant(id);
      alert('Restaurant Blocked Successfully');
      loadRestaurants();
    } catch (err) {
      console.error(err);
      alert('Action failed');
    }
  };

  const handleUnblock = async (id) => {
    try {
      await adminService.unblockRestaurant(id);
      alert('Restaurant Unblocked Successfully');
      loadRestaurants();
    } catch (err) {
      console.error(err);
      alert('Action failed');
    }
  };

  return (
    <div className="admin-restaurants">
      <div className="dashboard-container">
        <AdminSidebar />

        <main className="main-content">
          <div className="topbar">
            <div>
              <h1>
                <i className="fa-solid fa-utensils"></i> Restaurants
              </h1>
              <p>Manage registered restaurants and approvals.</p>
            </div>
            <div className="profile-icon">
              <i className="fa-solid fa-user-shield"></i>
            </div>
          </div>

          {/* SUMMARY CARDS */}
          <div className="cards-container">
            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-store"></i>
              </div>
              <div>
                <h3>Total Restaurants</h3>
                <h2 id="totalRestaurants">{restaurants.length}</h2>
              </div>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <div>
                <h3>Active</h3>
                <h2 id="activeRestaurants">{activeCount}</h2>
              </div>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <div>
                <h3>Pending</h3>
                <h2 id="pendingRestaurants">{pendingCount}</h2>
              </div>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-ban"></i>
              </div>
              <div>
                <h3>Blocked</h3>
                <h2 id="blockedRestaurants">{blockedCount}</h2>
              </div>
            </div>
          </div>

          {/* RESTAURANT TABLE */}
          <div className="section-card">
            <div className="section-header">
              <h2>
                <i className="fa-solid fa-list"></i> Restaurant List
              </h2>
              <p>Review and manage restaurant accounts.</p>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Restaurant Name</th>
                    <th>Owner</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>License Number</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody id="restaurantTable">
                  {restaurants.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                        No restaurants found.
                      </td>
                    </tr>
                  ) : (
                    restaurants.map((r) => (
                      <tr key={r.restaurantId}>
                        <td>{r.restaurantName}</td>
                        <td>{r.ownerName}</td>
                        <td>{r.phone}</td>
                        <td>{r.city}</td>
                        <td>{r.licenseNumber}</td>
                        <td>
                          <span className={`status ${r.status ? r.status.toLowerCase() : ''}`}>
                            {r.status}
                          </span>
                        </td>
                        <td>
                          {r.status === 'PENDING' && (
                            <button
                              className="action-btn approve-btn"
                              onClick={() => handleApprove(r.restaurantId)}
                              style={{ marginRight: '5px' }}
                            >
                              Approve
                            </button>
                          )}
                          {r.status !== 'BLOCKED' ? (
                            <button
                              className="action-btn block-btn"
                              onClick={() => handleBlock(r.restaurantId)}
                            >
                              Block
                            </button>
                          ) : (
                            <button
                              className="action-btn approve-btn"
                              onClick={() => handleUnblock(r.restaurantId)}
                            >
                              Unblock
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
