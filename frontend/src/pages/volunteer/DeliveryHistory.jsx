import React, { useState, useEffect } from 'react';
import VolunteerSidebar from '../../components/VolunteerSidebar';
import Toast from '../../components/Toast';
import donationService from '../../services/donationService';
import '../../assets/css/volunteer/delivery-history.css';

export default function DeliveryHistory() {
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    filterHistory();
  }, [history, search]);

  const loadHistory = async () => {
    const volunteerId = localStorage.getItem('volunteerId');
    if (!volunteerId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = await donationService.getVolunteerDonations(volunteerId);
      const list = (data || []).filter(
        (d) => d.status === 'COMPLETED' || d.status === 'DELIVERED'
      );
      setHistory(list);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to load delivery history.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const filterHistory = () => {
    let temp = [...history];

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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Metrics
  const totalDeliveries = history.length;
  const totalMealsDelivered = history.reduce((sum, d) => sum + (d.approxMeals || d.quantity || 0), 0);
  const totalKgDelivered = history.reduce((sum, d) => sum + (d.quantity || 0), 0);

  return (
    <div className="volunteer-history" style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex' }}>
      <VolunteerSidebar />
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <main className="main-content" style={{ flex: 1, marginLeft: '260px', padding: '30px' }}>
        <header className="topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: '#0f172a', fontWeight: '800', margin: 0 }}>
              <i className="fa-solid fa-clock-rotate-left" style={{ color: '#059669' }}></i> Delivery History & Social Impact
            </h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Log of all successfully rescued and delivered food items.</p>
          </div>
        </header>

        {/* SUMMARY METRICS CARDS */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Total Completed Pickups</h3>
                <h2 style={{ fontSize: '28px', color: '#059669', margin: '4px 0 0 0' }}>{totalDeliveries}</h2>
              </div>
              <i className="fa-solid fa-circle-check" style={{ fontSize: '24px', color: '#059669', background: '#dcfce7', padding: '12px', borderRadius: '50%' }}></i>
            </div>
          </div>

          <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Meals Delivered</h3>
                <h2 style={{ fontSize: '28px', color: '#0284c7', margin: '4px 0 0 0' }}>{totalMealsDelivered}</h2>
              </div>
              <i className="fa-solid fa-utensils" style={{ fontSize: '24px', color: '#0284c7', background: '#e0f2fe', padding: '12px', borderRadius: '50%' }}></i>
            </div>
          </div>

          <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Total Weight Rescued</h3>
                <h2 style={{ fontSize: '28px', color: '#0f766e', margin: '4px 0 0 0' }}>{totalKgDelivered} <span style={{ fontSize: '16px', fontWeight: '500' }}>Kg</span></h2>
              </div>
              <i className="fa-solid fa-weight-scale" style={{ fontSize: '24px', color: '#0f766e', background: '#ccfbf1', padding: '12px', borderRadius: '50%' }}></i>
            </div>
          </div>
        </section>

        {/* SEARCH TOOLBAR */}
        <section style={{ background: '#fff', padding: '15px 20px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search completed deliveries by Food, Restaurant, or NGO..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 16px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
          />
        </section>

        {/* TABLE */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '32px', color: '#059669' }}></i>
            <p style={{ marginTop: '10px', color: '#64748B' }}>Loading delivery history...</p>
          </div>
        ) : (
          <div className="table-container" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', textTransform: 'uppercase', fontSize: '13px', color: '#475569' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Restaurant</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>NGO Partner</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Food Item</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Quantity</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Delivered Date</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Proof / Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                      No completed delivery records found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((d) => (
                    <tr key={d.donationId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px 16px' }}><strong>{d.restaurantName || 'Restaurant'}</strong></td>
                      <td style={{ padding: '14px 16px' }}>{d.ngoName || 'NGO Partner'}</td>
                      <td style={{ padding: '14px 16px' }}>{d.foodName}</td>
                      <td style={{ padding: '14px 16px' }}>{d.quantity} Kg ({d.approxMeals} meals)</td>
                      <td style={{ padding: '14px 16px' }}>{formatDate(d.deliveredAt || d.updatedAt || d.createdAt)}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}>
                          <i className="fa-solid fa-circle-check"></i> {d.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
