import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VolunteerSidebar from '../../components/VolunteerSidebar';
import Toast from '../../components/Toast';
import volunteerService from '../../services/volunteerService';
import authService from '../../services/authService';
import '../../assets/css/volunteer/profile.css';

export default function VolunteerProfile() {
  const [profile, setProfile] = useState({
    volunteerId: null,
    fullName: '',
    phone: '',
    email: '',
    gender: 'MALE',
    city: '',
    address: '',
    availability: 'AVAILABLE',
    status: 'ACTIVE',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const volunteerId = localStorage.getItem('volunteerId');
    const userId = localStorage.getItem('userId');

    setLoading(true);
    try {
      let data = null;
      if (volunteerId) {
        data = await volunteerService.getVolunteerById(volunteerId);
      } else if (userId) {
        data = await volunteerService.getVolunteerByUserId(userId);
      }

      if (data) {
        setProfile({
          volunteerId: data.volunteerId,
          fullName: data.fullName || data.volunteerName || 'Volunteer',
          phone: data.phone || '',
          email: data.email || data.user?.email || '',
          gender: data.gender || 'MALE',
          city: data.city || '',
          address: data.address || '',
          availability: data.availability || 'AVAILABLE',
          status: data.status || 'ACTIVE',
        });
        if (data.fullName) {
          localStorage.setItem('volunteerName', data.fullName);
        }
      }
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to load profile details.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    if (!profile.fullName.trim()) {
      setToast({ message: 'Full Name is required.', type: 'warning' });
      return false;
    }
    if (!profile.phone.trim() || !/^[0-9]{10}$/.test(profile.phone.trim())) {
      setToast({ message: 'Enter a valid 10-digit phone number.', type: 'warning' });
      return false;
    }
    if (!profile.city.trim()) {
      setToast({ message: 'City is required.', type: 'warning' });
      return false;
    }
    if (!profile.address.trim()) {
      setToast({ message: 'Address is required.', type: 'warning' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const volunteerId = localStorage.getItem('volunteerId') || profile.volunteerId;
    if (!volunteerId) return;

    setSaving(true);
    try {
      const payload = {
        fullName: profile.fullName.trim(),
        phone: profile.phone.trim(),
        gender: profile.gender,
        city: profile.city.trim(),
        address: profile.address.trim(),
        availability: profile.availability,
      };
      await volunteerService.updateVolunteer(volunteerId, payload);
      localStorage.setItem('volunteerName', profile.fullName.trim());
      setToast({ message: 'Volunteer Profile Updated Successfully!', type: 'success' });
    } catch (err) {
      console.error(err);
      setToast({
        message: err.response?.data?.message || 'Failed to update profile.',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="volunteer-profile" style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex' }}>
      <VolunteerSidebar />
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <main className="main-content" style={{ flex: 1, marginLeft: '260px', padding: '30px' }}>
        <header className="topbar" style={{ marginBottom: '25px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: '#0f172a', fontWeight: '800', margin: 0 }}>
              <i className="fa-solid fa-id-card"></i> Volunteer Profile
            </h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>View & update your contact details and availability status.</p>
          </div>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '32px', color: '#0284c7' }}></i>
            <p style={{ marginTop: '10px', color: '#64748B' }}>Loading profile...</p>
          </div>
        ) : (
          <div className="profile-card" style={{ background: '#fff', borderRadius: '16px', padding: '30px', border: '1px solid #e2e8f0', maxWidth: '800px' }}>
            <div className="profile-header" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px' }}>
              <div className="profile-image">
                <i className="fa-solid fa-user-ninja" style={{ fontSize: '36px', color: '#0284c7', background: '#e0f2fe', padding: '16px', borderRadius: '50%' }}></i>
              </div>
              <div>
                <h2 style={{ margin: '0 0 4px 0', color: '#1e293b' }}>{profile.fullName}</h2>
                <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '12px', fontSize: '13px', fontWeight: '600' }}>
                  {profile.status}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#475569' }}>Full Name *</label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#475569' }}>Registered Email</label>
                  <input
                    type="email"
                    value={profile.email || 'Registered Email'}
                    readOnly
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f1f5f9', cursor: 'not-allowed' }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#475569' }}>Phone Number *</label>
                  <input
                    type="tel"
                    maxLength="10"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#475569' }}>Gender *</label>
                  <select
                    value={profile.gender}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#475569' }}>City *</label>
                  <input
                    type="text"
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#475569' }}>Availability Status *</label>
                  <select
                    value={profile.availability}
                    onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="AVAILABLE">Available for Pickups</option>
                    <option value="NOT_AVAILABLE">Busy / Not Available</option>
                  </select>
                </div>

                <div className="form-group full-width" style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#475569' }}>Address *</label>
                  <textarea
                    rows="3"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  ></textarea>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
                <button
                  type="submit"
                  disabled={saving}
                  style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <i className={`fa-solid ${saving ? 'fa-spinner fa-spin' : 'fa-floppy-disk'}`}></i>
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}
                >
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
