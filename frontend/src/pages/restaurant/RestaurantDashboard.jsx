import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RestaurantSidebar from '../../components/RestaurantSidebar';
import donationService, { foodRequestService } from '../../services/donationService';
import '../../assets/css/restaurant/dashboard.css';
import restaurantIcon from '../../assets/images/icons/Restaurant.jpeg';

export default function RestaurantDashboard() {
  const [restaurantName, setRestaurantName] = useState('Restaurant');
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [acceptedRequestsCount, setAcceptedRequestsCount] = useState(0);

  useEffect(() => {
    const name = localStorage.getItem('restaurantName');
    if (name) {
      setRestaurantName(name);
    }

    const restaurantId = localStorage.getItem('restaurantId');
    if (restaurantId) {
      loadDonations(restaurantId);
      loadRequests(restaurantId);
    }
  }, []);

  const loadDonations = async (restaurantId) => {
    try {
      const data = await donationService.getRestaurantDonations(restaurantId);
      setDonations(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadRequests = async (restaurantId) => {
    try {
      const data = await foodRequestService.getAllRequests();
      if (Array.isArray(data)) {
        setRequests(data);
        const accepted = data.filter((r) => r.status === 'ACCEPTED').length;
        setAcceptedRequestsCount(accepted);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  };

  const totalDonations = donations.length;
  const activeDonations = donations.filter((d) => d.status === 'AVAILABLE').length;
  const completedDonations = donations.filter((d) => d.status === 'COMPLETED').length;

  return (
    <div className="restaurant-dashboard">
      <RestaurantSidebar />

      <main className="content">
        <header className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>
              Welcome back, <strong id="restaurantName">{restaurantName}</strong>
            </p>
          </div>
          <div className="top-right">
            <img src={restaurantIcon} alt="Restaurant" />
          </div>
        </header>

        {/* Statistics */}
        <section className="cards">
          <div className="card">
            <i className="fa-solid fa-bowl-food"></i>
            <h2 id="totalDonations">{totalDonations}</h2>
            <p>Total Donations</p>
          </div>

          <div className="card">
            <i className="fa-solid fa-hourglass-half"></i>
            <h2 id="activeDonations">{activeDonations}</h2>
            <p>Active Donations</p>
          </div>

          <div className="card">
            <i className="fa-solid fa-check-circle"></i>
            <h2 id="completedDonations">{completedDonations}</h2>
            <p>Completed</p>
          </div>

          <div className="card">
            <i className="fa-solid fa-handshake"></i>
            <h2 id="acceptedRequests">{acceptedRequestsCount}</h2>
            <p>Accepted Requests</p>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="actions">
          <Link to="/donate-food" className="action">
            <i className="fa-solid fa-plus"></i>
            <span>Donate Food</span>
          </Link>
          <Link to="/requests" className="action">
            <i className="fa-solid fa-list"></i>
            <span>My Donations</span>
          </Link>
          <Link to="/donation-history" className="action">
            <i className="fa-solid fa-clock"></i>
            <span>History</span>
          </Link>
          <Link to="/profile" className="action">
            <i className="fa-solid fa-user"></i>
            <span>Profile</span>
          </Link>
        </section>

        {/* Recent Donations */}
        <section className="table-card">
          <div className="table-header">
            <h2>Recent Donations</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>Food</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody id="donationTable">
              {donations.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty">
                    No Donations Found
                  </td>
                </tr>
              ) : (
                donations.slice(0, 5).map((d) => (
                  <tr key={d.donationId}>
                    <td>{d.foodName}</td>
                    <td>{d.quantity}</td>
                    <td>
                      <span className={`status ${d.status ? d.status.toLowerCase() : ''}`}>
                        {d.status}
                      </span>
                    </td>
                    <td>{formatDate(d.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        {/* Recent NGO Requests */}
        <section className="table-card">
          <div className="table-header">
            <h2>Recent NGO Requests</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>NGO</th>
                <th>Food</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody id="requestTable">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty">
                    No Requests Found
                  </td>
                </tr>
              ) : (
                requests.slice(0, 5).map((r) => (
                  <tr key={r.requestId || r.id}>
                    <td>{r.ngoName}</td>
                    <td>{r.foodName}</td>
                    <td>
                      <span className={`status ${r.status ? r.status.toLowerCase() : ''}`}>
                        {r.status}
                      </span>
                    </td>
                    <td>{formatDate(r.requestDate)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
