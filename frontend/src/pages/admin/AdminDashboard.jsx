import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import Toast from '../../components/Toast';
import adminService from '../../services/adminService';
import '../../assets/css/admin/dashboard.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRestaurants: 0,
    totalNgos: 0,
    totalVolunteers: 0,
    totalDonations: 0,
    activeDonations: 0,
    completedDeliveries: 0,
    expiredDonations: 0,
    assignedDonations: 0,
    pickedUpDonations: 0,
  });

  const [recentDonations, setRecentDonations] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });

  const navigate = useNavigate();

  useEffect(() => {
    // Admin Security Check
    const role = localStorage.getItem('role');
    if (role !== 'ADMIN') {
      navigate('/login');
      return;
    }

    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [dashRes, donRes, userRes] = await Promise.all([
        adminService.getDashboardData().catch(() => null),
        adminService.getRecentDonations().catch(() => []),
        adminService.getRecentUsers().catch(() => []),
      ]);

      if (dashRes) {
        setStats({
          totalUsers: dashRes.totalUsers || 0,
          totalRestaurants: dashRes.totalRestaurants || 0,
          totalNgos: dashRes.totalNgos || 0,
          totalVolunteers: dashRes.totalVolunteers || 0,
          totalDonations: dashRes.totalDonations || 0,
          activeDonations: dashRes.activeDonations || 0,
          completedDeliveries: dashRes.completedDeliveries || 0,
          expiredDonations: dashRes.expiredDonations || 0,
          assignedDonations: dashRes.assignedDonations || 0,
          pickedUpDonations: dashRes.pickedUpDonations || 0,
        });
      }

      setRecentDonations(donRes || []);
      setRecentUsers(userRes || []);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to load admin dashboard statistics.', type: 'error' });
    } finally {
      setLoading(false);
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
      case 'APPROVED':
      case 'ACTIVE':
        return <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}>{st}</span>;
      case 'PENDING':
        return <span style={{ background: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}>{st}</span>;
      case 'COMPLETED':
      case 'DELIVERED':
        return <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}>{st}</span>;
      case 'EXPIRED':
      case 'BLOCKED':
      case 'REJECTED':
        return <span style={{ background: '#fef2f2', color: '#991b1b', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}>{st}</span>;
      default:
        return <span style={{ padding: '4px 10px', borderRadius: '15px', fontSize: '12px' }}>{st}</span>;
    }
  };

  return (
    <div className="admin-dashboard" style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex' }}>
      <AdminSidebar />
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <main className="main-content" style={{ flex: 1, marginLeft: '260px', padding: '30px' }}>
        <header className="topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: '#D89B00', fontWeight: '800', margin: 0 }}>
              <i className="fa-solid fa-chart-line" style={{ color: '#F4B400' }}></i> Platform Central Control Center
            </h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Real-time statistics across restaurants, NGOs, volunteers, and food donations.</p>
          </div>
          <Link to="/admin-profile" style={{ color: '#F4B400', textDecoration: 'none' }}>
            <i className="fa-solid fa-user-shield" style={{ fontSize: '40px' }}></i>
          </Link>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '36px', color: '#0284c7' }}></i>
            <p style={{ marginTop: '10px', color: '#64748B' }}>Loading platform metrics...</p>
          </div>
        ) : (
          <>
            {/* PLATFORM METRICS GRID */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Restaurants</h3>
                    <h2 style={{ fontSize: '28px', color: '#0284c7', margin: '4px 0 0 0' }}>{stats.totalRestaurants}</h2>
                  </div>
                  <i className="fa-solid fa-utensils" style={{ fontSize: '24px', color: '#0284c7', background: '#e0f2fe', padding: '12px', borderRadius: '50%' }}></i>
                </div>
              </div>

              <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>NGO Partners</h3>
                    <h2 style={{ fontSize: '28px', color: '#059669', margin: '4px 0 0 0' }}>{stats.totalNgos}</h2>
                  </div>
                  <i className="fa-solid fa-hand-holding-heart" style={{ fontSize: '24px', color: '#059669', background: '#dcfce7', padding: '12px', borderRadius: '50%' }}></i>
                </div>
              </div>

              <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Volunteers</h3>
                    <h2 style={{ fontSize: '28px', color: '#7e22ce', margin: '4px 0 0 0' }}>{stats.totalVolunteers}</h2>
                  </div>
                  <i className="fa-solid fa-person-circle-check" style={{ fontSize: '24px', color: '#7e22ce', background: '#f3e8ff', padding: '12px', borderRadius: '50%' }}></i>
                </div>
              </div>

              <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Total Donations</h3>
                    <h2 style={{ fontSize: '28px', color: '#0f172a', margin: '4px 0 0 0' }}>{stats.totalDonations}</h2>
                  </div>
                  <i className="fa-solid fa-box-open" style={{ fontSize: '24px', color: '#0f172a', background: '#f1f5f9', padding: '12px', borderRadius: '50%' }}></i>
                </div>
              </div>

              <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Available Surplus</h3>
                    <h2 style={{ fontSize: '28px', color: '#16a34a', margin: '4px 0 0 0' }}>{stats.activeDonations}</h2>
                  </div>
                  <i className="fa-solid fa-bowl-food" style={{ fontSize: '24px', color: '#16a34a', background: '#dcfce7', padding: '12px', borderRadius: '50%' }}></i>
                </div>
              </div>

              <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Completed Pickups</h3>
                    <h2 style={{ fontSize: '28px', color: '#2563eb', margin: '4px 0 0 0' }}>{stats.completedDeliveries}</h2>
                  </div>
                  <i className="fa-solid fa-circle-check" style={{ fontSize: '24px', color: '#2563eb', background: '#dbeafe', padding: '12px', borderRadius: '50%' }}></i>
                </div>
              </div>

              <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Expired Donations</h3>
                    <h2 style={{ fontSize: '28px', color: '#dc2626', margin: '4px 0 0 0' }}>{stats.expiredDonations}</h2>
                  </div>
                  <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '24px', color: '#dc2626', background: '#fef2f2', padding: '12px', borderRadius: '50%' }}></i>
                </div>
              </div>
            </section>

            {/* QUICK ACTIONS */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <Link to="/admin-restaurants" style={{ background: '#F4B400', color: '#374151', padding: '18px', borderRadius: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '700' }}>
                <i className="fa-solid fa-utensils" style={{ fontSize: '22px' }}></i>
                <span>Manage Restaurants</span>
              </Link>

              <Link to="/admin-ngos" style={{ background: '#E6A700', color: '#374151', padding: '18px', borderRadius: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '700' }}>
                <i className="fa-solid fa-hand-holding-heart" style={{ fontSize: '22px' }}></i>
                <span>Manage NGOs</span>
              </Link>

              <Link to="/admin-volunteers" style={{ background: '#FFD54F', color: '#374151', padding: '18px', borderRadius: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '700' }}>
                <i className="fa-solid fa-person-circle-check" style={{ fontSize: '22px' }}></i>
                <span>Manage Volunteers</span>
              </Link>

              <Link to="/admin-donations" style={{ background: '#374151', color: '#FFFDF7', padding: '18px', borderRadius: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '700' }}>
                <i className="fa-solid fa-box-open" style={{ fontSize: '22px' }}></i>
                <span>Manage Donations</span>
              </Link>

              <Link to="/admin-reports" style={{ background: '#D89B00', color: '#374151', padding: '18px', borderRadius: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '700' }}>
                <i className="fa-solid fa-chart-pie" style={{ fontSize: '22px' }}></i>
                <span>Reports & Analytics</span>
              </Link>
            </section>

            {/* RECENT DONATIONS TABLE */}
            <div className="section-card" style={{ background: '#fff', padding: '25px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
              <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', color: '#0f172a', margin: 0 }}>
                  <i className="fa-solid fa-clock-rotate-left" style={{ color: '#0284c7', marginRight: '8px' }}></i> Recent Food Donations
                </h2>
                <Link to="/admin-donations" style={{ color: '#0284c7', fontWeight: '600', textDecoration: 'none' }}>
                  View All Donations &rarr;
                </Link>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', textTransform: 'uppercase', fontSize: '13px', color: '#475569' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Food Item</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Restaurant</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>NGO</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Quantity</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Status</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDonations.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                        No recent donations recorded.
                      </td>
                    </tr>
                  ) : (
                    recentDonations.slice(0, 5).map((d, index) => (
                      <tr key={d.donationId || index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '14px 16px' }}><strong>{d.foodName || '-'}</strong></td>
                        <td style={{ padding: '14px 16px' }}>{d.restaurantName || '-'}</td>
                        <td style={{ padding: '14px 16px' }}>{d.ngoName || '-'}</td>
                        <td style={{ padding: '14px 16px' }}>{d.quantity ? `${d.quantity} Kg` : '-'}</td>
                        <td style={{ padding: '14px 16px' }}>{getStatusBadge(d.status)}</td>
                        <td style={{ padding: '14px 16px' }}>{formatDate(d.createdAt)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* RECENT USERS TABLE */}
            <div className="section-card" style={{ background: '#fff', padding: '25px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', color: '#0f172a', margin: 0 }}>
                  <i className="fa-solid fa-user-plus" style={{ color: '#059669', marginRight: '8px' }}></i> Recent User Registrations
                </h2>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', textTransform: 'uppercase', fontSize: '13px', color: '#475569' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>User Email</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Role</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.length === 0 ? (
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                        No user registrations recorded.
                      </td>
                    </tr>
                  ) : (
                    recentUsers.slice(0, 5).map((u, index) => (
                      <tr key={u.userId || index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '14px 16px' }}><strong>{u.email || '-'}</strong></td>
                        <td style={{ padding: '14px 16px' }}><span style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>{u.role}</span></td>
                        <td style={{ padding: '14px 16px' }}>{formatDate(u.createdAt)}</td>
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
