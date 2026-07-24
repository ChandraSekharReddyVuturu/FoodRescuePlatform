import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import adminService from '../../services/adminService';
import '../../assets/css/admin/ngos.css';

export default function AdminNgos() {
  const [ngos, setNgos] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [blockedCount, setBlockedCount] = useState(0);

  useEffect(() => {
    loadNgos();
  }, []);

  const loadNgos = async () => {
    try {
      const data = await adminService.getNgos();
      const list = data || [];
      setNgos(list);

      let active = 0;
      let pending = 0;
      let blocked = 0;

      list.forEach((n) => {
        if (n.status === 'APPROVED' || n.status === 'ACTIVE') active++;
        if (n.status === 'PENDING') pending++;
        if (n.status === 'BLOCKED' || n.status === 'REJECTED') blocked++;
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
      await adminService.approveNgo(id);
      alert('NGO Approved Successfully');
      loadNgos();
    } catch (err) {
      console.error(err);
      alert('Action failed');
    }
  };

  const handleBlock = async (id) => {
    try {
      await adminService.blockNgo(id);
      alert('NGO Blocked Successfully');
      loadNgos();
    } catch (err) {
      console.error(err);
      alert('Action failed');
    }
  };

  const handleUnblock = async (id) => {
    try {
      await adminService.unblockNgo(id);
      alert('NGO Unblocked Successfully');
      loadNgos();
    } catch (err) {
      console.error(err);
      alert('Action failed');
    }
  };

  return (
    <div className="admin-ngos">
      <div className="dashboard-container">
        <AdminSidebar />

        <main className="main-content">
          <div className="topbar">
            <div>
              <h1>
                <i className="fa-solid fa-hand-holding-heart"></i> NGOs
              </h1>
              <p>Manage registered NGOs and approval requests.</p>
            </div>
            <div className="profile-icon">
              <i className="fa-solid fa-user-shield"></i>
            </div>
          </div>

          {/* CARDS */}
          <div className="cards-container">
            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-building"></i>
              </div>
              <h3>Total NGOs</h3>
              <h2 id="totalNgos">{ngos.length}</h2>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h3>Active</h3>
              <h2 id="activeNgos">{activeCount}</h2>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <h3>Pending</h3>
              <h2 id="pendingNgos">{pendingCount}</h2>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-ban"></i>
              </div>
              <h3>Blocked</h3>
              <h2 id="blockedNgos">{blockedCount}</h2>
            </div>
          </div>

          {/* NGO TABLE */}
          <div className="section-card">
            <div className="section-header">
              <h2>
                <i className="fa-solid fa-list"></i> NGO List
              </h2>
              <p>Review and manage NGO accounts.</p>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>NGO Name</th>
                    <th>Owner Name</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Registration Number</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody id="ngoTable">
                  {ngos.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                        No NGOs found.
                      </td>
                    </tr>
                  ) : (
                    ngos.map((n) => (
                      <tr key={n.ngoId}>
                        <td>{n.ngoName}</td>
                        <td>{n.ownerName}</td>
                        <td>{n.phone}</td>
                        <td>{n.city}</td>
                        <td>{n.registrationNumber}</td>
                        <td>
                          <span className={`status ${n.status ? n.status.toLowerCase() : ''}`}>
                            {n.status}
                          </span>
                        </td>
                        <td>
                          {n.status === 'PENDING' && (
                            <button
                              className="action-btn approve-btn"
                              onClick={() => handleApprove(n.ngoId)}
                              style={{ marginRight: '5px' }}
                            >
                              Approve
                            </button>
                          )}
                          {n.status !== 'BLOCKED' ? (
                            <button
                              className="action-btn block-btn"
                              onClick={() => handleBlock(n.ngoId)}
                            >
                              Block
                            </button>
                          ) : (
                            <button
                              className="action-btn approve-btn"
                              onClick={() => handleUnblock(n.ngoId)}
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
