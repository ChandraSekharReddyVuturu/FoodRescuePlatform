import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VolunteerSidebar from '../../components/VolunteerSidebar';
import Toast from '../../components/Toast';
import donationService from '../../services/donationService';
import volunteerService from '../../services/volunteerService';
import '../../assets/css/volunteer/dashboard.css';

export default function VolunteerDashboard() {
  const [volunteerName, setVolunteerName] = useState('Volunteer Hero');
  const [donations, setDonations] = useState([]);
  const [availability, setAvailability] = useState('AVAILABLE');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    const volunteerId = localStorage.getItem('volunteerId');
    const name = localStorage.getItem('volunteerName');
    if (name) {
      setVolunteerName(name);
    }

    if (volunteerId) {
      loadVolunteerDashboard(volunteerId);
    } else {
      setLoading(false);
    }
  }, []);

  const loadVolunteerDashboard = async (volunteerId) => {
    setLoading(true);
    try {
      if (!localStorage.getItem('volunteerName')) {
        const profile = await volunteerService.getVolunteerById(volunteerId).catch(() => null);
        if (profile) {
          const vName = profile.fullName || profile.volunteerName || 'Volunteer';
          setVolunteerName(vName);
          setAvailability(profile.availability || 'AVAILABLE');
          localStorage.setItem('volunteerName', vName);
        }
      }

      const data = await donationService.getVolunteerDonations(volunteerId);
      setDonations(data || []);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to load volunteer pickups.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handlePickup = async (donationId) => {
    try {
      await donationService.pickupDonation(donationId);
      setToast({ message: 'Food item marked as PICKED UP from restaurant!', type: 'success' });
      const volunteerId = localStorage.getItem('volunteerId');
      if (volunteerId) loadVolunteerDashboard(volunteerId);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to update pickup status.', type: 'error' });
    }
  };

  const handleDeliver = async (donationId) => {
    try {
      await donationService.deliverDonation(donationId);
      setToast({ message: 'Food marked as DELIVERED to NGO destination!', type: 'success' });
      const volunteerId = localStorage.getItem('volunteerId');
      if (volunteerId) loadVolunteerDashboard(volunteerId);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to update delivery status.', type: 'error' });
    }
  };

  const handleComplete = async (donationId) => {
    try {
      await donationService.completeDonation(donationId);
      setToast({ message: 'Delivery completed & impact recorded!', type: 'success' });
      const volunteerId = localStorage.getItem('volunteerId');
      if (volunteerId) loadVolunteerDashboard(volunteerId);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to complete delivery.', type: 'error' });
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
      case 'ASSIGNED':
        return <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}><i className="fa-solid fa-user-check"></i> ASSIGNED</span>;
      case 'PICKED':
      case 'PICKED_UP':
        return <span style={{ background: '#f3e8ff', color: '#7e22ce', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}><i className="fa-solid fa-truck"></i> IN TRANSIT</span>;
      case 'DELIVERED':
        return <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}><i className="fa-solid fa-house-circle-check"></i> DELIVERED</span>;
      case 'COMPLETED':
        return <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}><i className="fa-solid fa-circle-check"></i> COMPLETED</span>;
      default:
        return <span style={{ padding: '4px 10px', borderRadius: '15px', fontSize: '12px' }}>{st}</span>;
    }
  };

  // Metrics
  const totalPickups = donations.length;
  const assignedCount = donations.filter((d) => d.status === 'ASSIGNED').length;
  const activeDeliveryCount = donations.filter((d) => d.status === 'PICKED_UP' || d.status === 'PICKED').length;
  const completedCount = donations.filter((d) => d.status === 'COMPLETED' || d.status === 'DELIVERED').length;
  const mealsDeliveredCount = donations
    .filter((d) => d.status === 'COMPLETED' || d.status === 'DELIVERED')
    .reduce((sum, d) => sum + (d.approxMeals || d.quantity || 0), 0);

  return (
    <div className="volunteer-dashboard" style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex' }}>
      <VolunteerSidebar />
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <main className="main-content" style={{ flex: 1, marginLeft: '260px', padding: '30px' }}>
        <header className="topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: '#D89B00', fontWeight: '800', margin: 0 }}>Volunteer Duty Portal</h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Welcome back, <strong>{volunteerName}</strong>! Ready to rescue food and feed families.</p>
          </div>
          <Link to="/volunteer-profile" style={{ color: '#F4B400', textDecoration: 'none' }}>
            <i className="fa-solid fa-person-shelter" style={{ fontSize: '38px' }}></i>
          </Link>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '36px', color: '#0284c7' }}></i>
            <p style={{ marginTop: '10px', color: '#64748B' }}>Loading pickup assignments...</p>
          </div>
        ) : (
          <>
            {/* CARDS CONTAINER */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Total Assigned</h3>
                    <h2 style={{ fontSize: '28px', color: '#0f172a', margin: '4px 0 0 0' }}>{totalPickups}</h2>
                  </div>
                  <i className="fa-solid fa-box" style={{ fontSize: '24px', color: '#0284c7', background: '#e0f2fe', padding: '12px', borderRadius: '50%' }}></i>
                </div>
              </div>

              <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Ready for Pickup</h3>
                    <h2 style={{ fontSize: '28px', color: '#0284c7', margin: '4px 0 0 0' }}>{assignedCount}</h2>
                  </div>
                  <i className="fa-solid fa-clock" style={{ fontSize: '24px', color: '#0284c7', background: '#e0f2fe', padding: '12px', borderRadius: '50%' }}></i>
                </div>
              </div>

              <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Active Deliveries</h3>
                    <h2 style={{ fontSize: '28px', color: '#7e22ce', margin: '4px 0 0 0' }}>{activeDeliveryCount}</h2>
                  </div>
                  <i className="fa-solid fa-truck-fast" style={{ fontSize: '24px', color: '#7e22ce', background: '#f3e8ff', padding: '12px', borderRadius: '50%' }}></i>
                </div>
              </div>

              <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Completed Deliveries</h3>
                    <h2 style={{ fontSize: '28px', color: '#16a34a', margin: '4px 0 0 0' }}>{completedCount}</h2>
                  </div>
                  <i className="fa-solid fa-circle-check" style={{ fontSize: '24px', color: '#16a34a', background: '#dcfce7', padding: '12px', borderRadius: '50%' }}></i>
                </div>
              </div>

              <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Meals Delivered</h3>
                    <h2 style={{ fontSize: '28px', color: '#0f766e', margin: '4px 0 0 0' }}>{mealsDeliveredCount}</h2>
                  </div>
                  <i className="fa-solid fa-utensils" style={{ fontSize: '24px', color: '#0f766e', background: '#ccfbf1', padding: '12px', borderRadius: '50%' }}></i>
                </div>
              </div>
            </section>

            {/* QUICK ACTIONS */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <Link to="/pickups" style={{ background: '#F4B400', color: '#374151', padding: '20px', borderRadius: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px', fontWeight: '700', boxShadow: '0 4px 15px rgba(244,180,0,0.2)' }}>
                <i className="fa-solid fa-truck-ramp-box" style={{ fontSize: '24px' }}></i>
                <span>View Assigned Pickups ({assignedCount})</span>
              </Link>

              <Link to="/delivery-history" style={{ background: '#E6A700', color: '#374151', padding: '20px', borderRadius: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px', fontWeight: '700', boxShadow: '0 4px 15px rgba(230,167,0,0.2)' }}>
                <i className="fa-solid fa-clock-rotate-left" style={{ fontSize: '24px' }}></i>
                <span>Delivery History Log</span>
              </Link>

              <Link to="/volunteer-profile" style={{ background: '#374151', color: '#FFFDF7', padding: '20px', borderRadius: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px', fontWeight: '700', boxShadow: '0 4px 15px rgba(55,65,81,0.2)' }}>
                <i className="fa-solid fa-id-card" style={{ fontSize: '24px' }}></i>
                <span>My Availability Status</span>
              </Link>
            </section>

            {/* ACTIVE ASSIGNED PICKUPS LIST */}
            <div className="section-card" style={{ background: '#fff', padding: '25px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', color: '#0f172a', margin: 0 }}>
                  <i className="fa-solid fa-box-open" style={{ color: '#0284c7', marginRight: '8px' }}></i> Active Pickups & Deliveries ({donations.filter(d => d.status !== 'COMPLETED').length})
                </h2>
                <Link to="/pickups" style={{ color: '#0284c7', fontWeight: '600', textDecoration: 'none' }}>
                  Manage All Pickups &rarr;
                </Link>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', textTransform: 'uppercase', fontSize: '13px', color: '#475569' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Restaurant (Pickup)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>NGO (Delivery)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Food Item</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Quantity</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Status</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.filter(d => d.status !== 'COMPLETED').length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                        No active pickups assigned to you currently.
                      </td>
                    </tr>
                  ) : (
                    donations
                      .filter(d => d.status !== 'COMPLETED')
                      .slice(0, 5)
                      .map((d) => (
                        <tr key={d.donationId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '14px 16px' }}><strong>{d.restaurantName || 'Restaurant'}</strong></td>
                          <td style={{ padding: '14px 16px' }}>{d.ngoName || 'NGO Partner'}</td>
                          <td style={{ padding: '14px 16px' }}>{d.foodName}</td>
                          <td style={{ padding: '14px 16px' }}>{d.quantity} Kg ({d.approxMeals} meals)</td>
                          <td style={{ padding: '14px 16px' }}>{getStatusBadge(d.status)}</td>
                          <td style={{ padding: '14px 16px' }}>
                            {d.status === 'ASSIGNED' && (
                              <button
                                onClick={() => handlePickup(d.donationId)}
                                style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' }}
                              >
                                <i className="fa-solid fa-truck-pickup"></i> Mark Picked Up
                              </button>
                            )}
                            {(d.status === 'PICKED' || d.status === 'PICKED_UP') && (
                              <button
                                onClick={() => handleDeliver(d.donationId)}
                                style={{ background: '#7e22ce', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' }}
                              >
                                <i className="fa-solid fa-house-circle-check"></i> Mark Delivered
                              </button>
                            )}
                            {d.status === 'DELIVERED' && (
                              <button
                                onClick={() => handleComplete(d.donationId)}
                                style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' }}
                              >
                                <i className="fa-solid fa-circle-check"></i> Complete
                              </button>
                            )}
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
