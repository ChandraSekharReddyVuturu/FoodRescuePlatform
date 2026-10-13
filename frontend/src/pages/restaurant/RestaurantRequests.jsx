import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RestaurantSidebar from '../../components/RestaurantSidebar';
import Toast from '../../components/Toast';
import donationService, { foodRequestService } from '../../services/donationService';
import '../../assets/css/restaurant/requests.css';

export default function RestaurantRequests() {
  const [activeTab, setActiveTab] = useState('donations'); // 'donations' | 'requests'
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });

  // Modals
  const [viewDonation, setViewDonation] = useState(null);
  const [editDonation, setEditDonation] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [rejectRequestId, setRejectRequestId] = useState(null);
  const [viewRequest, setViewRequest] = useState(null);

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    filterDonationData();
  }, [donations, search, statusFilter]);

  useEffect(() => {
    filterRequestData();
  }, [requests, search, statusFilter]);

  const loadAllData = async () => {
    const restaurantId = localStorage.getItem('restaurantId');
    if (!restaurantId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [donationRes, requestRes] = await Promise.all([
        donationService.getRestaurantDonations(restaurantId).catch(() => []),
        foodRequestService.getRequestsByRestaurant(restaurantId).catch(() => []),
      ]);

      setDonations(donationRes || []);
      setRequests(requestRes || []);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to load data.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const filterDonationData = () => {
    let temp = [...donations];

    if (statusFilter !== 'ALL') {
      if (statusFilter === 'ACTIVE') {
        temp = temp.filter((d) => d.status === 'AVAILABLE' || d.status === 'ACCEPTED' || d.status === 'ASSIGNED' || d.status === 'PICKED_UP');
      } else {
        temp = temp.filter((d) => d.status === statusFilter);
      }
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      temp = temp.filter((d) => d.foodName?.toLowerCase().includes(q) || d.pickupAddress?.toLowerCase().includes(q));
    }

    setFilteredDonations(temp);
  };

  const filterRequestData = () => {
    let temp = [...requests];

    if (statusFilter !== 'ALL') {
      temp = temp.filter((r) => (r.requestStatus || r.status) === statusFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      temp = temp.filter((r) => r.ngoName?.toLowerCase().includes(q) || r.foodName?.toLowerCase().includes(q));
    }

    setFilteredRequests(temp);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editDonation) return;

    try {
      await donationService.updateDonation(editDonation.donationId, editDonation);
      setToast({ message: 'Donation details updated successfully!', type: 'success' });
      setEditDonation(null);
      loadAllData();
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to update donation.', type: 'error' });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await donationService.deleteDonation(deleteId);
      setToast({ message: 'Donation deleted successfully!', type: 'success' });
      setDeleteId(null);
      loadAllData();
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to delete donation.', type: 'error' });
    }
  };

  const handleApproveRequest = async (requestId, isExpired) => {
    if (isExpired) {
      setToast({ message: 'This donation has expired and cannot be approved.', type: 'warning' });
      return;
    }

    try {
      await foodRequestService.updateRequestStatus(requestId, 'ACCEPTED');
      setToast({ message: 'NGO Food Request approved!', type: 'success' });
      loadAllData();
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to approve request.', type: 'error' });
    }
  };

  const handleRejectConfirm = async () => {
    if (!rejectRequestId) return;
    try {
      await foodRequestService.updateRequestStatus(rejectRequestId, 'REJECTED');
      setToast({ message: 'NGO Request rejected.', type: 'info' });
      setRejectRequestId(null);
      loadAllData();
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to reject request.', type: 'error' });
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isExpiringSoon = (expiryTime) => {
    if (!expiryTime) return false;
    const diff = new Date(expiryTime) - new Date();
    return diff > 0 && diff < 3 * 3600 * 1000;
  };

  const isExpired = (expiryTime, status) => {
    if (status === 'EXPIRED') return true;
    if (!expiryTime) return false;
    return new Date(expiryTime) <= new Date();
  };

  const getStatusBadge = (status, expiryTime) => {
    const st = (status || '').toUpperCase();
    if (st === 'AVAILABLE' && isExpiringSoon(expiryTime)) {
      return <span className="status warning"><i className="fa-solid fa-clock-rotate-left"></i> EXPIRING SOON</span>;
    }

    switch (st) {
      case 'AVAILABLE':
        return <span className="status accepted"><i className="fa-solid fa-circle-check"></i> AVAILABLE</span>;
      case 'PENDING':
      case 'REQUESTED':
        return <span className="status pending"><i className="fa-solid fa-hourglass"></i> PENDING REQUEST</span>;
      case 'ACCEPTED':
      case 'APPROVED':
        return <span className="status accepted"><i className="fa-solid fa-handshake"></i> APPROVED</span>;
      case 'ASSIGNED':
        return <span className="status info" style={{ background: '#e0f2fe', color: '#0369a1' }}><i className="fa-solid fa-user-check"></i> ASSIGNED</span>;
      case 'PICKED_UP':
        return <span className="status info" style={{ background: '#f3e8ff', color: '#7e22ce' }}><i className="fa-solid fa-truck"></i> PICKED UP</span>;
      case 'DELIVERED':
      case 'COMPLETED':
        return <span className="status completed"><i className="fa-solid fa-circle-check"></i> COMPLETED</span>;
      case 'EXPIRED':
        return <span className="status rejected" style={{ background: '#fef2f2', color: '#991b1b' }}><i className="fa-solid fa-calendar-xmark"></i> EXPIRED</span>;
      case 'REJECTED':
      case 'CANCELLED':
        return <span className="status rejected"><i className="fa-solid fa-ban"></i> REJECTED</span>;
      default:
        return <span className="status">{st}</span>;
    }
  };

  const renderTimeline = (donation) => {
    if (!donation) return null;
    const st = (donation.status || '').toUpperCase();

    const stages = [
      { key: 'CREATED', label: 'Created', done: true, time: donation.createdAt },
      { key: 'REQUESTED', label: 'NGO Requested', done: !!donation.ngoId || st !== 'AVAILABLE', time: donation.acceptedAt },
      { key: 'ACCEPTED', label: 'Approved by Restaurant', done: st === 'ACCEPTED' || st === 'ASSIGNED' || st === 'PICKED_UP' || st === 'DELIVERED' || st === 'COMPLETED', time: donation.acceptedAt },
      { key: 'ASSIGNED', label: 'Volunteer Assigned', done: st === 'ASSIGNED' || st === 'PICKED_UP' || st === 'DELIVERED' || st === 'COMPLETED', time: null },
      { key: 'PICKED_UP', label: 'Picked Up', done: st === 'PICKED_UP' || st === 'DELIVERED' || st === 'COMPLETED', time: donation.pickedUpAt },
      { key: 'COMPLETED', label: 'Delivered & Completed', done: st === 'DELIVERED' || st === 'COMPLETED', time: donation.completedAt || donation.deliveredAt },
    ];

    return (
      <div className="timeline-container" style={{ margin: '20px 0' }}>
        <h4 style={{ marginBottom: '12px', color: '#C88700' }}><i className="fa-solid fa-route"></i> Donation Lifecycle Status</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', padding: '10px 0' }}>
          {stages.map((stage, idx) => (
            <div key={idx} style={{ textAlign: 'center', flex: 1, position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: stage.done ? '#10b981' : '#e2e8f0',
                  color: stage.done ? '#fff' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 6px auto',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              >
                {stage.done ? <i className="fa-solid fa-check"></i> : idx + 1}
              </div>
              <p style={{ fontSize: '12px', fontWeight: stage.done ? '600' : '400', color: stage.done ? '#1e293b' : '#94a3b8' }}>
                {stage.label}
              </p>
              {stage.time && <p style={{ fontSize: '10px', color: '#94a3b8' }}>{formatDate(stage.time)}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="restaurant-manage">
      <RestaurantSidebar />
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <main className="content">
        <header className="page-header">
          <div>
            <h1>Manage Donations & NGO Requests</h1>
            <p>Track your food donations, manage NGO requests, and review pickup lifecycles.</p>
          </div>
          <Link to="/donate-food" className="add-btn">
            <i className="fa-solid fa-plus"></i> New Donation
          </Link>
        </header>

        {/* TABS */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', borderBottom: '2px solid #FFE082', paddingBottom: '10px' }}>
          <button
            onClick={() => setActiveTab('donations')}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '15px',
              background: activeTab === 'donations' ? '#F4B400' : '#FFFFFF',
              color: activeTab === 'donations' ? '#FFFFFF' : '#64748B',
              boxShadow: activeTab === 'donations' ? '0 4px 12px rgba(244,180,0,0.3)' : 'none',
            }}
          >
            <i className="fa-solid fa-bowl-food" style={{ marginRight: '8px' }}></i>
            My Food Donations ({donations.length})
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '15px',
              background: activeTab === 'requests' ? '#F4B400' : '#FFFFFF',
              color: activeTab === 'requests' ? '#FFFFFF' : '#64748B',
              boxShadow: activeTab === 'requests' ? '0 4px 12px rgba(244,180,0,0.3)' : 'none',
            }}
          >
            <i className="fa-solid fa-hand-holding-heart" style={{ marginRight: '8px' }}></i>
            Incoming NGO Requests ({requests.length})
          </button>
        </div>

        {/* TOOLBAR */}
        <div className="toolbar" style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder={activeTab === 'donations' ? 'Search donation name or address...' : 'Search NGO or food name...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: '250px', padding: '10px 15px', borderRadius: '10px', border: '1px solid #FFE082' }}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #FFE082' }}
          >
            <option value="ALL">All Statuses</option>
            {activeTab === 'donations' ? (
              <>
                <option value="ACTIVE">Active (Available / Accepted / Assigned)</option>
                <option value="AVAILABLE">Available</option>
                <option value="ACCEPTED">Approved / Accepted</option>
                <option value="COMPLETED">Completed</option>
                <option value="EXPIRED">Expired</option>
              </>
            ) : (
              <>
                <option value="PENDING">Pending</option>
                <option value="ACCEPTED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </>
            )}
          </select>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '32px', color: '#F4B400' }}></i>
            <p style={{ marginTop: '10px', color: '#64748B' }}>Loading data...</p>
          </div>
        ) : activeTab === 'donations' ? (
          /* TAB 1: DONATIONS LIST */
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Food</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Meals</th>
                  <th>Expiry</th>
                  <th>Status</th>
                  <th>NGO Assigned</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                      No donations found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredDonations.map((d) => {
                    const expired = isExpired(d.expiryTime, d.status);
                    return (
                      <tr key={d.donationId} style={{ opacity: expired && d.status !== 'COMPLETED' ? 0.75 : 1 }}>
                        <td><strong>{d.foodName}</strong></td>
                        <td>{d.foodType}</td>
                        <td>{d.quantity} Kg</td>
                        <td>{d.approxMeals} meals</td>
                        <td>{formatDate(d.expiryTime)}</td>
                        <td>{getStatusBadge(d.status, d.expiryTime)}</td>
                        <td>{d.ngoName || 'None'}</td>
                        <td>
                          <div className="actions" style={{ display: 'flex', gap: '6px' }}>
                            <button
                              className="action-btn view-btn"
                              onClick={() => setViewDonation(d)}
                              title="View Details"
                            >
                              <i className="fa-solid fa-eye"></i>
                            </button>
                            {d.status === 'AVAILABLE' && !expired && (
                              <button
                                className="action-btn edit-btn"
                                onClick={() => setEditDonation({ ...d })}
                                title="Edit"
                              >
                                <i className="fa-solid fa-pen"></i>
                              </button>
                            )}
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
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* TAB 2: NGO REQUESTS LIST */
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>NGO Name</th>
                  <th>Food Requested</th>
                  <th>Meals</th>
                  <th>Request Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                      No NGO requests found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((r) => {
                    const reqStatus = (r.requestStatus || r.status || '').toUpperCase();
                    const relatedDonation = donations.find((d) => d.donationId === r.donationId);
                    const donationExpired = relatedDonation ? isExpired(relatedDonation.expiryTime, relatedDonation.status) : false;

                    return (
                      <tr key={r.requestId}>
                        <td>#{r.requestId}</td>
                        <td><strong>{r.ngoName || 'Partner NGO'}</strong></td>
                        <td>{r.foodName}</td>
                        <td>{r.requiredMeals || '-'} meals</td>
                        <td>{formatDate(r.requestDate)}</td>
                        <td>{getStatusBadge(reqStatus)}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              className="action-btn view-btn"
                              onClick={() => setViewRequest(r)}
                              title="View Request Details"
                            >
                              <i className="fa-solid fa-eye"></i> View
                            </button>

                            {reqStatus === 'PENDING' && (
                              <>
                                <button
                                  onClick={() => handleApproveRequest(r.requestId, donationExpired)}
                                  disabled={donationExpired}
                                  style={{
                                    background: donationExpired ? '#cbd5e1' : '#10b981',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    cursor: donationExpired ? 'not-allowed' : 'pointer',
                                  }}
                                  title={donationExpired ? 'Cannot approve expired donation' : 'Approve Request'}
                                >
                                  <i className="fa-solid fa-check"></i> Approve
                                </button>
                                <button
                                  onClick={() => setRejectRequestId(r.requestId)}
                                  style={{
                                    background: '#ef4444',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                  }}
                                  title="Reject Request"
                                >
                                  <i className="fa-solid fa-xmark"></i> Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* VIEW DONATION DETAILS MODAL */}
      {viewDonation && (
        <div className="modal active" style={{ display: 'flex', zIndex: 1100 }}>
          <div className="modal-content" style={{ maxWidth: '650px', width: '90%' }}>
            <div className="modal-header">
              <h2>Donation Details #{viewDonation.donationId}</h2>
              <span className="close" onClick={() => setViewDonation(null)}>&times;</span>
            </div>
            
            {renderTimeline(viewDonation)}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: '#F8FAFC', padding: '15px', borderRadius: '12px', margin: '15px 0' }}>
              <p><strong>Food Name:</strong> {viewDonation.foodName}</p>
              <p><strong>Food Type:</strong> {viewDonation.foodType}</p>
              <p><strong>Quantity:</strong> {viewDonation.quantity} Kg</p>
              <p><strong>Approx Meals:</strong> {viewDonation.approxMeals} meals</p>
              <p><strong>Prepared Time:</strong> {formatDate(viewDonation.preparedTime)}</p>
              <p><strong>Expiry Time:</strong> {formatDate(viewDonation.expiryTime)}</p>
              <p><strong>Status:</strong> {viewDonation.status}</p>
              <p><strong>Assigned NGO:</strong> {viewDonation.ngoName || 'None'}</p>
            </div>

            <p style={{ marginBottom: '8px' }}><strong>Pickup Address:</strong> {viewDonation.pickupAddress}</p>
            <p><strong>Special Instructions:</strong> {viewDonation.specialInstructions || 'None'}</p>
          </div>
        </div>
      )}

      {/* VIEW REQUEST DETAILS MODAL */}
      {viewRequest && (
        <div className="modal active" style={{ display: 'flex', zIndex: 1100 }}>
          <div className="modal-content" style={{ maxWidth: '500px', width: '90%' }}>
            <div className="modal-header">
              <h2>NGO Request #{viewRequest.requestId}</h2>
              <span className="close" onClick={() => setViewRequest(null)}>&times;</span>
            </div>
            <div style={{ padding: '10px 0' }}>
              <p style={{ marginBottom: '8px' }}><strong>NGO Name:</strong> {viewRequest.ngoName || 'Partner NGO'}</p>
              <p style={{ marginBottom: '8px' }}><strong>Food Requested:</strong> {viewRequest.foodName}</p>
              <p style={{ marginBottom: '8px' }}><strong>Required Meals:</strong> {viewRequest.requiredMeals || '-'} meals</p>
              <p style={{ marginBottom: '8px' }}><strong>Request Date:</strong> {formatDate(viewRequest.requestDate)}</p>
              <p style={{ marginBottom: '8px' }}><strong>Request Status:</strong> {viewRequest.requestStatus || viewRequest.status}</p>
              <p style={{ marginBottom: '8px' }}><strong>NGO Remarks:</strong> {viewRequest.remarks || 'None provided'}</p>
            </div>
          </div>
        </div>
      )}

      {/* EDIT DONATION MODAL */}
      {editDonation && (
        <div className="modal active" style={{ display: 'flex', zIndex: 1100 }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit Food Donation</h2>
              <span className="close" onClick={() => setEditDonation(null)}>&times;</span>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Food Name</label>
                <input
                  type="text"
                  value={editDonation.foodName || ''}
                  onChange={(e) => setEditDonation({ ...editDonation, foodName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Quantity (Kg)</label>
                <input
                  type="number"
                  min="1"
                  value={editDonation.quantity || ''}
                  onChange={(e) => setEditDonation({ ...editDonation, quantity: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Approx Meals</label>
                <input
                  type="number"
                  min="1"
                  value={editDonation.approxMeals || ''}
                  onChange={(e) => setEditDonation({ ...editDonation, approxMeals: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Pickup Address</label>
                <textarea
                  rows="3"
                  value={editDonation.pickupAddress || ''}
                  onChange={(e) => setEditDonation({ ...editDonation, pickupAddress: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Special Instructions</label>
                <textarea
                  rows="3"
                  value={editDonation.specialInstructions || ''}
                  onChange={(e) => setEditDonation({ ...editDonation, specialInstructions: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="save-btn" style={{ width: '100%', padding: '12px', background: '#F4B400', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteId && (
        <div className="modal active" style={{ display: 'flex', zIndex: 1100 }}>
          <div className="modal-content delete-box">
            <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '42px', color: '#ef4444', marginBottom: '15px' }}></i>
            <h2>Delete Food Donation?</h2>
            <p>Are you sure you want to delete this donation? This action cannot be undone.</p>
            <div className="buttons" style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px' }}>
              <button onClick={() => setDeleteId(null)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#ef4444', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECT CONFIRMATION MODAL */}
      {rejectRequestId && (
        <div className="modal active" style={{ display: 'flex', zIndex: 1100 }}>
          <div className="modal-content delete-box">
            <i className="fa-solid fa-circle-xmark" style={{ fontSize: '42px', color: '#f59e0b', marginBottom: '15px' }}></i>
            <h2>Reject NGO Request?</h2>
            <p>Rejecting this request will allow other NGOs to request this donation.</p>
            <div className="buttons" style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px' }}>
              <button onClick={() => setRejectRequestId(null)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={handleRejectConfirm} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#ef4444', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
