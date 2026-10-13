import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantSidebar from '../../components/RestaurantSidebar';
import Toast from '../../components/Toast';
import donationService from '../../services/donationService';
import restaurantService from '../../services/restaurantService';
import '../../assets/css/restaurant/donate-food.css';

export default function DonateFood() {
  const [restaurantName, setRestaurantName] = useState('Restaurant Name');
  const [defaultAddress, setDefaultAddress] = useState('');
  const [formData, setFormData] = useState({
    foodName: '',
    foodType: 'VEG',
    quantity: '',
    approxMeals: '',
    preparedTime: '',
    expiryTime: '',
    pickupAddress: '',
    specialInstructions: '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const restaurantId = localStorage.getItem('restaurantId');
    const name = localStorage.getItem('restaurantName');
    if (name) {
      setRestaurantName(name);
    }

    if (restaurantId) {
      restaurantService.getRestaurantById(restaurantId)
        .then((res) => {
          if (res.restaurantName) {
            setRestaurantName(res.restaurantName);
            localStorage.setItem('restaurantName', res.restaurantName);
          }
          if (res.address) {
            setDefaultAddress(res.address);
            setFormData((prev) => ({
              ...prev,
              pickupAddress: prev.pickupAddress || res.address,
            }));
          }
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.foodName.trim()) {
      setToast({ message: 'Please enter Food Name.', type: 'warning' });
      return false;
    }
    if (!formData.foodType) {
      setToast({ message: 'Please select Food Type.', type: 'warning' });
      return false;
    }
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      setToast({ message: 'Quantity must be greater than 0.', type: 'warning' });
      return false;
    }
    if (!formData.approxMeals || Number(formData.approxMeals) <= 0) {
      setToast({ message: 'Approximate meals must be greater than 0.', type: 'warning' });
      return false;
    }
    if (!formData.preparedTime) {
      setToast({ message: 'Please set Prepared Time.', type: 'warning' });
      return false;
    }
    if (!formData.expiryTime) {
      setToast({ message: 'Please set Expiry Time.', type: 'warning' });
      return false;
    }

    const prep = new Date(formData.preparedTime);
    const exp = new Date(formData.expiryTime);

    if (exp <= prep) {
      setToast({ message: 'Expiry Time must be after Prepared Time.', type: 'warning' });
      return false;
    }

    if (!formData.pickupAddress.trim()) {
      setToast({ message: 'Please enter Pickup Address.', type: 'warning' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const restaurantId = Number(localStorage.getItem('restaurantId'));
    if (!restaurantId) {
      setToast({ message: 'Restaurant session missing. Please log in again.', type: 'error' });
      return;
    }

    const payload = {
      restaurantId,
      foodName: formData.foodName.trim(),
      foodType: formData.foodType,
      quantity: Number(formData.quantity),
      approxMeals: Number(formData.approxMeals),
      preparedTime: formData.preparedTime,
      expiryTime: formData.expiryTime,
      pickupAddress: formData.pickupAddress.trim(),
      specialInstructions: formData.specialInstructions.trim(),
      status: 'AVAILABLE',
    };

    setLoading(true);
    try {
      await donationService.addDonation(payload);
      setToast({ message: 'Food Donation Created Successfully!', type: 'success' });
      setTimeout(() => {
        navigate('/requests');
      }, 1200);
    } catch (error) {
      console.error(error);
      setToast({
        message: error.response?.data?.message || 'Failed to submit food donation.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="restaurant-donate">
      <RestaurantSidebar />
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <main className="content">
        <header className="page-header">
          <div>
            <h1>Donate Surplus Food</h1>
            <p>Fill in the food details to make your donation available for nearby NGOs.</p>
          </div>
        </header>

        <div className="donation-layout">
          {/* LEFT INFO PANEL */}
          <section className="info-card">
            <div className="restaurant-icon">
              <i className="fa-solid fa-store"></i>
            </div>
            <h2>{restaurantName}</h2>
            <p>
              Your food donations save meals and reduce landfill waste.
            </p>

            <div className="tips">
              <h3><i className="fa-solid fa-lightbulb"></i> Food Safety Guidelines</h3>
              <ul>
                <li>Ensure food is freshly prepared & safe for consumption</li>
                <li>Store food at safe temperature before pickup</li>
                <li>Package food in clean, sealed containers</li>
                <li>Set accurate expiry time for safety</li>
                <li>Provide accurate pickup instructions</li>
              </ul>
            </div>
          </section>

          {/* FORM */}
          <section className="form-card">
            <form id="donationForm" onSubmit={handleSubmit}>
              {/* SECTION: FOOD INFORMATION */}
              <div style={{ marginBottom: '20px', borderBottom: '2px solid #FFE082', paddingBottom: '8px' }}>
                <h3 style={{ color: '#C88700', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fa-solid fa-utensils"></i> Food Information
                </h3>
              </div>

              <div className="form-group">
                <label htmlFor="foodName">Food Name / Description *</label>
                <input
                  type="text"
                  id="foodName"
                  placeholder="e.g. Rice & Vegetable Curry, Assorted Sandwiches"
                  value={formData.foodName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="foodType">Food Type *</label>
                <select
                  id="foodType"
                  value={formData.foodType}
                  onChange={handleChange}
                  required
                >
                  <option value="VEG">Vegetarian</option>
                  <option value="NON_VEG">Non Vegetarian</option>
                  <option value="VEGAN">Vegan</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quantity">Quantity (Kg) *</label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    placeholder="e.g. 15"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="approxMeals">Approx Meals Servings *</label>
                  <input
                    type="number"
                    id="approxMeals"
                    min="1"
                    placeholder="e.g. 30"
                    value={formData.approxMeals}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* SECTION: FOOD SAFETY & TIMINGS */}
              <div style={{ margin: '25px 0 15px 0', borderBottom: '2px solid #FFE082', paddingBottom: '8px' }}>
                <h3 style={{ color: '#C88700', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fa-solid fa-shield-halved"></i> Food Safety & Timings
                </h3>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="preparedTime">Prepared Date & Time *</label>
                  <input
                    type="datetime-local"
                    id="preparedTime"
                    value={formData.preparedTime}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="expiryTime">Expiry Date & Time *</label>
                  <input
                    type="datetime-local"
                    id="expiryTime"
                    value={formData.expiryTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* SECTION: PICKUP DETAILS */}
              <div style={{ margin: '25px 0 15px 0', borderBottom: '2px solid #FFE082', paddingBottom: '8px' }}>
                <h3 style={{ color: '#C88700', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fa-solid fa-location-dot"></i> Pickup Information
                </h3>
              </div>

              <div className="form-group">
                <label htmlFor="pickupAddress">Pickup Address *</label>
                <textarea
                  id="pickupAddress"
                  rows="3"
                  placeholder="Enter full pickup address"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="specialInstructions">Special Pickup Instructions (Optional)</label>
                <textarea
                  id="specialInstructions"
                  rows="3"
                  placeholder="e.g. Collect from backdoor kitchen entrance, ask for Manager Suresh"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-hand-holding-heart'}`}></i>
                {loading ? 'Publishing Donation...' : 'Submit Food Donation'}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
