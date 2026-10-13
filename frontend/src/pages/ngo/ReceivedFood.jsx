import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NgoSidebar from '../../components/NgoSidebar';
import Toast from '../../components/Toast';
import donationService, { foodRequestService } from '../../services/donationService';
import '../../assets/css/ngo/received-food.css';

export default function ReceivedFood() {
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  
  const [activeTab, setActiveTab] = useState('accepted'); // 'accepted' | 'requests'
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });

  const navigate = useNavigate();

  useEffect(() => {
    loadNgoData();
  }, []);

  useEffect(() => {
    filterData();
  }, [donations, requests, search, statusFilter, activeTab]);

  const loadNgoData = async () => {
    const ngoId = localStorage.getItem('ngoId');
    if (!ngoId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [donRes, reqRes] = await Promise.all([
        donationService.getNGODonations(ngoId).catch(() => []),
        foodRequestService.getRequestsByNGO(ngoId).catch(() => []),
      ]);

      setDonations(donRes || []);
      setRequests(reqRes || []);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to load NGO donations.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    if (activeTab === 'accepted') {
      let temp = [...donations];

      if (statusFilter !== 'ALL') {
        temp = temp.filter((d) => d.status === statusFilter);
      }

      if (search.trim()) {
        const q = search.toLowerCase();
        temp = temp.filter(
          (d) =>
            d.foodName?.toLowerCase().includes(q) ||
            d.restaurantName?.toLowerCase().includes(q) ||
            d.pickupAddress?.toLowerCase().includes(q)
        );
      }
      setFilteredDonations(temp);
    } else {
      let temp = [...requests];

      if (statusFilter !== 'ALL') {
        temp = temp.filter((r) => (r.requestStatus || r.status) === statusFilter);
      }

      if (search.trim()) {
        const q = search.toLowerCase();
        temp = temp.filter((r) => r.foodName?.toLowerCase().includes(q) || r.restaurantName?.toLowerCase().includes(q));
      }
      setFilteredDonations(temp);
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
      case 'PENDING':
        return <span className="status pending" style={{ background: '#fef3c7', color: '#b45309', padding: '4px 12px', borderRadius: '15px', fontSize: '12px', fontWeight: '600' }}>PENDING REQUEST</span>;
      case 'ACCEPTED':
      case 'APPROVED':
        return <span className="status accepted" style={{ background: '#dcfce7', color: '#15803d', padding: '4px 12px', borderRadius: '15px', fontSize: '12px', fontWeight: '600' }}>APPROVED</span>;
      case 'ASSIGNED':
        return <span className="status info" style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 12px', borderRadius: '15px', fontSize: '12px', fontWeight: '600' }}>ASSIGNED</span>;
      case 'PICKED_UP':
        return <span className="status info" style={{ background: '#f3e8ff', color: '#7e22ce', padding: '4px 12px', borderRadius: '15px', fontSize: '12px', fontWeight: '600' }}>PICKED UP</span>;
      case 'DELIVERED':
      case 'COMPLETED':
        return <span className="status completed" style={{ background: '#dbeafe', color: '#1d4ed8', padding: '4px 12px', borderRadius: '15px', fontSize: '12px', fontWeight: '600' }}>COMPLETED</span>;
      case 'REJECTED':
      case 'CANCELLED':
        return <span className="status rejected" style={{ background: '#fef2f2', color: '#991b1b', padding: '4px 12px', borderRadius: '15px', fontSize: '12px', fontWeight: '600' }}>REJECTED</span>;
      default:
        return <span className="status">{st}</span>;
    }
  };

  // Metrics
  const acceptedCount = donations.filter((d) => d.status === 'ACCEPTED').length;
  const assignedCount = donations.filter((d) => d.status === 'ASSIGNED').length;
  const pickedCount = donations.filter((d) => d.status === 'PICKED_UP').length;
  const completedCount = donations.filter((d) => d.status === 'COMPLETED' || d.status === 'DELIVERED').length;

  const totalFoodKg = donations
    .filter((d) => d.status === 'COMPLETED' || d.status === 'DELIVERED')
    .reduce((sum, d) => sum + (d.quantity || 0), 0);

  const totalMealsReceived = donations
    .filter((d) => d.status === 'COMPLETED' || d.status === 'DELIVERED')
    .reduce((sum, d) => sum + (d.approxMeals || d.quantity || 0), 0);

  return (
    <div className="ngo-received" style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex' }}>
      <NgoSidebar />
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <main className="main-content" style={{ flex: 1, marginLeft: '260px', padding: '30px' }}>
        <header className="topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: '#047857', fontWeight: '800', margin: 0 }}>
              <i className="fa-solid fa-box-open"></i> My NGO Food & Requests
            </h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Track approved food donations, assign volunteers, and view received food history.</p>
          </div>
        </header>

        {/* SUMMARY CARDS */}
        <section className="cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Approved</h3>
                <h2 style={{ fontSize: '26px', color: '#16a34a', margin: '4px 0 0 0' }}>{acceptedCount}</h2>
              </div>
              <i className="fa-solid fa-handshake" style={{ fontSize: '24px', color: '#16a34a', background: '#dcfce7', padding: '12px', borderRadius: '50%' }}></i>
            </div>
          </div>

          <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Assigned</h3>
                <h2 style={{ fontSize: '26px', color: '#0284c7', margin: '4px 0 0 0' }}>{assignedCount}</h2>
              </div>
              <i className="fa-solid fa-user-check" style={{ fontSize: '24px', color: '#0284c7', background: '#e0f2fe', padding: '12px', borderRadius: '50%' }}></i>
            </div>
          </div>

          <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Picked Up</h3>
                <h2 style={{ fontSize: '26px', color: '#7e22ce', margin: '4px 0 0 0' }}>{pickedCount}</h2>
              </div>
              <i className="fa-solid fa-truck" style={{ fontSize: '24px', color: '#7e22ce', background: '#f3e8ff', padding: '12px', borderRadius: '50%' }}></i>
            </div>
          </div>

          <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Completed</h3>
                <h2 style={{ fontSize: '26px', color: '#2563eb', margin: '4px 0 0 0' }}>{completedCount}</h2>
              </div>
              <i className="fa-solid fa-circle-check" style={{ fontSize: '24px', color: '#2563eb', background: '#dbeafe', padding: '12px', borderRadius: '50%' }}></i>
            </div>
          </div>

          <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Meals Served</h3>
                <h2 style={{ fontSize: '26px', color: '#0f766e', margin: '4px 0 0 0' }}>{totalMealsReceived}</h2>
              </div>
              <i className="fa-solid fa-utensils" style={{ fontSize: '24px', color: '#0f766e', background: '#ccfbf1', padding: '12px', borderRadius: '50%' }}></i>
            </div>
          </div>
        </section>

        {/* TABS */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>
          <button
            onClick={() => setActiveTab('accepted')}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '15px',
              background: activeTab === 'accepted' ? '#059669' : '#fff',
              color: activeTab === 'accepted' ? '#fff' : '#64748b',
              boxShadow: activeTab === 'accepted' ? '0 4px 12px rgba(5,150,105,0.2)' : 'none',
            }}
          >
            <i className="fa-solid fa-bowl-food" style={{ marginRight: '8px' }}></i>
            Approved / Received Food ({donations.length})
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '15px',
              background: activeTab === 'requests' ? '#059669' : '#fff',
              color: activeTab === 'requests' ? '#fff' : '#64748b',
              boxShadow: activeTab === 'requests' ? '0 4px 12px rgba(5,150,105,0.2)' : 'none',
            }}
          >
            <i className="fa-solid fa-paper-plane" style={{ marginRight: '8px' }}></i>
            Submitted Requests Log ({requests.length})
          </button>
        </div>

        {/* TOOLBAR */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search food item or donor restaurant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: '240px', padding: '10px 16px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
          >
            <option value="ALL">All Statuses</option>
            {activeTab === 'accepted' ? (
              <>
                <option value="ACCEPTED">Approved (Needs Volunteer)</option>
                <option value="ASSIGNED">Volunteer Assigned</option>
                <option value="PICKED_UP">Picked Up</option>
                <option value="COMPLETED">Completed</option>
              </>
            ) : (
              <>
                <option value="PENDING">Pending</option>
                <option value="ACCEPTED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </>
            )}
          </select>
        </div>

        {/* TABLE */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '32px', color: '#059669' }}></i>
            <p style={{ marginTop: '10px', color: '#64748B' }}>Loading data...</p>
          </div>
        ) : (
          <div className="table-container" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', textTransform: 'uppercase', fontSize: '13px', color: '#475569' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Restaurant</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Food Item</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Type</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Quantity</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                      No records found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredDonations.map((item, idx) => {
                    const status = item.status || item.requestStatus;
                    const isAccepted = status === 'ACCEPTED' || status === 'APPROVED';

                    return (
                      <tr key={item.donationId || item.requestId || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '14px 16px' }}><strong>{item.restaurantName || 'Restaurant'}</strong></td>
                        <td style={{ padding: '14px 16px' }}>{item.foodName}</td>
                        <td style={{ padding: '14px 16px' }}>{item.foodType || '-'}</td>
                        <td style={{ padding: '14px 16px' }}>{item.quantity ? `${item.quantity} Kg` : `${item.requiredMeals || 0} meals`}</td>
                        <td style={{ padding: '14px 16px' }}>{formatDate(item.acceptedAt || item.requestDate || item.createdAt)}</td>
                        <td style={{ padding: '14px 16px' }}>{getStatusBadge(status)}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {isAccepted && (
                              <button
                                className="action-btn assign-btn"
                                onClick={() => navigate(`/assign-volunteer?donationId=${item.donationId}`)}
                                style={{ background: '#7e22ce', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
                              >
                                <i className="fa-solid fa-user-plus"></i> Assign Volunteer
                              </button>
                            )}
                            <button
                              onClick={() => navigate(`/donation-details?donationId=${item.donationId || item.id}`)}
                              style={{ background: '#cbd5e1', color: '#334155', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
                            >
                              <i className="fa-solid fa-eye"></i> Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
