import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NgoSidebar from '../../components/NgoSidebar';
import Toast from '../../components/Toast';
import donationService from '../../services/donationService';
import '../../assets/css/ngo/available-food.css';

export default function AvailableFood() {
  const [donations, setDonations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [ngoName, setNgoName] = useState('');
  
  // Filters & Sorting
  const [search, setSearch] = useState('');
  const [foodTypeFilter, setFoodTypeFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('EXPIRING_SOON');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });
  
  // Selected detail modal
  const [selectedDonation, setSelectedDonation] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('ngoName');
    if (name) {
      setNgoName(name);
    }
    loadAvailableFood();
  }, []);

  useEffect(() => {
    filterAndSortData();
  }, [donations, search, foodTypeFilter, sortBy]);

  const loadAvailableFood = async () => {
    setLoading(true);
    try {
      const data = await donationService.getAvailableDonations();
      // Filter out expired items explicitly
      const now = new Date();
      const validAvailable = (data || []).filter((d) => {
        if (d.status !== 'AVAILABLE') return false;
        if (d.expiryTime && new Date(d.expiryTime) <= now) return false;
        return true;
      });

      setDonations(validAvailable);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to fetch available food donations.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortData = () => {
    let temp = [...donations];

    // Filter by type
    if (foodTypeFilter !== 'ALL') {
      temp = temp.filter((d) => d.foodType === foodTypeFilter);
    }

    // Filter by search (food name, restaurant name, pickup address)
    if (search.trim()) {
      const q = search.toLowerCase();
      temp = temp.filter(
        (d) =>
          d.foodName?.toLowerCase().includes(q) ||
          d.restaurantName?.toLowerCase().includes(q) ||
          d.pickupAddress?.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'EXPIRING_SOON') {
      temp.sort((a, b) => new Date(a.expiryTime || 0) - new Date(b.expiryTime || 0));
    } else if (sortBy === 'NEWEST') {
      temp.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } else if (sortBy === 'LARGEST_QUANTITY') {
      temp.sort((a, b) => (b.quantity || 0) - (a.quantity || 0));
    }

    setFiltered(temp);
  };

  const handleRequestFood = async (donationId) => {
    const ngoId = localStorage.getItem('ngoId');
    if (!ngoId) {
      setToast({ message: 'NGO login required. Please log in.', type: 'error' });
      return;
    }

    try {
      await donationService.acceptDonation(donationId, ngoId);
      setToast({ message: 'Food request submitted & accepted successfully!', type: 'success' });
      setSelectedDonation(null);
      loadAvailableFood();
    } catch (err) {
      console.error(err);
      setToast({
        message: err.response?.data?.message || 'Unable to request food donation.',
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

  const isExpiringSoon = (expiryTime) => {
    if (!expiryTime) return false;
    const diff = new Date(expiryTime) - new Date();
    return diff > 0 && diff < 3 * 3600 * 1000;
  };

  return (
    <div className="ngo-available" style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex' }}>
      <NgoSidebar />
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <main className="main-content" style={{ flex: 1, marginLeft: '260px', padding: '30px' }}>
        <header className="topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: '#D89B00', fontWeight: '800', margin: 0 }}>Discover Available Food</h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Browse surplus food ready for immediate NGO pickup.</p>
          </div>
        </header>

        {/* TOOLBAR & FILTERS */}
        <section style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '25px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <input
              type="text"
              placeholder="Search Food Item or Restaurant..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px' }}
            />
          </div>

          <select
            value={foodTypeFilter}
            onChange={(e) => setFoodTypeFilter(e.target.value)}
            style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px' }}
          >
            <option value="ALL">All Dietary Types</option>
            <option value="VEG">Vegetarian</option>
            <option value="NON_VEG">Non Vegetarian</option>
            <option value="VEGAN">Vegan</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px' }}
          >
            <option value="EXPIRING_SOON">Sort: Expiring Soonest</option>
            <option value="NEWEST">Sort: Newest Added</option>
            <option value="LARGEST_QUANTITY">Sort: Largest Quantity</option>
          </select>
        </section>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '32px', color: '#059669' }}></i>
            <p style={{ marginTop: '10px', color: '#64748B' }}>Discovering available food...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ background: '#fff', padding: '50px', borderRadius: '16px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <i className="fa-solid fa-utensils" style={{ fontSize: '42px', color: '#cbd5e1', marginBottom: '15px' }}></i>
            <h3 style={{ color: '#334155', margin: '0 0 8px 0' }}>No Food Donations Available</h3>
            <p style={{ color: '#64748b' }}>Try clearing your search or filter settings.</p>
          </div>
        ) : (
          /* FOOD CARDS GRID */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
            {filtered.map((d) => {
              const expiringSoon = isExpiringSoon(d.expiryTime);
              return (
                <div key={d.donationId} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ background: 'linear-gradient(135deg, #F4B400, #E6A700)', color: '#374151', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', background: 'rgba(255,255,255,0.3)', padding: '3px 8px', borderRadius: '6px', fontWeight: '700' }}>{d.foodType}</span>
                      <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '8px 0 0 0', color: '#374151' }}>{d.foodName}</h3>
                    </div>
                    <i className="fa-solid fa-store" style={{ fontSize: '24px', opacity: 0.8 }}></i>
                  </div>

                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <p style={{ margin: 0, color: '#334155', fontSize: '14px' }}>
                      <strong>Restaurant:</strong> {d.restaurantName || 'Donor Restaurant'}
                    </p>
                    <p style={{ margin: 0, color: '#334155', fontSize: '14px' }}>
                      <strong>Quantity:</strong> <span style={{ color: '#D89B00', fontWeight: '700' }}>{d.quantity} Kg</span> ({d.approxMeals} approx meals)
                    </p>
                    <p style={{ margin: 0, color: '#334155', fontSize: '14px' }}>
                      <strong>Expiry:</strong> {formatDate(d.expiryTime)}
                    </p>

                    {expiringSoon && (
                      <div style={{ background: '#fff7ed', color: '#c2410c', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <i className="fa-solid fa-clock-rotate-left"></i> Expiring soon! Request quickly.
                      </div>
                    )}

                    <div style={{ marginTop: 'auto', paddingTop: '15px', display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => setSelectedDonation(d)}
                        style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #FFE082', background: '#FFFDF7', cursor: 'pointer', fontWeight: '600', color: '#374151' }}
                      >
                        <i className="fa-solid fa-circle-info"></i> Details
                      </button>
                      <button
                        onClick={() => handleRequestFood(d.donationId)}
                        style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#F4B400', color: '#374151', cursor: 'pointer', fontWeight: '700' }}
                      >
                        <i className="fa-solid fa-hand-holding-heart"></i> Request
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* DONATION DETAILS MODAL */}
      {selectedDonation && (
        <div className="modal active" style={{ display: 'flex', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1100, alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', width: '90%', maxWidth: '600px', borderRadius: '16px', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
              <h2 style={{ fontSize: '20px', color: '#047857', margin: 0 }}>{selectedDonation.foodName} Details</h2>
              <span style={{ cursor: 'pointer', fontSize: '24px', color: '#94a3b8' }} onClick={() => setSelectedDonation(null)}>&times;</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: '#f8fafc', padding: '15px', borderRadius: '12px', marginBottom: '15px' }}>
              <p style={{ margin: 0 }}><strong>Restaurant:</strong> {selectedDonation.restaurantName}</p>
              <p style={{ margin: 0 }}><strong>Category:</strong> {selectedDonation.foodType}</p>
              <p style={{ margin: 0 }}><strong>Quantity:</strong> {selectedDonation.quantity} Kg</p>
              <p style={{ margin: 0 }}><strong>Meals:</strong> {selectedDonation.approxMeals} meals</p>
              <p style={{ margin: 0 }}><strong>Prepared:</strong> {formatDate(selectedDonation.preparedTime)}</p>
              <p style={{ margin: 0 }}><strong>Expiry:</strong> {formatDate(selectedDonation.expiryTime)}</p>
            </div>

            <p style={{ marginBottom: '8px' }}><strong>Pickup Address:</strong> {selectedDonation.pickupAddress}</p>
            <p style={{ marginBottom: '20px' }}><strong>Special Instructions:</strong> {selectedDonation.specialInstructions || 'None'}</p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setSelectedDonation(null)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}>
                Close
              </button>
              <button onClick={() => handleRequestFood(selectedDonation.donationId)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: '#059669', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
                Request Food Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
