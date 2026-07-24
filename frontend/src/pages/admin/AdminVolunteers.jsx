import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import adminService from '../../services/adminService';
import volunteerService from '../../services/volunteerService';
import '../../assets/css/admin/volunteers.css';

export default function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [blockedCount, setBlockedCount] = useState(0);

  useEffect(() => {
    loadVolunteers();
  }, []);

  const loadVolunteers = async () => {
    try {
      const data = await adminService.getVolunteers();
      const list = data || [];
      setVolunteers(list);

      let active = 0;
      let pending = 0;
      let blocked = 0;

      list.forEach((v) => {
        if (v.status === 'APPROVED' || v.status === 'ACTIVE' || v.status === 'AVAILABLE') active++;
        if (v.status === 'PENDING') pending++;
        if (v.status === 'BLOCKED' || v.status === 'REJECTED') blocked++;
      });

      setActiveCount(active);
      setPendingCount(pending);
      setBlockedCount(blocked);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'BLOCKED' ? 'ACTIVE' : 'BLOCKED';
      await volunteerService.updateVolunteer(id, { status: newStatus });
      alert(`Volunteer status updated to ${newStatus}`);
      loadVolunteers();
    } catch (err) {
      console.error(err);
      alert('Action failed');
    }
  };

  return (
    <div className="admin-volunteers">
      <div className="dashboard-container">
        <AdminSidebar />

        <main className="main-content">
          <div className="topbar">
            <div>
              <h1>
                <i className="fa-solid fa-person-circle-check"></i> Volunteers
              </h1>
              <p>Manage registered volunteers and delivery partners.</p>
            </div>
            <div className="profile-icon">
              <i className="fa-solid fa-user-shield"></i>
            </div>
          </div>

          {/* CARDS */}
          <div className="cards-container">
            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-users"></i>
              </div>
              <h3>Total Volunteers</h3>
              <h2 id="totalVolunteers">{volunteers.length}</h2>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h3>Active</h3>
              <h2 id="activeVolunteers">{activeCount}</h2>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <h3>Pending</h3>
              <h2 id="pendingVolunteers">{pendingCount}</h2>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-ban"></i>
              </div>
              <h3>Blocked</h3>
              <h2 id="blockedVolunteers">{blockedCount}</h2>
            </div>
          </div>

          {/* TABLE */}
          <div className="section-card">
            <div className="section-header">
              <h2>
                <i className="fa-solid fa-list"></i> Volunteer List
              </h2>
              <p>Review and manage volunteer accounts.</p>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Volunteer Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Vehicle Type</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody id="volunteerTable">
                  {volunteers.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                        No volunteers found.
                      </td>
                    </tr>
                  ) : (
                    volunteers.map((v) => (
                      <tr key={v.volunteerId}>
                        <td>{v.volunteerName || v.fullName}</td>
                        <td>{v.email || '-'}</td>
                        <td>{v.phone}</td>
                        <td>{v.city}</td>
                        <td>{v.vehicleType || v.availability || '-'}</td>
                        <td>
                          <span className={`status ${v.status ? v.status.toLowerCase() : ''}`}>
                            {v.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className={`action-btn ${v.status === 'BLOCKED' ? 'approve-btn' : 'block-btn'}`}
                            onClick={() => handleUpdateStatus(v.volunteerId, v.status)}
                          >
                            {v.status === 'BLOCKED' ? 'Unblock' : 'Block'}
                          </button>
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
