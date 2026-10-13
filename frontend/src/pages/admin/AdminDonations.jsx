import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import Toast from '../../components/Toast';
import adminService from '../../services/adminService';
import '../../assets/css/admin/donations.css';

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });
  
  // Details Modal
  const [selectedDonation, setSelectedDonation] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('role') !== 'ADMIN') {
      navigate('/login');
      return;
    }
    loadDonations();
  }, []);

  useEffect(() => {
    filterData();
  }, [donations, search, statusFilter, typeFilter]);

  const loadDonations = async () => {
    setLoading(true);
    try {
      const data = await adminService.getDonations();
      setDonations(data || []);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to load platform-wide donations.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    let temp = [...donations];

    if (statusFilter !== 'ALL') {
      temp = temp.filter((d) => d.status === statusFilter);
    }

    if (typeFilter !== 'ALL') {
      temp = temp.filter((d) => d.foodType === typeFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      temp = temp.filter(
        (d) =>
          d.foodName?.toLowerCase().includes(q) ||
          d.restaurantName?.toLowerCase().includes(q) ||
          d.ngoName?.toLowerCase().includes(q)
      );
    }

    setFiltered(temp);
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
        return <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}>AVAILABLE</span>;
      case 'PENDING':
        return <span style={{ background: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}>PENDING</span>;
      case 'ACCEPTED':
      case 'APPROVED':
        return <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}>APPROVED</span>;
      case 'ASSIGNED':
        return <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}>ASSIGNED</span>;
      case 'PICKED_UP':
      case 'PICKED':
        return <span style={{ background: '#f3e8ff', color: '#7e22ce', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}>IN TRANSIT</span>;
      case 'DELIVERED':
      case 'COMPLETED':
        return <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}>COMPLETED</span>;
      case 'EXPIRED':
        return <span style={{ background: '#fef2f2', color: '#991b1b', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}>EXPIRED</span>;
      default:
        return <span style={{ padding: '4px 10px', borderRadius: '15px', fontSize: '12px' }}>{st}</span>;
    }
  };

  // Metrics
  const availableCount = donations.filter((d) => d.status === 'AVAILABLE').length;
  const inProgressCount = donations.filter((d) => d.status === 'ACCEPTED' || d.status === 'ASSIGNED' || d.status === 'PICKED_UP' || d.status === 'PICKED').length;
  const completedCount = donations.filter((d) => d.status === 'COMPLETED' || d.status === 'DELIVERED').length;
  const expiredCount = donations.filter((d) => d.status === 'EXPIRED').length;

  return (
    <div className="admin-donations" style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex' }}>
      <AdminSidebar />
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <main className="main-content" style={{ flex: 1, marginLeft: '260px', padding: '30px' }}>
        <header className="topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: '#0f172a', fontWeight: '800', margin: 0 }}>
              <i className="fa-solid fa-box-open" style={{ color: '#0284c7' }}></i> Platform-Wide Food Donations
            </h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Monitor all food donations across restaurants, NGOs, and volunteers.</p>
          </div>
        </header>

        {/* METRICS CARDS */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Total Donations</h3>
                <h2 style={{ fontSize: '28px', color: '#0f172a', margin: '4px 0 0 0' }}>{donations.length}</h2>
              </div>
              <i className="fa-solid fa-box" style={{ fontSize: '24px', color: '#0f172a', background: '#f1f5f9', padding: '12px', borderRadius: '50%' }}></i>
            </div>
          </div>

          <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Available Surplus</h3>
                <h2 style={{ fontSize: '28px', color: '#16a34a', margin: '4px 0 0 0' }}>{availableCount}</h2>
              </div>
              <i className="fa-solid fa-bowl-food" style={{ fontSize: '24px', color: '#16a34a', background: '#dcfce7', padding: '12px', borderRadius: '50%' }}></i>
            </div>
          </div>

          <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>In-Transit / Active</h3>
                <h2 style={{ fontSize: '28px', color: '#7e22ce', margin: '4px 0 0 0' }}>{inProgressCount}</h2>
              </div>
              <i className="fa-solid fa-truck" style={{ fontSize: '24px', color: '#7e22ce', background: '#f3e8ff', padding: '12px', borderRadius: '50%' }}></i>
            </div>
          </div>

          <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Completed</h3>
                <h2 style={{ fontSize: '28px', color: '#2563eb', margin: '4px 0 0 0' }}>{completedCount}</h2>
              </div>
              <i className="fa-solid fa-circle-check" style={{ fontSize: '24px', color: '#2563eb', background: '#dbeafe', padding: '12px', borderRadius: '50%' }}></i>
            </div>
          </div>

          <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Expired</h3>
                <h2 style={{ fontSize: '28px', color: '#dc2626', margin: '4px 0 0 0' }}>{expiredCount}</h2>
              </div>
              <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '24px', color: '#dc2626', background: '#fef2f2', padding: '12px', borderRadius: '50%' }}></i>
            </div>
          </div>
        </section>

        {/* TOOLBAR */}
        <section style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '25px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search Food Name, Restaurant, or NGO..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: '240px', padding: '10px 16px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
          >
            <option value="ALL">All Dietary Types</option>
            <option value="VEG">Vegetarian</option>
            <option value="NON_VEG">Non Vegetarian</option>
            <option value="VEGAN">Vegan</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
          >
            <option value="ALL">All Statuses</option>
            <option value="AVAILABLE">Available</option>
            <option value="ACCEPTED">Approved / Accepted</option>
            <option value="ASSIGNED">Assigned to Volunteer</option>
            <option value="PICKED_UP">In Transit</option>
            <option value="COMPLETED">Completed</option>
            <option value="EXPIRED">Expired</option>
          </select>
        </section>

        {/* DONATION TABLE */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '32px', color: '#0284c7' }}></i>
            <p style={{ marginTop: '10px', color: '#64748B' }}>Loading platform donations...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <h3>No Donations Found</h3>
            <p style={{ color: '#64748b' }}>No donation records matching your filter.</p>
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', textTransform: 'uppercase', fontSize: '13px', color: '#475569' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Food Item</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Restaurant (Donor)</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>NGO (Recipient)</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Quantity</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Created Date</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d, idx) => (
                  <tr key={d.donationId || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px' }}><strong>{d.foodName || '-'}</strong></td>
                    <td style={{ padding: '14px 16px' }}>{d.restaurantName || '-'}</td>
                    <td style={{ padding: '14px 16px' }}>{d.ngoName || '-'}</td>
                    <td style={{ padding: '14px 16px' }}>{d.quantity ? `${d.quantity} Kg` : '-'}</td>
                    <td style={{ padding: '14px 16px' }}>{formatDate(d.createdAt)}</td>
                    <td style={{ padding: '14px 16px' }}>{getStatusBadge(d.status)}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <button
                        onClick={() => setSelectedDonation(d)}
                        style={{ background: '#cbd5e1', color: '#334155', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}
                      >
                        <i className="fa-solid fa-eye"></i> Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* DETAILS MODAL */}
      {selectedDonation && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', maxWidth: '550px', width: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
              <h2 style={{ fontSize: '20px', color: '#0f172a', margin: 0 }}>Donation #{selectedDonation.donationId} Details</h2>
              <span style={{ cursor: 'pointer', fontSize: '24px', color: '#94a3b8' }} onClick={() => setSelectedDonation(null)}>&times;</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: '#f8fafc', padding: '15px', borderRadius: '12px', marginBottom: '20px' }}>
              <p style={{ margin: 0 }}><strong>Food Item:</strong> {selectedDonation.foodName}</p>
              <p style={{ margin: 0 }}><strong>Category:</strong> {selectedDonation.foodType || '-'}</p>
              <p style={{ margin: 0 }}><strong>Restaurant:</strong> {selectedDonation.restaurantName || '-'}</p>
              <p style={{ margin: 0 }}><strong>NGO Partner:</strong> {selectedDonation.ngoName || '-'}</p>
              <p style={{ margin: 0 }}><strong>Quantity:</strong> {selectedDonation.quantity} Kg</p>
              <p style={{ margin: 0 }}><strong>Status:</strong> {selectedDonation.status}</p>
              <p style={{ margin: 0 }}><strong>Created:</strong> {formatDate(selectedDonation.createdAt)}</p>
              <p style={{ margin: 0 }}><strong>Expiry:</strong> {formatDate(selectedDonation.expiryTime)}</p>
            </div>

            <button onClick={() => setSelectedDonation(null)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
