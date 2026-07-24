import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NgoSidebar from '../../components/NgoSidebar';
import donationService from '../../services/donationService';
import '../../assets/css/ngo/donation-details.css';

export default function DonationDetails() {
  const [searchParams] = useSearchParams();
  const [donation, setDonation] = useState(null);

  useEffect(() => {
    const donationId = searchParams.get('donationId');
    if (donationId) {
      loadDetails(donationId);
    }
  }, [searchParams]);

  const loadDetails = async (id) => {
    try {
      const data = await donationService.getDonationById(id);
      setDonation(data);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleString();
  };

  return (
    <div className="ngo-dashboard-container">
      <NgoSidebar />

      <main className="main-content">
        <div className="topbar">
          <h1>
            <i className="fa-solid fa-circle-info"></i> Donation Details
          </h1>
        </div>

        <div className="details-card">
          <div className="icon">
            <i className="fa-solid fa-box-open"></i>
          </div>

          <h2 id="foodName">{donation?.foodName || 'Food Name'}</h2>

          <div className="details">
            <p>
              <b>Restaurant:</b> <span id="restaurantName">{donation?.restaurantName || '-'}</span>
            </p>

            <p>
              <b>Food Type:</b> <span id="foodType">{donation?.foodType || '-'}</span>
            </p>

            <p>
              <b>Quantity:</b> <span id="quantity">{donation?.quantity ? `${donation.quantity} Kg` : '-'}</span>
            </p>

            <p>
              <b>Approx Meals:</b> <span id="meals">{donation?.approxMeals || '-'}</span>
            </p>

            <p>
              <b>Status:</b> <span id="status">{donation?.status || '-'}</span>
            </p>

            <p>
              <b>Pickup Address:</b> <span id="address">{donation?.pickupAddress || '-'}</span>
            </p>

            <p>
              <b>Expiry Time:</b> <span id="expiry">{formatDate(donation?.expiryTime)}</span>
            </p>

            <p>
              <b>Instructions:</b> <span id="instructions">{donation?.specialInstructions || 'None'}</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
