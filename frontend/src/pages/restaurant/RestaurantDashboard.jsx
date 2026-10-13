import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RestaurantSidebar from '../../components/RestaurantSidebar';
import Toast from '../../components/Toast';
import donationService, { foodRequestService } from '../../services/donationService';
import restaurantService from '../../services/restaurantService';
import '../../assets/css/restaurant/dashboard.css';

export default function RestaurantDashboard() {
  const [restaurantName, setRestaurantName] = useState('Restaurant');
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    const restaurantId = localStorage.getItem('restaurantId');
    const storedName = localStorage.getItem('restaurantName');
    
    if (storedName) {
      setRestaurantName(storedName);
    }

    if (restaurantId) {
      loadDashboardData(restaurantId);
    } else {
      setLoading(false);
    }
  }, []);

  const loadDashboardData = async (restaurantId) => {
    setLoading(true);
    try {
      // Load restaurant details if name missing
      if (!localStorage.getItem('restaurantName')) {
        const profile = await restaurantService.getRestaurantById(restaurantId);
        if (profile && profile.restaurantName) {
          setRestaurantName(profile.restaurantName);
          localStorage.setItem('restaurantName', profile.restaurantName);
        }
      }

      const [donationData, requestData] = await Promise.all([
        donationService.getRestaurantDonations(restaurantId).catch(() => []),
        foodRequestService.getRequestsByRestaurant(restaurantId).catch(() => []),
      ]);

      setDonations(donationData || []);
      setRequests(requestData || []);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to load dashboard data.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleApproveRequest = async (requestId) => {
    try {
      await foodRequestService.updateRequestStatus(requestId, 'ACCEPTED');
      setToast({ message: 'NGO Request approved successfully!', type: 'success' });
      const restaurantId = localStorage.getItem('restaurantId');
      if (restaurantId) loadDashboardData(restaurantId);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to approve request.', type: 'error' });
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await foodRequestService.updateRequestStatus(requestId, 'REJECTED');
      setToast({ message: 'NGO Request rejected.', type: 'info' });
      const restaurantId = localStorage.getItem('restaurantId');
      if (restaurantId) loadDashboardData(restaurantId);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to reject request.', type: 'error' });
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isExpiringSoon = (expiryTime) => {
    if (!expiryTime) return false;
    const diff = new Date(expiryTime) - new Date();
    return diff > 0 && diff < 3 * 3600 * 1000; // Less than 3 hours
  };

  const getStatusBadge = (status, expiryTime) => {
    const st = (status || '').toUpperCase();
    if (st === 'AVAILABLE' && isExpiringSoon(expiryTime)) {
      return <span className="status warning"><i className="fa-solid fa-clock-rotate-left"></i> EXPIRING SOON</span>;
    }

    switch (st) {
      case 'AVAILABLE':
        return <span className="status accepted"><i className="fa-solid fa-circle-check"></i> AVAILABLE</span>;
      case 'REQUESTED':
      case 'PENDING':
        return <span className="status pending"><i className="fa-solid fa-hourglass"></i> REQUESTED</span>;
      case 'ACCEPTED':
      case 'APPROVED':
        return <span className="status accepted"><i className="fa-solid fa-handshake"></i> APPROVED</span>;
      case 'ASSIGNED':
        return <span className="status info" style={{ background: '#e0f2fe', color: '#0369a1' }}><i className="fa-solid fa-user-check"></i> ASSIGNED</span>;
      case 'PICKED_UP':
        return <span className="status info" style={{ background: '#f3e8ff', color: '#7e22ce' }}><i className="fa-solid fa-truck"></i> PICKED UP</span>;
      case 'DELIVERED':
      case 'COMPLETED':
        return <span className="status completed"><i className="fa-solid fa-circle-check"></i> COMPLETED</span>;
      case 'EXPIRED':
        return <span className="status rejected" style={{ background: '#fef2f2', color: '#991b1b' }}><i className="fa-solid fa-calendar-xmark"></i> EXPIRED</span>;
      case 'REJECTED':
      case 'CANCELLED':
        return <span className="status rejected"><i className="fa-solid fa-ban"></i> REJECTED</span>;
      default:
        return <span className="status">{st}</span>;
    }
  };

  // Calculations
  const totalDonations = donations.length;
  const activeDonations = donations.filter(
    (d) => d.status === 'AVAILABLE' || d.status === 'ACCEPTED' || d.status === 'ASSIGNED' || d.status === 'PICKED_UP'
  ).length;
  const pendingRequests = requests.filter((r) => (r.requestStatus || r.status) === 'PENDING').length;
  const approvedRequests = requests.filter(
    (r) => (r.requestStatus || r.status) === 'ACCEPTED' || (r.requestStatus || r.status) === 'APPROVED'
  ).length;
  const completedDonations = donations.filter((d) => d.status === 'COMPLETED' || d.status === 'DELIVERED').length;
  const expiredDonations = donations.filter((d) => d.status === 'EXPIRED').length;
  const totalMealsDonated = donations
    .filter((d) => d.status === 'COMPLETED' || d.status === 'DELIVERED' || d.status === 'ACCEPTED' || d.status === 'ASSIGNED' || d.status === 'PICKED_UP')
    .reduce((sum, d) => sum + (d.approxMeals || d.quantity || 0), 0);

  return (
    <div className="restaurant-dashboard">
      <RestaurantSidebar />
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <main className="content">
        <header className="topbar">
          <div>
            <h1>Restaurant Dashboard</h1>
            <p>Welcome back, <strong>{restaurantName}</strong>! Here is your food donation overview.</p>
          </div>
          <div className="top-right">
            <Link to="/profile" title="View Profile">
              <i className="fa-solid fa-circle-user" style={{ fontSize: '42px', color: '#F4B400' }}></i>
            </Link>
          </div>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '36px', color: '#F4B400' }}></i>
            <p style={{ marginTop: '10px', color: '#64748B' }}>Loading real-time dashboard stats...</p>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <section className="cards">
              <div className="card">
                <i className="fa-solid fa-bowl-food"></i>
                <h2>{totalDonations}</h2>
                <p>Total Donations</p>
              </div>

              <div className="card">
                <i className="fa-solid fa-hourglass-half"></i>
                <h2>{activeDonations}</h2>
                <p>Active Donations</p>
              </div>

              <div className="card">
                <i className="fa-solid fa-hand-holding-heart"></i>
                <h2>{pendingRequests}</h2>
                <p>Pending NGO Requests</p>
              </div>

              <div className="card">
                <i className="fa-solid fa-handshake"></i>
                <h2>{approvedRequests}</h2>
                <p>Approved Requests</p>
              </div>

              <div className="card">
                <i className="fa-solid fa-check-circle"></i>
                <h2>{completedDonations}</h2>
                <p>Completed Deliveries</p>
              </div>

              <div className="card">
                <i className="fa-solid fa-calendar-xmark" style={{ background: '#fef2f2', color: '#dc2626' }}></i>
                <h2>{expiredDonations}</h2>
                <p>Expired Donations</p>
              </div>

              <div className="card">
                <i className="fa-solid fa-utensils" style={{ background: '#e0f2fe', color: '#0284c7' }}></i>
                <h2>{totalMealsDonated}</h2>
                <p>Total Meals Rescued</p>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="actions">
              <Link to="/donate-food" className="action">
                <i className="fa-solid fa-plus"></i>
                <span>Donate Food</span>
              </Link>
              <Link to="/requests" className="action">
                <i className="fa-solid fa-list-check"></i>
                <span>View Requests</span>
              </Link>
              <Link to="/donation-history" className="action">
                <i className="fa-solid fa-clock-rotate-left"></i>
                <span>Donation History</span>
              </Link>
              <Link to="/profile" className="action">
                <i className="fa-solid fa-user"></i>
                <span>Manage Profile</span>
              </Link>
            </section>

            {/* Pending NGO Requests Table */}
            <section className="table-card">
              <div className="table-header">
                <h2>Pending NGO Requests ({requests.filter((r) => (r.requestStatus || r.status) === 'PENDING').length})</h2>
                <Link to="/requests" style={{ color: '#C88700', fontWeight: '600', textDecoration: 'none' }}>
                  View All Requests &rarr;
                </Link>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>NGO Name</th>
                    <th>Food Requested</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.filter((r) => (r.requestStatus || r.status) === 'PENDING').length === 0 ? (
                    <tr>
                      <td colSpan="6" className="empty">
                        <i className="fa-solid fa-circle-check" style={{ fontSize: '24px', color: '#10B981', display: 'block', marginBottom: '8px' }}></i>
                        No pending NGO requests right now.
                      </td>
                    </tr>
                  ) : (
                    requests
                      .filter((r) => (r.requestStatus || r.status) === 'PENDING')
                      .slice(0, 5)
                      .map((r) => (
                        <tr key={r.requestId}>
                          <td>#{r.requestId}</td>
                          <td><strong>{r.ngoName || 'Partner NGO'}</strong></td>
                          <td>{r.foodName}</td>
                          <td>{getStatusBadge(r.requestStatus || r.status)}</td>
                          <td>{formatDate(r.requestDate)}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => handleApproveRequest(r.requestId)}
                                className="action-btn"
                                style={{ background: '#10b981', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer' }}
                                title="Approve Request"
                              >
                                <i className="fa-solid fa-check"></i> Approve
                              </button>
                              <button
                                onClick={() => handleRejectRequest(r.requestId)}
                                className="action-btn"
                                style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer' }}
                                title="Reject Request"
                              >
                                <i className="fa-solid fa-xmark"></i> Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </section>

            {/* Recent Donations Table */}
            <section className="table-card">
              <div className="table-header">
                <h2>Recent Donations Overview</h2>
                <Link to="/requests" style={{ color: '#C88700', fontWeight: '600', textDecoration: 'none' }}>
                  Manage All Donations &rarr;
                </Link>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Food Name</th>
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Meals</th>
                    <th>Status</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="empty">
                        No food donations recorded yet. Click <strong>Donate Food</strong> to add your first donation!
                      </td>
                    </tr>
                  ) : (
                    donations.slice(0, 5).map((d) => (
                      <tr key={d.donationId}>
                        <td><strong>{d.foodName}</strong></td>
                        <td><span style={{ textTransform: 'capitalize' }}>{d.foodType}</span></td>
                        <td>{d.quantity} Kg</td>
                        <td>{d.approxMeals} meals</td>
                        <td>{getStatusBadge(d.status, d.expiryTime)}</td>
                        <td>{formatDate(d.createdAt)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
