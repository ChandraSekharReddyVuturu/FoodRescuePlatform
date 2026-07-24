import React, { useState, useEffect } from 'react';
import RestaurantSidebar from '../../components/RestaurantSidebar';
import restaurantService from '../../services/restaurantService';
import '../../assets/css/restaurant/profile.css';

export default function RestaurantProfile() {
  const [profile, setProfile] = useState({
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const restaurantId = localStorage.getItem('restaurantId');
    if (!restaurantId) return;

    try {
      const data = await restaurantService.getRestaurantById(restaurantId);
      setProfile({
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
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const restaurantId = localStorage.getItem('restaurantId');
    if (!restaurantId) return;

    setLoading(true);
    try {
      await restaurantService.updateRestaurant(restaurantId, profile);
      alert('Profile Updated Successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="restaurant-profile">
      <RestaurantSidebar />

      <main className="content">
        <header className="page-header">
          <h1>Restaurant Profile</h1>
          <p>View and update your restaurant information.</p>
        </header>

        <div className="profile-card">
          <div className="profile-icon">
            <i className="fa-solid fa-store"></i>
          </div>

          <form id="profileForm" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Restaurant Name</label>
                <input type="text" id="restaurantName" value={profile.restaurantName} readOnly />
              </div>

              <div className="form-group">
                <label>Owner Name</label>
                <input type="text" id="ownerName" value={profile.ownerName} readOnly />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" id="email" value={profile.email} readOnly />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>License Number</label>
                <input type="text" id="licenseNumber" value={profile.licenseNumber} readOnly />
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  id="city"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Address</label>
                <textarea
                  id="address"
                  rows="4"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Status</label>
                <input type="text" id="status" value={profile.status} readOnly />
              </div>

              <div className="form-group">
                <label>Joined On</label>
                <input type="text" id="createdAt" value={profile.createdAt} readOnly />
              </div>
            </div>

            <button type="submit" className="save-btn" disabled={loading}>
              <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-floppy-disk'}`}></i>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
