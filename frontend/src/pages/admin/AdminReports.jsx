import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import Toast from '../../components/Toast';
import adminService from '../../services/adminService';
import '../../assets/css/admin/reports.css';

export default function AdminReports() {
  const [reportData, setReportData] = useState({
    totalDonations: 0,
    completedDonations: 0,
    pendingDonations: 0,
    expiredDonations: 0,
    totalRestaurants: 0,
    totalNgos: 0,
    totalVolunteers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('role') !== 'ADMIN') {
      navigate('/login');
      return;
    }
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    try {
      const data = await adminService.getReports();
      if (data) {
        setReportData({
          totalDonations: data.totalDonations || 0,
          completedDonations: data.completedDonations || 0,
          pendingDonations: data.pendingDonations || 0,
          expiredDonations: data.expiredDonations || 0,
          totalRestaurants: data.totalRestaurants || 0,
          totalNgos: data.totalNgos || 0,
          totalVolunteers: data.totalVolunteers || 0,
        });
      }
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to load report analytics.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  const completionRate =
    reportData.totalDonations > 0
      ? ((reportData.completedDonations / reportData.totalDonations) * 100).toFixed(1) + '%'
      : '0%';

  return (
    <div className="admin-reports" style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex' }}>
      <AdminSidebar />
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <main className="main-content" style={{ flex: 1, marginLeft: '260px', padding: '30px' }}>
        <header className="topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: '#D89B00', fontWeight: '800', margin: 0 }}>
              <i className="fa-solid fa-chart-pie" style={{ color: '#F4B400' }}></i> System Analytics & Impact Reports
            </h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Comprehensive food rescue, partner participation, and impact analytics.</p>
          </div>
          <button
            onClick={handleExportPDF}
            style={{ background: '#F4B400', color: '#374151', border: 'none', padding: '12px 20px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <i className="fa-solid fa-file-pdf"></i> Export / Print PDF Report
          </button>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '32px', color: '#0284c7' }}></i>
            <p style={{ marginTop: '10px', color: '#64748B' }}>Generating system reports...</p>
          </div>
        ) : (
          <>
            {/* REPORT SECTIONS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '30px' }}>
              
              {/* 1. Food Rescue Report */}
              <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                  <i className="fa-solid fa-bowl-food" style={{ fontSize: '24px', color: '#059669', background: '#dcfce7', padding: '12px', borderRadius: '50%' }}></i>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>Food Rescue Report</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#475569', fontSize: '14px' }}>
                  <p style={{ margin: 0 }}><strong>Total Donations Listed:</strong> {reportData.totalDonations}</p>
                  <p style={{ margin: 0 }}><strong>Successfully Rescued:</strong> <span style={{ color: '#16a34a', fontWeight: '700' }}>{reportData.completedDonations}</span></p>
                  <p style={{ margin: 0 }}><strong>Pending Pickups:</strong> {reportData.pendingDonations}</p>
                  <p style={{ margin: 0 }}><strong>Expired Surplus:</strong> <span style={{ color: '#dc2626', fontWeight: '700' }}>{reportData.expiredDonations}</span></p>
                </div>
              </div>

              {/* 2. Restaurant Report */}
              <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                  <i className="fa-solid fa-utensils" style={{ fontSize: '24px', color: '#0284c7', background: '#e0f2fe', padding: '12px', borderRadius: '50%' }}></i>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>Restaurant Report</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#475569', fontSize: '14px' }}>
                  <p style={{ margin: 0 }}><strong>Participating Restaurants:</strong> {reportData.totalRestaurants}</p>
                  <p style={{ margin: 0 }}><strong>Active Donor Network:</strong> {reportData.totalRestaurants > 0 ? 'Operational' : 'Initializing'}</p>
                  <p style={{ margin: 0 }}><strong>Avg Donations / Restaurant:</strong> {reportData.totalRestaurants > 0 ? (reportData.totalDonations / reportData.totalRestaurants).toFixed(1) : 0}</p>
                </div>
              </div>

              {/* 3. NGO Report */}
              <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                  <i className="fa-solid fa-hand-holding-heart" style={{ fontSize: '24px', color: '#7e22ce', background: '#f3e8ff', padding: '12px', borderRadius: '50%' }}></i>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>NGO Impact Report</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#475569', fontSize: '14px' }}>
                  <p style={{ margin: 0 }}><strong>Registered NGO Partners:</strong> {reportData.totalNgos}</p>
                  <p style={{ margin: 0 }}><strong>Communities Served:</strong> Active</p>
                  <p style={{ margin: 0 }}><strong>Delivered Requests:</strong> {reportData.completedDonations}</p>
                </div>
              </div>

              {/* 4. Volunteer Report */}
              <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                  <i className="fa-solid fa-person-circle-check" style={{ fontSize: '24px', color: '#0f766e', background: '#ccfbf1', padding: '12px', borderRadius: '50%' }}></i>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>Volunteer Activity Report</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#475569', fontSize: '14px' }}>
                  <p style={{ margin: 0 }}><strong>Registered Volunteers:</strong> {reportData.totalVolunteers}</p>
                  <p style={{ margin: 0 }}><strong>Delivery Fleet:</strong> Active</p>
                  <p style={{ margin: 0 }}><strong>Total Completed Runs:</strong> {reportData.completedDonations}</p>
                </div>
              </div>

            </div>

            {/* MONTHLY IMPACT SUMMARY */}
            <div className="section-card" style={{ background: '#fff', padding: '25px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div className="section-header" style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', color: '#0f172a', margin: 0 }}>
                  <i className="fa-solid fa-chart-line" style={{ color: '#0284c7', marginRight: '8px' }}></i> Monthly Platform Impact Summary
                </h2>
                <p style={{ color: '#64748b', marginTop: '4px' }}>Overall fulfillment rate and community performance metrics.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
                <div>
                  <h4 style={{ margin: '0 0 6px 0', color: '#475569' }}>Donation Completion Rate</h4>
                  <p style={{ fontSize: '32px', fontWeight: '800', color: '#059669', margin: 0 }}>{completionRate}</p>
                </div>

                <div>
                  <h4 style={{ margin: '0 0 6px 0', color: '#475569' }}>Food Rescue Fulfillment Status</h4>
                  <p style={{ fontSize: '16px', color: '#334155', margin: 0, marginTop: '8px' }}>
                    {reportData.totalDonations > 0
                      ? `${reportData.completedDonations} out of ${reportData.totalDonations} surplus food donations successfully delivered to NGO partners.`
                      : 'No donation activities recorded.'}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
