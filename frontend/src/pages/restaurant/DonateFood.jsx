import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantSidebar from '../../components/RestaurantSidebar';
import donationService from '../../services/donationService';
import '../../assets/css/restaurant/donate-food.css';

export default function DonateFood() {
  const [restaurantName, setRestaurantName] = useState('Restaurant Name');
  const [formData, setFormData] = useState({
    foodName: '',
    foodType: '',
    quantity: '',
    approxMeals: '',
    preparedTime: '',
    expiryTime: '',
    pickupAddress: '',
    specialInstructions: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('restaurantName');
    if (name) {
      setRestaurantName(name);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const restaurantId = Number(localStorage.getItem('restaurantId'));
    if (!restaurantId) {
      alert('Restaurant session not found. Please log in.');
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
      alert('Food Donation Added Successfully!');
      navigate('/restaurant-dashboard');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to submit donation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="restaurant-donate">
      <RestaurantSidebar />

      <main className="content">
        <header className="page-header">
          <div>
            <h1>Donate Food</h1>
            <p>Fill in the donation details below.</p>
          </div>
        </header>

        <div className="donation-layout">
          {/* LEFT PANEL */}
          <section className="info-card">
            <div className="restaurant-icon">
              <i className="fa-solid fa-store"></i>
            </div>
            <h2 id="restaurantName">{restaurantName}</h2>
            <p>
              Help reduce food waste and support NGOs
              by donating your surplus food.
            </p>

            <div className="tips">
              <h3>Donation Tips</h3>
              <ul>
                <li>Fresh food only</li>
                <li>Pack food hygienically</li>
                <li>Mention exact quantity</li>
                <li>Provide correct pickup address</li>
                <li>Set accurate expiry time</li>
              </ul>
            </div>
          </section>

          {/* FORM */}
          <section className="form-card">
            <form id="donationForm" onSubmit={handleSubmit}>
              {/* Food Name */}
              <div className="form-group">
                <label>Food Name</label>
                <input
                  type="text"
                  id="foodName"
                  placeholder="Enter Food Name"
                  value={formData.foodName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Food Type */}
              <div className="form-group">
                <label>Food Type</label>
                <select
                  id="foodType"
                  value={formData.foodType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Food Type</option>
                  <option value="VEG">Vegetarian</option>
                  <option value="NON_VEG">Non Vegetarian</option>
                  <option value="VEGAN">Vegan</option>
                </select>
              </div>

              {/* Quantity */}
              <div className="form-row">
                <div className="form-group">
                  <label>Quantity (Kg)</label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Approx Meals</label>
                  <input
                    type="number"
                    id="approxMeals"
                    min="1"
                    value={formData.approxMeals}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Prepared Time */}
              <div className="form-row">
                <div className="form-group">
                  <label>Prepared Time</label>
                  <input
                    type="datetime-local"
                    id="preparedTime"
                    value={formData.preparedTime}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Expiry Time</label>
                  <input
                    type="datetime-local"
                    id="expiryTime"
                    value={formData.expiryTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Pickup Address */}
              <div className="form-group">
                <label>Pickup Address</label>
                <textarea
                  id="pickupAddress"
                  rows="4"
                  placeholder="Pickup Address"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Image */}
              <div className="form-group">
                <label>Food Image</label>
                <input type="file" id="foodImage" accept="image/*" />
              </div>

              {/* Instructions */}
              <div className="form-group">
                <label>Special Instructions</label>
                <textarea
                  id="specialInstructions"
                  rows="4"
                  placeholder="Any additional instructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Button */}
              <button type="submit" className="submit-btn" disabled={loading}>
                <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-hand-holding-heart'}`}></i>
                {loading ? 'Submitting...' : 'Donate Food'}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
