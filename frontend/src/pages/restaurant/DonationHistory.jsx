import React, { useState, useEffect } from 'react';
import RestaurantSidebar from '../../components/RestaurantSidebar';
import Toast from '../../components/Toast';
import donationService from '../../services/donationService';
import '../../assets/css/restaurant/donation-history.css';

export default function DonationHistory() {
  const [donations, setDonations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [foodTypeFilter, setFoodTypeFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [viewDetails, setViewDetails] = useState(null);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    filterData();
  }, [donations, search, statusFilter, foodTypeFilter]);

  const loadHistory = async () => {
    const restaurantId = localStorage.getItem('restaurantId');
    if (!restaurantId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = await donationService.getRestaurantDonations(restaurantId);
      // Filter historical records: Completed, Delivered, Expired, Rejected/Cancelled
      const historyItems = (data || []).filter(
        (d) =>
          d.status === 'COMPLETED' ||
          d.status === 'DELIVERED' ||
          d.status === 'EXPIRED' ||
          d.status === 'REJECTED' ||
          d.status === 'CANCELLED'
      );
      setDonations(historyItems);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to load donation history.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    let temp = [...donations];

    if (statusFilter !== 'ALL') {
      temp = temp.filter((d) => d.status === statusFilter);
    }

    if (foodTypeFilter !== 'ALL') {
      temp = temp.filter((d) => d.foodType === foodTypeFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      temp = temp.filter((d) => d.foodName?.toLowerCase().includes(q) || d.pickupAddress?.toLowerCase().includes(q));
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

  const getStatusBadge = (status) => {
    const st = (status || '').toUpperCase();
    switch (st) {
      case 'COMPLETED':
      case 'DELIVERED':
        return <span className="status completed"><i className="fa-solid fa-circle-check"></i> {st}</span>;
      case 'EXPIRED':
        return <span className="status rejected" style={{ background: '#fef2f2', color: '#991b1b' }}><i className="fa-solid fa-calendar-xmark"></i> EXPIRED</span>;
      case 'REJECTED':
      case 'CANCELLED':
        return <span className="status rejected"><i className="fa-solid fa-ban"></i> {st}</span>;
      default:
        return <span className="status">{st}</span>;
    }
  };

  // Metrics
  const totalHistory = donations.length;
  const completedCount = donations.filter((d) => d.status === 'COMPLETED' || d.status === 'DELIVERED').length;
  const expiredCount = donations.filter((d) => d.status === 'EXPIRED').length;
  const mealsDonatedCount = donations
    .filter((d) => d.status === 'COMPLETED' || d.status === 'DELIVERED')
    .reduce((sum, d) => sum + (d.approxMeals || d.quantity || 0), 0);

  return (
    <div className="restaurant-history">
      <RestaurantSidebar />
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <main className="content">
        <header className="page-header">
          <div>
            <h1>Donation History</h1>
            <p>Archive of all completed deliveries, expired items, and historical food donations.</p>
          </div>
        </header>

        {/* Statistics */}
        <section className="stats">
          <div className="card">
            <i className="fa-solid fa-box"></i>
            <h2>{totalHistory}</h2>
            <p>Total History Records</p>
          </div>

          <div className="card">
            <i className="fa-solid fa-circle-check"></i>
            <h2>{completedCount}</h2>
            <p>Completed Deliveries</p>
          </div>

          <div className="card">
            <i className="fa-solid fa-calendar-xmark" style={{ background: '#fef2f2', color: '#dc2626' }}></i>
            <h2>{expiredCount}</h2>
            <p>Expired Donations</p>
          </div>

          <div className="card">
            <i className="fa-solid fa-utensils"></i>
            <h2>{mealsDonatedCount}</h2>
            <p>Meals Delivered</p>
          </div>
        </section>

        {/* Toolbar */}
        <section className="toolbar" style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div className="search-box" style={{ flex: 1, minWidth: '250px' }}>
            <input
              type="text"
              placeholder="Search Food Name or Address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 15px', borderRadius: '10px', border: '1px solid #FFE082' }}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #FFE082' }}
          >
            <option value="ALL">All Statuses</option>
            <option value="COMPLETED">Completed</option>
            <option value="DELIVERED">Delivered</option>
            <option value="EXPIRED">Expired</option>
          </select>

          <select
            value={foodTypeFilter}
            onChange={(e) => setFoodTypeFilter(e.target.value)}
            style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #FFE082' }}
          >
            <option value="ALL">All Food Types</option>
            <option value="VEG">Vegetarian</option>
            <option value="NON_VEG">Non Vegetarian</option>
            <option value="VEGAN">Vegan</option>
          </select>
        </section>

        {/* History Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '32px', color: '#F4B400' }}></i>
            <p style={{ marginTop: '10px', color: '#64748B' }}>Loading history records...</p>
          </div>
        ) : (
          <section className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Food Name</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Meals</th>
                  <th>Status</th>
                  <th>NGO Recipient</th>
                  <th>Completed / Expired Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                      <i className="fa-solid fa-box-open" style={{ fontSize: '36px', marginBottom: '10px', display: 'block', color: '#cbd5e1' }}></i>
                      No historical donation records found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((d) => (
                    <tr key={d.donationId}>
                      <td><strong>{d.foodName}</strong></td>
                      <td>{d.foodType}</td>
                      <td>{d.quantity} Kg</td>
                      <td>{d.approxMeals} meals</td>
                      <td>{getStatusBadge(d.status)}</td>
                      <td>{d.ngoName || '-'}</td>
                      <td>{formatDate(d.completedAt || d.deliveredAt || d.expiryTime || d.createdAt)}</td>
                      <td>
                        <button
                          className="view-btn"
                          onClick={() => setViewDetails(d)}
                          title="View Details"
                          style={{ padding: '6px 12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                        >
                          <i className="fa-solid fa-eye"></i> Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
        )}
      </main>

      {/* VIEW MODAL */}
      {viewDetails && (
        <div className="modal active" style={{ display: 'flex', zIndex: 1100 }}>
          <div className="modal-content" style={{ maxWidth: '600px', width: '90%' }}>
            <div className="modal-header">
              <h2>Historical Donation #{viewDetails.donationId}</h2>
              <span className="close" onClick={() => setViewDetails(null)}>&times;</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: '#F8FAFC', padding: '15px', borderRadius: '12px', margin: '15px 0' }}>
              <p><strong>Food Name:</strong> {viewDetails.foodName}</p>
              <p><strong>Food Type:</strong> {viewDetails.foodType}</p>
              <p><strong>Quantity:</strong> {viewDetails.quantity} Kg</p>
              <p><strong>Approx Meals:</strong> {viewDetails.approxMeals} meals</p>
              <p><strong>Prepared Time:</strong> {formatDate(viewDetails.preparedTime)}</p>
              <p><strong>Expiry Time:</strong> {formatDate(viewDetails.expiryTime)}</p>
              <p><strong>Final Status:</strong> {viewDetails.status}</p>
              <p><strong>NGO Partner:</strong> {viewDetails.ngoName || 'None'}</p>
            </div>

            <p style={{ marginBottom: '8px' }}><strong>Pickup Address:</strong> {viewDetails.pickupAddress}</p>
            <p><strong>Special Instructions:</strong> {viewDetails.specialInstructions || 'None'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
