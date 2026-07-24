import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import NgoSidebar from '../../components/NgoSidebar';
import donationService from '../../services/donationService';
import volunteerService from '../../services/volunteerService';
import '../../assets/css/ngo/assign-volunteer.css';

export default function AssignVolunteer() {
  const [searchParams] = useSearchParams();
  const [donation, setDonation] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const navigate = useNavigate();

  const donationId = searchParams.get('donationId');

  useEffect(() => {
    if (donationId) {
      loadDonation(donationId);
    }
    loadVolunteers();
  }, [donationId]);

  const loadDonation = async (id) => {
    try {
      const data = await donationService.getDonationById(id);
      setDonation(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadVolunteers = async () => {
    try {
      const data = await volunteerService.getAllVolunteers();
      setVolunteers(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssign = async (volunteerId) => {
    if (!donationId) {
      alert('No donation selected');
      return;
    }

    try {
      await donationService.assignVolunteer(donationId, volunteerId);
      alert('Volunteer assigned successfully');
      navigate('/received-food');
    } catch (err) {
      console.error(err);
      alert('Failed to assign volunteer');
    }
  };

  return (
    <div className="dashboard-container">
      <NgoSidebar />

      <main className="main-content">
        <div className="topbar">
          <div>
            <h1>Assign Volunteer</h1>
            <p>Select an available volunteer for food pickup.</p>
          </div>
          <div className="profile-icon">
            <i className="fa-solid fa-users"></i>
          </div>
        </div>

        {/* DONATION DETAILS CARD */}
        <div className="donation-card">
          <h2>Donation Details</h2>
          <div className="details-grid">
            <p>
              <b>Food:</b> <span id="foodName">{donation?.foodName || '-'}</span>
            </p>
            <p>
              <b>Restaurant:</b> <span id="restaurantName">{donation?.restaurantName || '-'}</span>
            </p>
            <p>
              <b>Quantity:</b> <span id="quantity">{donation?.quantity ? `${donation.quantity} Kg` : '-'}</span>
            </p>
            <p>
              <b>Status:</b> <span id="donationStatus">{donation?.status || '-'}</span>
            </p>
          </div>
        </div>

        {/* AVAILABLE VOLUNTEERS */}
        <div className="volunteer-card">
          <div className="section-header">
            <h2>
              <i className="fa-solid fa-users"></i> Available Volunteers
            </h2>
            <p>Choose a volunteer for this donation pickup.</p>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Volunteer Name</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Availability</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="volunteerTableBody">
                {volunteers.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                      No volunteers available.
                    </td>
                  </tr>
                ) : (
                  volunteers.map((v) => (
                    <tr key={v.volunteerId}>
                      <td>{v.fullName || v.volunteerName}</td>
                      <td>{v.phone}</td>
                      <td>{v.city}</td>
                      <td>{v.availability || v.status || 'AVAILABLE'}</td>
                      <td>
                        <button
                          className="action-btn assign-btn"
                          onClick={() => handleAssign(v.volunteerId)}
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
