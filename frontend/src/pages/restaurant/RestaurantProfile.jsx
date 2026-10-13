import React, { useState, useEffect } from 'react';
import RestaurantSidebar from '../../components/RestaurantSidebar';
import Toast from '../../components/Toast';
import restaurantService from '../../services/restaurantService';
import '../../assets/css/restaurant/profile.css';

export default function RestaurantProfile() {
  const [profile, setProfile] = useState({
    restaurantId: null,
    restaurantName: '',
    ownerName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    city: '',
    address: '',
    status: '',
    createdAt: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const restaurantId = localStorage.getItem('restaurantId');
    if (!restaurantId) {
      setLoading(false);
      setToast({ message: 'Restaurant session missing.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const data = await restaurantService.getRestaurantById(restaurantId);
      setProfile({
        restaurantId: data.restaurantId,
        restaurantName: data.restaurantName || '',
        ownerName: data.ownerName || '',
        email: data.email || data.user?.email || '',
        phone: data.phone || '',
        licenseNumber: data.licenseNumber || '',
        city: data.city || '',
        address: data.address || '',
        status: data.status || 'ACTIVE',
        createdAt: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : '-',
      });
      if (data.restaurantName) {
        localStorage.setItem('restaurantName', data.restaurantName);
      }
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to load restaurant profile.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    if (!profile.phone.trim() || !/^[0-9]{10}$/.test(profile.phone.trim())) {
      setToast({ message: 'Please enter a valid 10-digit phone number.', type: 'warning' });
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

    const restaurantId = localStorage.getItem('restaurantId');
    if (!restaurantId) return;

    setSaving(true);
    try {
      const payload = {
        ...profile,
        phone: profile.phone.trim(),
        city: profile.city.trim(),
        address: profile.address.trim(),
      };
      await restaurantService.updateRestaurant(restaurantId, payload);
      setToast({ message: 'Restaurant Profile Updated Successfully!', type: 'success' });
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
    <div className="restaurant-profile">
      <RestaurantSidebar />
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <main className="content">
        <header className="page-header">
          <h1>Restaurant Profile Management</h1>
          <p>View your registered details and update contact & location information.</p>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '32px', color: '#F4B400' }}></i>
            <p style={{ marginTop: '10px', color: '#64748B' }}>Loading profile details...</p>
          </div>
        ) : (
          <div className="profile-card">
            <div className="profile-icon">
              <i className="fa-solid fa-store"></i>
            </div>

            <form id="profileForm" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Restaurant Name (Registered)</label>
                  <input type="text" id="restaurantName" value={profile.restaurantName} readOnly style={{ background: '#f1f5f9', cursor: 'not-allowed' }} />
                </div>

                <div className="form-group">
                  <label>Owner Name</label>
                  <input type="text" id="ownerName" value={profile.ownerName} readOnly style={{ background: '#f1f5f9', cursor: 'not-allowed' }} />
                </div>

                <div className="form-group">
                  <label>Account Email</label>
                  <input type="email" id="email" value={profile.email || 'Registered Email'} readOnly style={{ background: '#f1f5f9', cursor: 'not-allowed' }} />
                </div>

                <div className="form-group">
                  <label>Food License Number (FSSAI/Govt)</label>
                  <input type="text" id="licenseNumber" value={profile.licenseNumber} readOnly style={{ background: '#f1f5f9', cursor: 'not-allowed' }} />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    maxLength="10"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    id="city"
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Pickup Address *</label>
                  <textarea
                    id="address"
                    rows="3"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Account Status</label>
                  <input type="text" id="status" value={profile.status} readOnly style={{ background: '#f1f5f9', cursor: 'not-allowed' }} />
                </div>

                <div className="form-group">
                  <label>Joined Platform Date</label>
                  <input type="text" id="createdAt" value={profile.createdAt} readOnly style={{ background: '#f1f5f9', cursor: 'not-allowed' }} />
                </div>
              </div>

              <button type="submit" className="save-btn" disabled={saving} style={{ marginTop: '20px' }}>
                <i className={`fa-solid ${saving ? 'fa-spinner fa-spin' : 'fa-floppy-disk'}`}></i>
                {saving ? 'Saving Profile...' : 'Save Profile Changes'}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
