import React, { useState, useEffect } from 'react';
import NgoSidebar from '../../components/NgoSidebar';
import Toast from '../../components/Toast';
import ngoService from '../../services/ngoService';
import '../../assets/css/ngo/profile.css';

export default function NgoProfile() {
  const [profile, setProfile] = useState({
    ngoId: null,
    ngoName: '',
    ownerName: '',
    email: '',
    phone: '',
    registrationNumber: '',
    city: '',
    address: '',
    status: 'ACTIVE',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const ngoId = localStorage.getItem('ngoId');
    if (!ngoId) {
      setLoading(false);
      setToast({ message: 'NGO session missing.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const data = await ngoService.getNGOProfile(ngoId);
      setProfile({
        ngoId: data.ngoId,
        ngoName: data.ngoName || '',
        ownerName: data.ownerName || '',
        email: data.email || data.user?.email || '',
        phone: data.phone || '',
        registrationNumber: data.registrationNumber || '',
        city: data.city || '',
        address: data.address || '',
        status: data.status || 'ACTIVE',
      });
      if (data.ngoName) {
        localStorage.setItem('ngoName', data.ngoName);
      }
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to load NGO profile.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    if (!profile.ngoName.trim()) {
      setToast({ message: 'NGO Name is required.', type: 'warning' });
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

    const ngoId = localStorage.getItem('ngoId');
    if (!ngoId) return;

    setSaving(true);
    try {
      const payload = {
        ngoName: profile.ngoName.trim(),
        ownerName: profile.ownerName.trim(),
        phone: profile.phone.trim(),
        registrationNumber: profile.registrationNumber.trim(),
        city: profile.city.trim(),
        address: profile.address.trim(),
      };
      await ngoService.updateNGO(ngoId, payload);
      localStorage.setItem('ngoName', profile.ngoName.trim());
      setToast({ message: 'NGO Profile Updated Successfully!', type: 'success' });
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

  return (
    <div className="ngo-profile" style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex' }}>
      <NgoSidebar />
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <main className="main-content" style={{ flex: 1, marginLeft: '260px', padding: '30px' }}>
        <header className="topbar" style={{ marginBottom: '25px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: '#047857', fontWeight: '800', margin: 0 }}>
              <i className="fa-solid fa-user"></i> NGO Profile Management
            </h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>View and update your organization details & registration info.</p>
          </div>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '32px', color: '#059669' }}></i>
            <p style={{ marginTop: '10px', color: '#64748B' }}>Loading NGO profile...</p>
          </div>
        ) : (
          <div className="profile-card" style={{ background: '#fff', borderRadius: '16px', padding: '30px', border: '1px solid #e2e8f0', maxWidth: '800px' }}>
            <div className="profile-header" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px' }}>
              <div className="profile-icon">
                <i className="fa-solid fa-building-user" style={{ fontSize: '36px', color: '#059669', background: '#dcfce7', padding: '16px', borderRadius: '50%' }}></i>
              </div>
              <div>
                <h2 style={{ margin: '0 0 4px 0', color: '#1e293b' }}>{profile.ngoName || 'NGO Name'}</h2>
                <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '12px', fontSize: '13px', fontWeight: '600' }}>
                  {profile.status}
                </span>
              </div>
            </div>

            <form id="profileForm" onSubmit={handleSubmit}>
              <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#475569' }}>NGO Name *</label>
                  <input
                    type="text"
                    value={profile.ngoName}
                    onChange={(e) => setProfile({ ...profile, ngoName: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#475569' }}>Representative / Owner Name</label>
                  <input
                    type="text"
                    value={profile.ownerName}
                    onChange={(e) => setProfile({ ...profile, ownerName: e.target.value })}
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
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#475569' }}>Registration / Tax ID</label>
                  <input
                    type="text"
                    value={profile.registrationNumber}
                    onChange={(e) => setProfile({ ...profile, registrationNumber: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
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

                <div className="form-group full-width" style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#475569' }}>Complete NGO Address *</label>
                  <textarea
                    rows="3"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  ></textarea>
                </div>
              </div>

              <div className="button-group" style={{ marginTop: '25px' }}>
                <button
                  type="submit"
                  disabled={saving}
                  style={{ background: '#059669', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <i className={`fa-solid ${saving ? 'fa-spinner fa-spin' : 'fa-floppy-disk'}`}></i>
                  {saving ? 'Saving Changes...' : 'Save Profile Changes'}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
