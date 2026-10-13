import React, { useState, useEffect } from 'react';
import VolunteerSidebar from '../../components/VolunteerSidebar';
import Toast from '../../components/Toast';
import donationService from '../../services/donationService';
import api from '../../services/api';
import '../../assets/css/volunteer/pickups.css';

export default function VolunteerPickups() {
  const [pickups, setPickups] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });
  
  // Modals
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [deliverProofModal, setDeliverProofModal] = useState(null); // donation item
  const [proofFile, setProofFile] = useState(null);
  const [uploadingProof, setUploadingProof] = useState(false);

  useEffect(() => {
    loadPickups();
  }, []);

  useEffect(() => {
    filterData();
  }, [pickups, statusFilter, search]);

  const loadPickups = async () => {
    const volunteerId = localStorage.getItem('volunteerId');
    if (!volunteerId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = await donationService.getVolunteerDonations(volunteerId);
      setPickups(data || []);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to load assigned pickups.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    let temp = [...pickups];

    if (statusFilter !== 'ALL') {
      if (statusFilter === 'ACTIVE') {
        temp = temp.filter((d) => d.status === 'ASSIGNED' || d.status === 'PICKED_UP' || d.status === 'PICKED');
      } else {
        temp = temp.filter((d) => d.status === statusFilter);
      }
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      temp = temp.filter(
        (d) =>
          d.foodName?.toLowerCase().includes(q) ||
          d.restaurantName?.toLowerCase().includes(q) ||
          d.ngoName?.toLowerCase().includes(q) ||
          d.pickupAddress?.toLowerCase().includes(q)
      );
    }

    setFiltered(temp);
  };

  const handlePickup = async (donationId) => {
    try {
      await donationService.pickupDonation(donationId);
      setToast({ message: 'Food item picked up from restaurant!', type: 'success' });
      loadPickups();
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to mark picked up.', type: 'error' });
    }
  };

  const handleDeliverSubmit = async (e) => {
    e.preventDefault();
    if (!deliverProofModal) return;

    setUploadingProof(true);
    try {
      let imageUrl = deliverProofModal.foodImage || '';

      // Upload delivery proof if file selected
      if (proofFile) {
        const formData = new FormData();
        formData.append('file', proofFile);
        const res = await api.post('/api/upload/image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        imageUrl = res.data;
      }

      // Update donation status to DELIVERED & save proof image if present
      await donationService.deliverDonation(deliverProofModal.donationId);

      if (imageUrl && imageUrl !== deliverProofModal.foodImage) {
        await donationService.updateDonation(deliverProofModal.donationId, {
          ...deliverProofModal,
          foodImage: imageUrl,
        });
      }

      setToast({ message: 'Delivery confirmed & proof updated successfully!', type: 'success' });
      setDeliverProofModal(null);
      setProofFile(null);
      loadPickups();
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to confirm delivery.', type: 'error' });
    } finally {
      setUploadingProof(false);
    }
  };

  const handleComplete = async (donationId) => {
    try {
      await donationService.completeDonation(donationId);
      setToast({ message: 'Pickup & delivery lifecycle completed!', type: 'success' });
      loadPickups();
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to complete delivery.', type: 'error' });
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

  const getStatusBadge = (status) => {
    const st = (status || '').toUpperCase();
    switch (st) {
      case 'ASSIGNED':
        return <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}><i className="fa-solid fa-user-check"></i> ASSIGNED</span>;
      case 'PICKED':
      case 'PICKED_UP':
        return <span style={{ background: '#f3e8ff', color: '#7e22ce', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}><i className="fa-solid fa-truck"></i> IN TRANSIT</span>;
      case 'DELIVERED':
        return <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}><i className="fa-solid fa-house-circle-check"></i> DELIVERED</span>;
      case 'COMPLETED':
        return <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}><i className="fa-solid fa-circle-check"></i> COMPLETED</span>;
      default:
        return <span style={{ padding: '4px 10px', borderRadius: '15px', fontSize: '12px' }}>{st}</span>;
    }
  };

  const renderTimeline = (item) => {
    if (!item) return null;
    const st = (item.status || '').toUpperCase();

    const steps = [
      { label: 'Assigned', done: true, icon: 'fa-user-check' },
      { label: 'Picked Up', done: st === 'PICKED_UP' || st === 'PICKED' || st === 'DELIVERED' || st === 'COMPLETED', icon: 'fa-truck-pickup' },
      { label: 'Delivered', done: st === 'DELIVERED' || st === 'COMPLETED', icon: 'fa-house-circle-check' },
      { label: 'Completed', done: st === 'COMPLETED', icon: 'fa-circle-check' },
    ];

    return (
      <div style={{ margin: '20px 0', background: '#f8fafc', padding: '15px', borderRadius: '12px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#0284c7' }}><i className="fa-solid fa-route"></i> Delivery Journey Timeline</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {steps.map((step, idx) => (
            <div key={idx} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: step.done ? '#0284c7' : '#cbd5e1',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 6px auto',
                fontSize: '14px',
              }}>
                <i className={`fa-solid ${step.icon}`}></i>
              </div>
              <span style={{ fontSize: '12px', fontWeight: step.done ? '700' : '400', color: step.done ? '#0f172a' : '#94a3b8' }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="volunteer-pickups" style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex' }}>
      <VolunteerSidebar />
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <main className="main-content" style={{ flex: 1, marginLeft: '260px', padding: '30px' }}>
        <header className="topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: '#D89B00', fontWeight: '800', margin: 0 }}>
              <i className="fa-solid fa-truck-ramp-box" style={{ color: '#F4B400' }}></i> Active Food Pickups & Deliveries
            </h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Accept assigned pickups, update status, and confirm successful delivery.</p>
          </div>
        </header>

        {/* TOOLBAR */}
        <section style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '25px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search Restaurant, NGO, or Food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: '240px', padding: '10px 16px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active (Assigned / In Transit)</option>
            <option value="ASSIGNED">Assigned (Ready for Pickup)</option>
            <option value="PICKED_UP">In Transit (Picked Up)</option>
            <option value="DELIVERED">Delivered</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </section>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '32px', color: '#0284c7' }}></i>
            <p style={{ marginTop: '10px', color: '#64748B' }}>Loading pickups...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ background: '#fff', padding: '50px', borderRadius: '16px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <i className="fa-solid fa-truck" style={{ fontSize: '42px', color: '#cbd5e1', marginBottom: '15px' }}></i>
            <h3 style={{ color: '#334155', margin: '0 0 8px 0' }}>No Pickups Found</h3>
            <p style={{ color: '#64748b' }}>No active pickups assigned matching your search criteria.</p>
          </div>
        ) : (
          /* PICKUPS TABLE */
          <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', textTransform: 'uppercase', fontSize: '13px', color: '#475569' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Restaurant (Origin)</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>NGO (Destination)</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Food Item</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Quantity</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr key={d.donationId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px' }}><strong>{d.restaurantName || 'Restaurant'}</strong></td>
                    <td style={{ padding: '14px 16px' }}>{d.ngoName || 'NGO Partner'}</td>
                    <td style={{ padding: '14px 16px' }}>{d.foodName}</td>
                    <td style={{ padding: '14px 16px' }}>{d.quantity} Kg ({d.approxMeals} meals)</td>
                    <td style={{ padding: '14px 16px' }}>{getStatusBadge(d.status)}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => setSelectedPickup(d)}
                          style={{ background: '#e2e8f0', color: '#334155', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
                          title="View Details & Timeline"
                        >
                          <i className="fa-solid fa-eye"></i> Details
                        </button>

                        {d.status === 'ASSIGNED' && (
                          <button
                            onClick={() => handlePickup(d.donationId)}
                            style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '13px' }}
                          >
                            <i className="fa-solid fa-truck-pickup"></i> Mark Picked Up
                          </button>
                        )}

                        {(d.status === 'PICKED' || d.status === 'PICKED_UP') && (
                          <button
                            onClick={() => setDeliverProofModal(d)}
                            style={{ background: '#7e22ce', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '13px' }}
                          >
                            <i className="fa-solid fa-house-circle-check"></i> Confirm Delivery
                          </button>
                        )}

                        {d.status === 'DELIVERED' && (
                          <button
                            onClick={() => handleComplete(d.donationId)}
                            style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '13px' }}
                          >
                            <i className="fa-solid fa-circle-check"></i> Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* DETAILS & TIMELINE MODAL */}
      {selectedPickup && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', maxWidth: '600px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
              <h2 style={{ fontSize: '20px', color: '#0f172a', margin: 0 }}>Pickup Details #{selectedPickup.donationId}</h2>
              <span style={{ cursor: 'pointer', fontSize: '24px', color: '#94a3b8' }} onClick={() => setSelectedPickup(null)}>&times;</span>
            </div>

            {renderTimeline(selectedPickup)}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: '#f8fafc', padding: '15px', borderRadius: '12px', marginBottom: '15px' }}>
              <p style={{ margin: 0 }}><strong>Food Item:</strong> {selectedPickup.foodName}</p>
              <p style={{ margin: 0 }}><strong>Category:</strong> {selectedPickup.foodType}</p>
              <p style={{ margin: 0 }}><strong>Quantity:</strong> {selectedPickup.quantity} Kg</p>
              <p style={{ margin: 0 }}><strong>Meals:</strong> {selectedPickup.approxMeals} meals</p>
              <p style={{ margin: 0 }}><strong>Pickup Time:</strong> {formatDate(selectedPickup.preparedTime)}</p>
              <p style={{ margin: 0 }}><strong>Expiry Time:</strong> {formatDate(selectedPickup.expiryTime)}</p>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <h4 style={{ color: '#0284c7', margin: '0 0 4px 0' }}><i className="fa-solid fa-store"></i> Donor Restaurant & Address</h4>
              <p style={{ background: '#f1f5f9', padding: '10px', borderRadius: '8px', margin: 0, fontSize: '14px' }}>
                <strong>{selectedPickup.restaurantName}:</strong> {selectedPickup.pickupAddress}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#0284c7', margin: '0 0 4px 0' }}><i className="fa-solid fa-hand-holding-heart"></i> Destination NGO Partner</h4>
              <p style={{ background: '#f1f5f9', padding: '10px', borderRadius: '8px', margin: 0, fontSize: '14px' }}>
                <strong>{selectedPickup.ngoName || 'NGO Partner'}</strong>
              </p>
            </div>

            <button onClick={() => setSelectedPickup(null)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* CONFIRM DELIVERY & PROOF MODAL */}
      {deliverProofModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', maxWidth: '500px', width: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
              <h2 style={{ fontSize: '20px', color: '#7e22ce', margin: 0 }}>Confirm Delivery</h2>
              <span style={{ cursor: 'pointer', fontSize: '24px', color: '#94a3b8' }} onClick={() => setDeliverProofModal(null)}>&times;</span>
            </div>

            <form onSubmit={handleDeliverSubmit}>
              <p style={{ color: '#475569', marginBottom: '15px' }}>
                Confirm delivery of <strong>{deliverProofModal.foodName}</strong> to <strong>{deliverProofModal.ngoName || 'NGO Partner'}</strong>.
              </p>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#475569' }}>
                  Upload Proof of Delivery Photo (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProofFile(e.target.files[0])}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Upload via backend `/api/upload/image` service.</p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => setDeliverProofModal(null)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" disabled={uploadingProof} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: '#7e22ce', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
                  {uploadingProof ? 'Uploading & Confirming...' : 'Confirm Delivery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
