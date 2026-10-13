import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import NgoSidebar from '../../components/NgoSidebar';
import Toast from '../../components/Toast';
import donationService from '../../services/donationService';
import '../../assets/css/ngo/donation-details.css';

export default function DonationDetails() {
  const [searchParams] = useSearchParams();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const donationId = searchParams.get('donationId');

  useEffect(() => {
    if (donationId) {
      loadDetails(donationId);
    } else {
      setLoading(false);
    }
  }, [donationId]);

  const loadDetails = async (id) => {
    setLoading(true);
    try {
      const data = await donationService.getDonationById(id);
      setDonation(data);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to load donation details.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestFood = async () => {
    const ngoId = localStorage.getItem('ngoId');
    if (!ngoId) {
      setToast({ message: 'NGO session missing. Please log in.', type: 'error' });
      return;
    }

    if (!donation || donation.status !== 'AVAILABLE') {
      setToast({ message: 'This donation is no longer available.', type: 'warning' });
      return;
    }

    setRequesting(true);
    try {
      await donationService.acceptDonation(donation.donationId, ngoId);
      setToast({ message: 'Food donation requested & accepted!', type: 'success' });
      setTimeout(() => {
        navigate('/received-food');
      }, 1200);
    } catch (err) {
      console.error(err);
      setToast({
        message: err.response?.data?.message || 'Failed to request donation.',
        type: 'error',
      });
    } finally {
      setRequesting(false);
    }
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

  const isExpired = donation ? donation.status === 'EXPIRED' || (donation.expiryTime && new Date(donation.expiryTime) <= new Date()) : false;

  return (
    <div className="ngo-dashboard-container" style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex' }}>
      <NgoSidebar />
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <main className="main-content" style={{ flex: 1, marginLeft: '260px', padding: '30px' }}>
        <header className="topbar" style={{ marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '26px', color: '#047857', margin: 0 }}>
              <i className="fa-solid fa-circle-info"></i> Donation Details #{donationId || ''}
            </h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Review complete food information and pickup details.</p>
          </div>
          <Link to="/available-food" style={{ padding: '8px 16px', borderRadius: '8px', background: '#e2e8f0', color: '#475569', textDecoration: 'none', fontWeight: '600' }}>
            &larr; Back to Available Food
          </Link>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '32px', color: '#059669' }}></i>
            <p style={{ marginTop: '10px', color: '#64748B' }}>Loading donation details...</p>
          </div>
        ) : !donation ? (
          <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', textAlign: 'center' }}>
            <h3>Donation Not Found</h3>
            <p style={{ color: '#64748b' }}>The requested donation details could not be loaded.</p>
          </div>
        ) : (
          <div className="details-card" style={{ background: '#fff', borderRadius: '16px', padding: '30px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', maxWidth: '800px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <i className="fa-solid fa-bowl-food" style={{ fontSize: '36px', color: '#059669', background: '#dcfce7', padding: '16px', borderRadius: '50%' }}></i>
              <div>
                <h2 style={{ margin: 0, fontSize: '24px', color: '#1e293b' }}>{donation.foodName}</h2>
                <span style={{ fontSize: '14px', color: '#059669', fontWeight: '600' }}>Category: {donation.foodType}</span>
              </div>
            </div>

            <div className="details" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', background: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
              <p style={{ margin: 0 }}><strong>Donor Restaurant:</strong> {donation.restaurantName || '-'}</p>
              <p style={{ margin: 0 }}><strong>Current Status:</strong> <span style={{ fontWeight: '700', color: donation.status === 'AVAILABLE' ? '#15803d' : '#0369a1' }}>{donation.status}</span></p>
              <p style={{ margin: 0 }}><strong>Quantity:</strong> {donation.quantity} Kg</p>
              <p style={{ margin: 0 }}><strong>Approx Meals:</strong> {donation.approxMeals} meals</p>
              <p style={{ margin: 0 }}><strong>Prepared Date & Time:</strong> {formatDate(donation.preparedTime)}</p>
              <p style={{ margin: 0 }}><strong>Expiry Date & Time:</strong> {formatDate(donation.expiryTime)}</p>
              <p style={{ margin: 0 }}><strong>NGO Assigned:</strong> {donation.ngoName || 'None'}</p>
              <p style={{ margin: 0 }}><strong>Volunteer Assigned:</strong> {donation.volunteerName || 'None'}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#047857', margin: '0 0 6px 0' }}><i className="fa-solid fa-location-dot"></i> Pickup Address</h4>
              <p style={{ background: '#f1f5f9', padding: '12px', borderRadius: '8px', margin: 0, color: '#334155' }}>{donation.pickupAddress}</p>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ color: '#047857', margin: '0 0 6px 0' }}><i className="fa-solid fa-clipboard-list"></i> Special Instructions</h4>
              <p style={{ background: '#f1f5f9', padding: '12px', borderRadius: '8px', margin: 0, color: '#334155' }}>{donation.specialInstructions || 'No special instructions specified.'}</p>
            </div>

            {donation.status === 'AVAILABLE' && !isExpired && (
              <button
                onClick={handleRequestFood}
                disabled={requesting}
                style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: '#059669', color: '#fff', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <i className={`fa-solid ${requesting ? 'fa-spinner fa-spin' : 'fa-hand-holding-heart'}`}></i>
                {requesting ? 'Requesting Food...' : 'Request Food Donation'}
              </button>
            )}

            {isExpired && (
              <div style={{ background: '#fef2f2', color: '#991b1b', padding: '12px', borderRadius: '8px', textAlign: 'center', fontWeight: '600' }}>
                <i className="fa-solid fa-circle-exclamation"></i> This food donation has expired and can no longer be requested.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
