import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import Toast from '../../components/Toast';
import adminService from '../../services/adminService';
import authService from '../../services/authService';
import '../../assets/css/admin/profile.css';

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    adminId: null,
    name: 'Administrator',
    email: 'admin@foodrescue.com',
    phone: '+91 9876543210',
    role: 'SYSTEM_ADMIN',
    status: 'ACTIVE',
    createdDate: '2025-01-01',
    lastLogin: 'Today, Active Session',
  });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('role') !== 'ADMIN') {
      navigate('/login');
      return;
    }
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const adminId = localStorage.getItem('adminId');

    setLoading(true);
    try {
      if (adminId) {
        const data = await adminService.getProfile(adminId);
        if (data) {
          setProfile({
            adminId: data.adminId,
            name: data.adminName || data.fullName || 'System Administrator',
            email: data.email || localStorage.getItem('email') || 'admin@foodrescue.com',
            phone: data.phone || '+91 9876543210',
            role: data.role || 'SYSTEM_ADMIN',
            status: data.status || 'ACTIVE',
            createdDate: data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-IN') : '2025-01-01',
            lastLogin: 'Today, Active Session',
          });
        }
      }
    } catch (err) {
      console.error(err);
      setToast({ message: 'Loaded default admin credentials.', type: 'info' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="admin-profile" style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex' }}>
      <AdminSidebar />
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <main className="main-content" style={{ flex: 1, marginLeft: '260px', padding: '30px' }}>
        <header className="topbar" style={{ marginBottom: '25px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: '#D89B00', fontWeight: '800', margin: 0 }}>
              <i className="fa-solid fa-user-shield" style={{ color: '#F4B400' }}></i> Admin Profile & Credentials
            </h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Monitor and manage system administrator credentials.</p>
          </div>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '32px', color: '#0284c7' }}></i>
            <p style={{ marginTop: '10px', color: '#64748B' }}>Loading admin profile...</p>
          </div>
        ) : (
          <div className="profile-card" style={{ background: '#fff', borderRadius: '16px', padding: '30px', border: '1px solid #e2e8f0', maxWidth: '800px' }}>
            <div className="profile-header" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px' }}>
              <div className="avatar">
                <i className="fa-solid fa-shield-halved" style={{ fontSize: '36px', color: '#0284c7', background: '#e0f2fe', padding: '16px', borderRadius: '50%' }}></i>
              </div>
              <div>
                <h2 style={{ margin: '0 0 4px 0', color: '#1e293b' }}>{profile.name}</h2>
                <p style={{ color: '#64748b', margin: '0 0 8px 0' }}>{profile.email}</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>{profile.role}</span>
                  <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>{profile.status}</span>
                </div>
              </div>
            </div>

            <div className="profile-details" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
              <div className="detail-box" style={{ background: '#f8fafc', padding: '15px', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 4px 0', color: '#475569' }}>Phone</h4>
                <p style={{ margin: 0, fontWeight: '600' }}>{profile.phone}</p>
              </div>

              <div className="detail-box" style={{ background: '#f8fafc', padding: '15px', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 4px 0', color: '#475569' }}>Email</h4>
                <p style={{ margin: 0, fontWeight: '600' }}>{profile.email}</p>
              </div>

              <div className="detail-box" style={{ background: '#f8fafc', padding: '15px', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 4px 0', color: '#475569' }}>Role Level</h4>
                <p style={{ margin: 0, fontWeight: '600' }}>{profile.role}</p>
              </div>

              <div className="detail-box" style={{ background: '#f8fafc', padding: '15px', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 4px 0', color: '#475569' }}>Created Date</h4>
                <p style={{ margin: 0, fontWeight: '600' }}>{profile.createdDate}</p>
              </div>

              <div className="detail-box" style={{ background: '#f8fafc', padding: '15px', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 4px 0', color: '#475569' }}>Active Session</h4>
                <p style={{ margin: 0, fontWeight: '600' }}>{profile.lastLogin}</p>
              </div>

              <div className="detail-box" style={{ background: '#f8fafc', padding: '15px', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 4px 0', color: '#475569' }}>Account Status</h4>
                <p style={{ margin: 0, fontWeight: '600' }}>{profile.status}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}
            >
              <i className="fa-solid fa-right-from-bracket"></i> Logout Admin Console
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
