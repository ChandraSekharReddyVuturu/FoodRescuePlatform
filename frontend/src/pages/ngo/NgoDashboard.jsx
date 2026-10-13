import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NgoSidebar from '../../components/NgoSidebar';
import Toast from '../../components/Toast';
import donationService, { foodRequestService } from '../../services/donationService';
import ngoService from '../../services/ngoService';
import '../../assets/css/ngo/dashboard.css';

export default function NgoDashboard() {
  const [ngoName, setNgoName] = useState('NGO Partner');
  const [availableDonations, setAvailableDonations] = useState([]);
  const [ngoDonations, setNgoDonations] = useState([]);
  const [ngoRequests, setNgoRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    const ngoId = localStorage.getItem('ngoId');
    const name = localStorage.getItem('ngoName');
    if (name) {
      setNgoName(name);
    }

    if (ngoId) {
      loadDashboardData(ngoId);
    } else {
      loadAvailableOnly();
    }
  }, []);

  const loadDashboardData = async (ngoId) => {
    setLoading(true);
    try {
      if (!localStorage.getItem('ngoName')) {
        const profile = await ngoService.getNGOProfile(ngoId).catch(() => null);
        if (profile && profile.ngoName) {
          setNgoName(profile.ngoName);
          localStorage.setItem('ngoName', profile.ngoName);
        }
      }

      const [availRes, ngoDonRes, reqRes] = await Promise.all([
        donationService.getAvailableDonations().catch(() => []),
        donationService.getNGODonations(ngoId).catch(() => []),
        foodRequestService.getRequestsByNGO(ngoId).catch(() => []),
      ]);

      setAvailableDonations(availRes || []);
      setNgoDonations(ngoDonRes || []);
      setNgoRequests(reqRes || []);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to load NGO dashboard data.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableOnly = async () => {
    setLoading(true);
    try {
      const availRes = await donationService.getAvailableDonations();
      setAvailableDonations(availRes || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptDonation = async (donationId) => {
    const ngoId = localStorage.getItem('ngoId');
    if (!ngoId) {
      setToast({ message: 'NGO session missing. Please log in.', type: 'error' });
      return;
    }

    try {
      await donationService.acceptDonation(donationId, ngoId);
      setToast({ message: 'Donation accepted successfully!', type: 'success' });
      loadDashboardData(ngoId);
    } catch (err) {
      console.error(err);
      setToast({
        message: err.response?.data?.message || 'Unable to accept donation.',
        type: 'error',
      });
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

  const getStatusBadge = (status) => {
    const st = (status || '').toUpperCase();
    switch (st) {
      case 'AVAILABLE':
        return <span className="status available" style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '600' }}>AVAILABLE</span>;
      case 'PENDING':
        return <span className="status pending" style={{ background: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '600' }}>PENDING REQUEST</span>;
      case 'ACCEPTED':
      case 'APPROVED':
        return <span className="status accepted" style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '600' }}>APPROVED</span>;
      case 'ASSIGNED':
        return <span className="status info" style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '600' }}>ASSIGNED</span>;
      case 'PICKED_UP':
        return <span className="status info" style={{ background: '#f3e8ff', color: '#7e22ce', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '600' }}>PICKED UP</span>;
      case 'DELIVERED':
      case 'COMPLETED':
        return <span className="status completed" style={{ background: '#dbeafe', color: '#1d4ed8', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '600' }}>COMPLETED</span>;
      default:
        return <span className="status" style={{ padding: '4px 10px', borderRadius: '15px', fontSize: '12px' }}>{st}</span>;
    }
  };

  // Metrics
  const availableCount = availableDonations.length;
  const pendingRequestsCount = ngoRequests.filter((r) => (r.requestStatus || r.status) === 'PENDING').length;
  const approvedRequestsCount = ngoDonations.filter((d) => d.status === 'ACCEPTED').length;
  const activeDeliveriesCount = ngoDonations.filter((d) => d.status === 'ASSIGNED' || d.status === 'PICKED_UP').length;
  const completedCount = ngoDonations.filter((d) => d.status === 'COMPLETED' || d.status === 'DELIVERED').length;

  const totalFoodKg = ngoDonations
    .filter((d) => d.status === 'COMPLETED' || d.status === 'DELIVERED')
    .reduce((sum, d) => sum + (d.quantity || 0), 0);

  const totalMealsReceived = ngoDonations
    .filter((d) => d.status === 'COMPLETED' || d.status === 'DELIVERED')
    .reduce((sum, d) => sum + (d.approxMeals || d.quantity || 0), 0);

  return (
    <div className="ngo-dashboard" style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex' }}>
      <NgoSidebar />
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <main className="main-content" style={{ flex: 1, marginLeft: '260px', padding: '30px' }}>
        <header className="topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: '#D89B00', fontWeight: '800', margin: 0 }}>NGO Rescue Dashboard</h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Welcome, <strong>{ngoName}</strong>! Rescue surplus food and serve your community.</p>
          </div>
          <Link to="/ngo-profile" style={{ color: '#F4B400', textDecoration: 'none' }}>
            <i className="fa-solid fa-building-user" style={{ fontSize: '38px' }}></i>
          </Link>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '36px', color: '#059669' }}></i>
            <p style={{ marginTop: '10px', color: '#64748B' }}>Loading real-time NGO statistics...</p>
          </div>
        ) : (
          <>
            {/* Statistics Grid */}
            <section className="cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Available Surplus</h3>
                    <h2 style={{ fontSize: '28px', color: '#059669', margin: '6px 0 0 0' }}>{availableCount}</h2>
                  </div>
                  <i className="fa-solid fa-bowl-food" style={{ fontSize: '28px', color: '#059669', background: '#dcfce7', padding: '14px', borderRadius: '50%' }}></i>
                </div>
              </div>

              <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Pending Requests</h3>
                    <h2 style={{ fontSize: '28px', color: '#d97706', margin: '6px 0 0 0' }}>{pendingRequestsCount}</h2>
                  </div>
                  <i className="fa-solid fa-hourglass-half" style={{ fontSize: '28px', color: '#d97706', background: '#fef3c7', padding: '14px', borderRadius: '50%' }}></i>
                </div>
              </div>

              <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Approved Donations</h3>
                    <h2 style={{ fontSize: '28px', color: '#2563eb', margin: '6px 0 0 0' }}>{approvedRequestsCount}</h2>
                  </div>
                  <i className="fa-solid fa-handshake" style={{ fontSize: '28px', color: '#2563eb', background: '#dbeafe', padding: '14px', borderRadius: '50%' }}></i>
                </div>
              </div>

              <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Active Deliveries</h3>
                    <h2 style={{ fontSize: '28px', color: '#7e22ce', margin: '6px 0 0 0' }}>{activeDeliveriesCount}</h2>
                  </div>
                  <i className="fa-solid fa-truck" style={{ fontSize: '28px', color: '#7e22ce', background: '#f3e8ff', padding: '14px', borderRadius: '50%' }}></i>
                </div>
              </div>

              <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Completed Pickups</h3>
                    <h2 style={{ fontSize: '28px', color: '#16a34a', margin: '6px 0 0 0' }}>{completedCount}</h2>
                  </div>
                  <i className="fa-solid fa-circle-check" style={{ fontSize: '28px', color: '#16a34a', background: '#dcfce7', padding: '14px', borderRadius: '50%' }}></i>
                </div>
              </div>

              <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Total Food Received</h3>
                    <h2 style={{ fontSize: '28px', color: '#0f766e', margin: '6px 0 0 0' }}>{totalFoodKg} <span style={{ fontSize: '16px', fontWeight: '500' }}>Kg</span></h2>
                  </div>
                  <i className="fa-solid fa-box" style={{ fontSize: '28px', color: '#0f766e', background: '#ccfbf1', padding: '14px', borderRadius: '50%' }}></i>
                </div>
              </div>

              <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Meals Served</h3>
                    <h2 style={{ fontSize: '28px', color: '#0284c7', margin: '6px 0 0 0' }}>{totalMealsReceived}</h2>
                  </div>
                  <i className="fa-solid fa-utensils" style={{ fontSize: '28px', color: '#0284c7', background: '#e0f2fe', padding: '14px', borderRadius: '50%' }}></i>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <Link to="/available-food" style={{ background: '#F4B400', color: '#374151', padding: '20px', borderRadius: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px', fontWeight: '700', boxShadow: '0 4px 15px rgba(244,180,0,0.2)' }}>
                <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '24px' }}></i>
                <span>Find Food Surplus</span>
              </Link>

              <Link to="/received-food" style={{ background: '#E6A700', color: '#374151', padding: '20px', borderRadius: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px', fontWeight: '700', boxShadow: '0 4px 15px rgba(230,167,0,0.2)' }}>
                <i className="fa-solid fa-list-check" style={{ fontSize: '24px' }}></i>
                <span>My Requests & Food</span>
              </Link>

              <Link to="/assign-volunteer" style={{ background: '#FFD54F', color: '#374151', padding: '20px', borderRadius: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px', fontWeight: '700', boxShadow: '0 4px 15px rgba(255,213,79,0.2)' }}>
                <i className="fa-solid fa-user-plus" style={{ fontSize: '24px' }}></i>
                <span>Assign Volunteer</span>
              </Link>

              <Link to="/ngo-profile" style={{ background: '#374151', color: '#FFFDF7', padding: '20px', borderRadius: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px', fontWeight: '700', boxShadow: '0 4px 15px rgba(55,65,81,0.2)' }}>
                <i className="fa-solid fa-user-gear" style={{ fontSize: '24px' }}></i>
                <span>Manage Profile</span>
              </Link>
            </section>

            {/* Discover Available Food Section */}
            <div className="table-container" style={{ background: '#fff', padding: '25px', borderRadius: '16px', border: '1px solid #FFE082', marginBottom: '30px' }}>
              <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', color: '#D89B00', margin: 0 }}>
                  <i className="fa-solid fa-bowl-food" style={{ marginRight: '8px' }}></i> Available Food Donations Nearby ({availableDonations.length})
                </h2>
                <Link to="/available-food" style={{ color: '#D89B00', fontWeight: '600', textDecoration: 'none' }}>
                  Explore All Available &rarr;
                </Link>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#FFF9F0', textTransform: 'uppercase', fontSize: '13px', color: '#374151' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Restaurant</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Food Item</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Type</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Quantity</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Expiry</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {availableDonations.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                        No fresh food donations available right now. Check back soon!
                      </td>
                    </tr>
                  ) : (
                    availableDonations.slice(0, 5).map((d) => (
                      <tr key={d.donationId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '14px 16px' }}><strong>{d.restaurantName || 'Restaurant'}</strong></td>
                        <td style={{ padding: '14px 16px' }}>{d.foodName}</td>
                        <td style={{ padding: '14px 16px' }}>{d.foodType}</td>
                        <td style={{ padding: '14px 16px' }}>{d.quantity} Kg ({d.approxMeals} meals)</td>
                        <td style={{ padding: '14px 16px' }}>{formatDate(d.expiryTime)}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <button
                            onClick={() => handleAcceptDonation(d.donationId)}
                            style={{ background: '#F4B400', color: '#374151', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' }}
                          >
                            <i className="fa-solid fa-hand-holding-heart"></i> Request Food
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
