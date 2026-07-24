import React, { useState, useEffect } from 'react';
import NgoSidebar from '../../components/NgoSidebar';
import ngoService from '../../services/ngoService';
import '../../assets/css/ngo/profile.css';

export default function NgoProfile() {
  const [profile, setProfile] = useState({
    ngoName: '',
    ownerName: '',
    email: '',
    phone: '',
    registrationNumber: '',
    city: '',
    address: '',
    status: 'ACTIVE',
  });
  const [currentDateStr, setCurrentDateStr] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const today = new Date();
    setCurrentDateStr(
      today.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );

    loadProfile();
  }, []);

  const loadProfile = async () => {
    const ngoId = localStorage.getItem('ngoId');
    if (!ngoId) return;

    try {
      const data = await ngoService.getNGOProfile(ngoId);
      setProfile({
        ngoName: data.ngoName || '',
        ownerName: data.ownerName || '',
        email: data.email || data.user?.email || '',
        phone: data.phone || '',
        registrationNumber: data.registrationNumber || '',
        city: data.city || '',
        address: data.address || '',
        status: data.status || 'Active NGO',
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ngoId = localStorage.getItem('ngoId');
    if (!ngoId) return;

    setLoading(true);
    try {
      await ngoService.updateNGO(ngoId, profile);
      alert('NGO Profile Updated Successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ngo-profile">
      <NgoSidebar />

      <main className="main-content">
        <div className="topbar">
          <div>
            <h1>
              <i className="fa-solid fa-user"></i> NGO Profile
            </h1>
            <p>View and update your organization details.</p>
          </div>
          <div id="currentDate">{currentDateStr}</div>
        </div>

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-icon">
              <i className="fa-solid fa-building-user"></i>
            </div>
            <div>
              <h2 id="ngoName">{profile.ngoName || 'NGO Name'}</h2>
              <p id="status">{profile.status}</p>
            </div>
          </div>

          <form id="profileForm" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>NGO Name</label>
                <input
                  type="text"
                  id="ngoNameInput"
                  value={profile.ngoName}
                  onChange={(e) => setProfile({ ...profile, ngoName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Owner Name</label>
                <input
                  type="text"
                  id="ownerName"
                  value={profile.ownerName}
                  onChange={(e) => setProfile({ ...profile, ownerName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Registration Number</label>
                <input
                  type="text"
                  id="registrationNumber"
                  value={profile.registrationNumber}
                  onChange={(e) => setProfile({ ...profile, registrationNumber: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  id="city"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                />
              </div>

              <div className="form-group full-width">
                <label>Address</label>
                <textarea
                  id="address"
                  rows="3"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                ></textarea>
              </div>
            </div>

            <div className="button-group">
              <button type="submit" className="save-btn" disabled={loading}>
                <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-floppy-disk'}`}></i>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
