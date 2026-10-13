import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import Toast from '../../components/Toast';
import adminService from '../../services/adminService';
import '../../assets/css/admin/ngos.css';

export default function AdminNgos() {
  const [ngos, setNgos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });
  
  // Modals
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null); // { action: 'approve'|'block'|'unblock'|'reject', ngo }

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('role') !== 'ADMIN') {
      navigate('/login');
      return;
    }
    loadNgos();
  }, []);

  useEffect(() => {
    filterData();
  }, [ngos, search, statusFilter]);

  const loadNgos = async () => {
    setLoading(true);
    try {
      const data = await adminService.getNgos();
      setNgos(data || []);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to load NGO accounts.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    let temp = [...ngos];

    if (statusFilter !== 'ALL') {
      temp = temp.filter((n) => n.status === statusFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      temp = temp.filter(
        (n) =>
          n.ngoName?.toLowerCase().includes(q) ||
          n.ownerName?.toLowerCase().includes(q) ||
          n.city?.toLowerCase().includes(q) ||
          n.phone?.includes(q) ||
          n.registrationNumber?.toLowerCase().includes(q)
      );
    }

    setFiltered(temp);
  };

  const handleActionExecute = async () => {
    if (!confirmModal) return;
    const { action, ngo } = confirmModal;
    const id = ngo.ngoId;

    try {
      if (action === 'approve') {
        await adminService.approveNgo(id);
        setToast({ message: `NGO '${ngo.ngoName}' APPROVED!`, type: 'success' });
      } else if (action === 'reject') {
        await adminService.rejectNgo(id);
        setToast({ message: `NGO '${ngo.ngoName}' REJECTED!`, type: 'info' });
      } else if (action === 'block') {
        await adminService.blockNgo(id);
        setToast({ message: `NGO '${ngo.ngoName}' BLOCKED!`, type: 'warning' });
      } else if (action === 'unblock') {
        await adminService.unblockNgo(id);
        setToast({ message: `NGO '${ngo.ngoName}' UNBLOCKED!`, type: 'success' });
      }
      setConfirmModal(null);
      loadNgos();
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to perform NGO action.', type: 'error' });
    }
  };

  const getStatusBadge = (status) => {
    const st = (status || '').toUpperCase();
    switch (st) {
      case 'APPROVED':
      case 'ACTIVE':
        return <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}>APPROVED</span>;
      case 'PENDING':
        return <span style={{ background: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}>PENDING</span>;
      case 'BLOCKED':
        return <span style={{ background: '#fef2f2', color: '#991b1b', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}>BLOCKED</span>;
      case 'REJECTED':
        return <span style={{ background: '#f1f5f9', color: '#64748b', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: '700' }}>REJECTED</span>;
      default:
        return <span style={{ padding: '4px 10px', borderRadius: '15px', fontSize: '12px' }}>{st}</span>;
    }
  };

  // Metrics
  const activeCount = ngos.filter((n) => n.status === 'APPROVED' || n.status === 'ACTIVE').length;
  const pendingCount = ngos.filter((n) => n.status === 'PENDING').length;
  const blockedCount = ngos.filter((n) => n.status === 'BLOCKED' || n.status === 'REJECTED').length;

  return (
    <div className="admin-ngos" style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex' }}>
      <AdminSidebar />
      <Toast toast={toast} onClose={() => setToast({ message: '', type: '' })} />

      <main className="main-content" style={{ flex: 1, marginLeft: '260px', padding: '30px' }}>
        <header className="topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: '#0f172a', fontWeight: '800', margin: 0 }}>
              <i className="fa-solid fa-hand-holding-heart" style={{ color: '#059669' }}></i> NGO Management
            </h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Review, approve, block, or manage registered NGO accounts.</p>
          </div>
        </header>

        {/* METRICS CARDS */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Total NGOs</h3>
                <h2 style={{ fontSize: '28px', color: '#0f172a', margin: '4px 0 0 0' }}>{ngos.length}</h2>
              </div>
              <i className="fa-solid fa-building" style={{ fontSize: '24px', color: '#059669', background: '#dcfce7', padding: '12px', borderRadius: '50%' }}></i>
            </div>
          </div>

          <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Approved / Active</h3>
                <h2 style={{ fontSize: '28px', color: '#16a34a', margin: '4px 0 0 0' }}>{activeCount}</h2>
              </div>
              <i className="fa-solid fa-circle-check" style={{ fontSize: '24px', color: '#16a34a', background: '#dcfce7', padding: '12px', borderRadius: '50%' }}></i>
            </div>
          </div>

          <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Pending Approval</h3>
                <h2 style={{ fontSize: '28px', color: '#d97706', margin: '4px 0 0 0' }}>{pendingCount}</h2>
              </div>
              <i className="fa-solid fa-hourglass-half" style={{ fontSize: '24px', color: '#d97706', background: '#fef3c7', padding: '12px', borderRadius: '50%' }}></i>
            </div>
          </div>

          <div className="card" style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Blocked / Rejected</h3>
                <h2 style={{ fontSize: '28px', color: '#dc2626', margin: '4px 0 0 0' }}>{blockedCount}</h2>
              </div>
              <i className="fa-solid fa-ban" style={{ fontSize: '24px', color: '#dc2626', background: '#fef2f2', padding: '12px', borderRadius: '50%' }}></i>
            </div>
          </div>
        </section>

        {/* TOOLBAR */}
        <section style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '25px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search NGO, Representative, Phone, City, Registration No..."
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
            <option value="APPROVED">Approved</option>
            <option value="PENDING">Pending Approval</option>
            <option value="BLOCKED">Blocked</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </section>

        {/* NGO TABLE */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '32px', color: '#059669' }}></i>
            <p style={{ marginTop: '10px', color: '#64748B' }}>Loading NGO accounts...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <h3>No NGOs Found</h3>
            <p style={{ color: '#64748b' }}>No NGO accounts matching your filter.</p>
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', textTransform: 'uppercase', fontSize: '13px', color: '#475569' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>NGO Name</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Representative / Owner</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Phone</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>City</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Registration No</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((n) => (
                  <tr key={n.ngoId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px' }}><strong>{n.ngoName}</strong></td>
                    <td style={{ padding: '14px 16px' }}>{n.ownerName}</td>
                    <td style={{ padding: '14px 16px' }}>{n.phone}</td>
                    <td style={{ padding: '14px 16px' }}>{n.city}</td>
                    <td style={{ padding: '14px 16px' }}>{n.registrationNumber || '-'}</td>
                    <td style={{ padding: '14px 16px' }}>{getStatusBadge(n.status)}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => setSelectedNgo(n)}
                          style={{ background: '#cbd5e1', color: '#334155', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}
                        >
                          <i className="fa-solid fa-eye"></i> Details
                        </button>

                        {n.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => setConfirmModal({ action: 'approve', ngo: n })}
                              style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => setConfirmModal({ action: 'reject', ngo: n })}
                              style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {n.status !== 'BLOCKED' && n.status !== 'PENDING' && (
                          <button
                            onClick={() => setConfirmModal({ action: 'block', ngo: n })}
                            style={{ background: '#ea580c', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}
                          >
                            Block
                          </button>
                        )}

                        {n.status === 'BLOCKED' && (
                          <button
                            onClick={() => setConfirmModal({ action: 'unblock', ngo: n })}
                            style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}
                          >
                            Unblock
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

      {/* DETAILS MODAL */}
      {selectedNgo && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', maxWidth: '500px', width: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
              <h2 style={{ fontSize: '20px', color: '#0f172a', margin: 0 }}>{selectedNgo.ngoName} Details</h2>
              <span style={{ cursor: 'pointer', fontSize: '24px', color: '#94a3b8' }} onClick={() => setSelectedNgo(null)}>&times;</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: '#f8fafc', padding: '15px', borderRadius: '12px', marginBottom: '20px' }}>
              <p style={{ margin: 0 }}><strong>Representative:</strong> {selectedNgo.ownerName}</p>
              <p style={{ margin: 0 }}><strong>Phone:</strong> {selectedNgo.phone}</p>
              <p style={{ margin: 0 }}><strong>City:</strong> {selectedNgo.city}</p>
              <p style={{ margin: 0 }}><strong>Registration No:</strong> {selectedNgo.registrationNumber || '-'}</p>
              <p style={{ margin: 0 }}><strong>Status:</strong> {selectedNgo.status}</p>
            </div>

            <button onClick={() => setSelectedNgo(null)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* CONFIRMATION DIALOG MODAL */}
      {confirmModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', maxWidth: '450px', width: '90%', textAlign: 'center' }}>
            <i className="fa-solid fa-circle-exclamation" style={{ fontSize: '42px', color: '#d97706', marginBottom: '15px' }}></i>
            <h2 style={{ fontSize: '20px', color: '#1e293b', margin: '0 0 10px 0', textTransform: 'capitalize' }}>
              Confirm {confirmModal.action} NGO
            </h2>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>
              Are you sure you want to <strong>{confirmModal.action}</strong> {confirmModal.ngo.ngoName}?
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setConfirmModal(null)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={handleActionExecute} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: confirmModal.action === 'approve' ? '#16a34a' : '#dc2626', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
                Yes, {confirmModal.action}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
