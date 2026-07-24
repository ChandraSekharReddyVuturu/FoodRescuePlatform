import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RestaurantSidebar from '../../components/RestaurantSidebar';
import donationService from '../../services/donationService';
import '../../assets/css/restaurant/requests.css';

export default function RestaurantRequests() {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals
  const [viewDonation, setViewDonation] = useState(null);
  const [editDonation, setEditDonation] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadDonations();
  }, []);

  useEffect(() => {
    filterData();
  }, [donations, search, statusFilter]);

  const loadDonations = async () => {
    const restaurantId = localStorage.getItem('restaurantId');
    if (!restaurantId) return;

    try {
      const data = await donationService.getRestaurantDonations(restaurantId);
      setDonations(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const filterData = () => {
    let temp = [...donations];

    if (statusFilter !== 'ALL') {
      temp = temp.filter((d) => d.status === statusFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      temp = temp.filter((d) => d.foodName?.toLowerCase().includes(q));
    }

    setFilteredDonations(temp);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editDonation) return;

    try {
      await donationService.updateDonation(editDonation.donationId, editDonation);
      alert('Donation Updated Successfully');
      setEditDonation(null);
      loadDonations();
    } catch (err) {
      console.error(err);
      alert('Failed to update donation.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await donationService.deleteDonation(deleteId);
      alert('Donation deleted successfully');
      setDeleteId(null);
      loadDonations();
    } catch (err) {
      console.error(err);
      alert('Failed to delete donation.');
    }
  };

  const totalDonations = donations.length;
  const availableDonations = donations.filter((d) => d.status === 'AVAILABLE').length;
  const acceptedDonations = donations.filter((d) => d.status === 'ACCEPTED').length;
  const completedDonations = donations.filter((d) => d.status === 'COMPLETED').length;

  return (
    <div className="restaurant-manage">
      <RestaurantSidebar />

      <main className="content">
        <header className="page-header">
          <div>
            <h1>Manage Donations</h1>
            <p>View, edit and manage all your food donations.</p>
          </div>
          <Link to="/donate-food" className="add-btn">
            <i className="fa-solid fa-plus"></i> New Donation
          </Link>
        </header>

        {/* Stats */}
        <div className="stats">
          <div className="stat-card">
            <h3>{totalDonations}</h3>
            <p>Total Donations</p>
          </div>
          <div className="stat-card">
            <h3>{availableDonations}</h3>
            <p>Available</p>
          </div>
          <div className="stat-card">
            <h3>{acceptedDonations}</h3>
            <p>Accepted</p>
          </div>
          <div className="stat-card">
            <h3>{completedDonations}</h3>
            <p>Completed</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <input
            type="text"
            placeholder="Search donation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="AVAILABLE">Available</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="COMPLETED">Completed</option>
            <option value="EXPIRED">Expired</option>
          </select>
        </div>

        {/* Table */}
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Food</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Meals</th>
                <th>Status</th>
                <th>NGO Requests</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                    No Donations Found
                  </td>
                </tr>
              ) : (
                filteredDonations.map((d) => (
                  <tr key={d.donationId}>
                    <td>{d.foodName}</td>
                    <td>{d.foodType}</td>
                    <td>{d.quantity} Kg</td>
                    <td>{d.approxMeals}</td>
                    <td>
                      <span className={`status ${d.status ? d.status.toLowerCase() : ''}`}>
                        {d.status}
                      </span>
                    </td>
                    <td>{d.ngoName || 'None'}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="action-btn view-btn"
                          onClick={() => setViewDonation(d)}
                          title="View"
                        >
                          <i className="fa-solid fa-eye"></i>
                        </button>
                        <button
                          className="action-btn edit-btn"
                          onClick={() => setEditDonation({ ...d })}
                          title="Edit"
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => setDeleteId(d.donationId)}
                          title="Delete"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* VIEW MODAL */}
      {viewDonation && (
        <div className="modal active" id="viewModal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Donation Details</h2>
              <span className="close" onClick={() => setViewDonation(null)}>
                &times;
              </span>
            </div>
            <div>
              <p><strong>Food:</strong> {viewDonation.foodName}</p>
              <p><strong>Type:</strong> {viewDonation.foodType}</p>
              <p><strong>Quantity:</strong> {viewDonation.quantity} Kg ({viewDonation.approxMeals} meals)</p>
              <p><strong>Status:</strong> {viewDonation.status}</p>
              <p><strong>Pickup Address:</strong> {viewDonation.pickupAddress}</p>
              <p><strong>Instructions:</strong> {viewDonation.specialInstructions || 'None'}</p>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editDonation && (
        <div className="modal active" id="editModal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit Donation</h2>
              <span className="close" onClick={() => setEditDonation(null)}>
                &times;
              </span>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Quantity (Kg)</label>
                <input
                  type="number"
                  value={editDonation.quantity}
                  onChange={(e) => setEditDonation({ ...editDonation, quantity: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Pickup Address</label>
                <textarea
                  value={editDonation.pickupAddress}
                  onChange={(e) => setEditDonation({ ...editDonation, pickupAddress: e.target.value })}
                ></textarea>
              </div>

              <div className="form-group">
                <label>Special Instructions</label>
                <textarea
                  value={editDonation.specialInstructions || ''}
                  onChange={(e) => setEditDonation({ ...editDonation, specialInstructions: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="modal active" id="deleteModal" style={{ display: 'flex' }}>
          <div className="modal-content delete-box">
            <i className="fa-solid fa-trash"></i>
            <h2>Delete Donation?</h2>
            <p>This action cannot be undone.</p>
            <div className="buttons">
              <button id="cancelDelete" onClick={() => setDeleteId(null)}>
                Cancel
              </button>
              <button id="confirmDelete" onClick={handleDeleteConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
