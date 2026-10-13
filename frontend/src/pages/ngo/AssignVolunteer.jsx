import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import NgoSidebar from '../../components/NgoSidebar';
import Toast from '../../components/Toast';
import donationService from '../../services/donationService';
import volunteerService from '../../services/volunteerService';
import '../../assets/css/ngo/assign-volunteer.css';

export default function AssignVolunteer() {
  const [searchParams] = useSearchParams();
  const [donation, setDonation] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('ALL');
  
  const [loading, setLoading] = useState(true);
  const [assigningId, setAssigningId] = useState(null);
  const [confirmVolunteer, setConfirmVolunteer] = useState(null);
  const [toast, setToast] = useState({ message: '', type: '' });
  
  const navigate = useNavigate();
  const donationId = searchParams.get('donationId');

  useEffect(() => {
    loadInitialData();
  }, [donationId]);

  useEffect(() => {
    filterVolunteers();
  }, [volunteers, search, cityFilter]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const volRes = await volunteerService.getAllVolunteers().catch(() => []);
      setVolunteers(volRes || []);

      if (donationId) {
        const donRes = await donationService.getDonationById(donationId).catch(() => null);
        setDonation(donRes);
      }
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to load volunteer data.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const filterVolunteers = () => {
    let temp = [...volunteers];

    if (cityFilter !== 'ALL') {
      temp = temp.filter((v) => v.city?.toLowerCase() === cityFilter.toLowerCase());
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      temp = temp.filter((v) => (v.fullName || v.volunteerName || '').toLowerCase().includes(q) || v.phone?.includes(q));
    }

    setFilteredVolunteers(temp);
  };

  const handleAssignConfirm = async () => {
    if (!donationId) {
      setToast({ message: 'No donation selected for volunteer assignment.', type: 'warning' });
      return;
    }

    if (!confirmVolunteer) return;

    setAssigningId(confirmVolunteer.volunteerId);
    try {
      await donationService.assignVolunteer(donationId, confirmVolunteer.volunteerId);
      setToast({ message: `Volunteer ${confirmVolunteer.fullName || 'assigned'} assigned successfully!`, type: 'success' });
      setConfirmVolunteer(null);
      setTimeout(() => {
        navigate('/received-food');
      }, 1200);
    } catch (err) {
      console.error(err);
      setToast({
        message: err.response?.data?.message || 'Failed to assign volunteer.',
        type: 'error',
      });
    } finally {
      setAssigningId(null);
    }
  };

  const uniqueCities = Array.from(new Set(volunteers.map((v) => v.city).filter(Boolean)));

  return (
    <div className="dashboard-container" style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex' }}>
      <NgoSidebar />
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <main className="main-content" style={{ flex: 1, marginLeft: '260px', padding: '30px' }}>
        <header className="topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: '#D89B00', fontWeight: '800', margin: 0 }}>Assign Volunteer to Pickups</h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Select an available volunteer to collect approved food donations.</p>
          </div>
          <Link to="/received-food" style={{ padding: '8px 16px', borderRadius: '8px', background: '#e2e8f0', color: '#475569', textDecoration: 'none', fontWeight: '600' }}>
            &larr; Back to Received Food
          </Link>
        </header>

        {/* DONATION SUMMARY CARD */}
        {donation && (
          <div className="donation-card" style={{ background: '#fff', borderRadius: '16px', padding: '20px 25px', border: '1px solid #e2e8f0', marginBottom: '25px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '18px', color: '#047857', margin: '0 0 12px 0' }}>Selected Food Donation #{donation.donationId}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', background: '#f8fafc', padding: '15px', borderRadius: '12px' }}>
              <p style={{ margin: 0 }}><strong>Food Item:</strong> {donation.foodName}</p>
              <p style={{ margin: 0 }}><strong>Donor Restaurant:</strong> {donation.restaurantName}</p>
              <p style={{ margin: 0 }}><strong>Quantity:</strong> {donation.quantity} Kg ({donation.approxMeals} meals)</p>
              <p style={{ margin: 0 }}><strong>Pickup Address:</strong> {donation.pickupAddress}</p>
              <p style={{ margin: 0 }}><strong>Current Status:</strong> <span style={{ fontWeight: '700', color: donation.status === 'ACCEPTED' ? '#15803d' : '#0369a1' }}>{donation.status}</span></p>
            </div>

            {donation.status !== 'ACCEPTED' && (
              <div style={{ marginTop: '12px', background: '#fef3c7', color: '#b45309', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: '600' }}>
                <i className="fa-solid fa-triangle-exclamation"></i> Note: This donation has status '{donation.status}'. Volunteer assignment is recommended for 'ACCEPTED' status items.
              </div>
            )}
          </div>
        )}

        {/* TOOLBAR */}
        <section style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '25px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search Volunteer by Name or Phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: '240px', padding: '10px 16px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
          />

          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
          >
            <option value="ALL">All Cities</option>
            {uniqueCities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </section>

        {/* VOLUNTEER LIST */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '32px', color: '#059669' }}></i>
            <p style={{ marginTop: '10px', color: '#64748B' }}>Loading volunteers...</p>
          </div>
        ) : (
          <div className="table-container" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', textTransform: 'uppercase', fontSize: '13px', color: '#475569' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Volunteer Name</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Phone</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>City</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Status / Availability</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredVolunteers.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                      No volunteers registered or available matching search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredVolunteers.map((v) => (
                    <tr key={v.volunteerId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px 16px' }}><strong>{v.fullName || v.volunteerName || 'Volunteer'}</strong></td>
                      <td style={{ padding: '14px 16px' }}>{v.phone || '-'}</td>
                      <td style={{ padding: '14px 16px' }}>{v.city || '-'}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                          {v.availability || v.status || 'AVAILABLE'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <button
                          onClick={() => setConfirmVolunteer(v)}
                          disabled={assigningId === v.volunteerId}
                          style={{ background: '#7e22ce', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                        >
                          <i className="fa-solid fa-user-plus"></i> Assign
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* CONFIRMATION MODAL */}
      {confirmVolunteer && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', maxWidth: '480px', width: '90%', textAlign: 'center' }}>
            <i className="fa-solid fa-user-check" style={{ fontSize: '42px', color: '#7e22ce', marginBottom: '15px' }}></i>
            <h2 style={{ fontSize: '20px', color: '#1e293b', margin: '0 0 10px 0' }}>Confirm Volunteer Assignment</h2>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>
              Assign <strong>{confirmVolunteer.fullName || 'Volunteer'}</strong> to handle pickup for donation #{donationId || ''}?
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setConfirmVolunteer(null)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}>
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleAssignConfirm}
                style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: '#F4B400', color: '#374151', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}
              >
                <i className="fa-solid fa-user-plus"></i> Confirm Volunteer Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
