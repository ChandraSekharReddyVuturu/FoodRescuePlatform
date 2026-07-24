import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import adminService from '../../services/adminService';
import '../../assets/css/admin/reports.css';

export default function AdminReports() {
  const [reportData, setReportData] = useState({
    totalDonations: 0,
    completedDonations: 0,
    pendingDonations: 0,
    expiredDonations: 0,
    totalRestaurants: 0,
    totalNgos: 0,
    totalVolunteers: 0,
  });

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await adminService.getReports();
      if (data) {
        setReportData({
          totalDonations: data.totalDonations || 0,
          completedDonations: data.completedDonations || 0,
          pendingDonations: data.pendingDonations || 0,
          expiredDonations: data.expiredDonations || 0,
          totalRestaurants: data.totalRestaurants || 0,
          totalNgos: data.totalNgos || 0,
          totalVolunteers: data.totalVolunteers || 0,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const completionRate =
    reportData.totalDonations > 0
      ? ((reportData.completedDonations / reportData.totalDonations) * 100).toFixed(1) + '%'
      : '0%';

  return (
    <div className="admin-reports">
      <div className="dashboard-container">
        <AdminSidebar />

        <main className="main-content">
          <div className="topbar">
            <div>
              <h1>
                <i className="fa-solid fa-chart-pie"></i> Reports
              </h1>
              <p>Platform analytics and food rescue statistics.</p>
            </div>
            <div className="profile-icon">
              <i className="fa-solid fa-user-shield"></i>
            </div>
          </div>

          {/* FIRST ROW REPORT CARDS */}
          <div className="cards-container">
            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-box"></i>
              </div>
              <h3>Total Donations</h3>
              <h2 id="totalDonations">{reportData.totalDonations}</h2>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h3>Completed Donations</h3>
              <h2 id="completedDonations">{reportData.completedDonations}</h2>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <h3>Pending Donations</h3>
              <h2 id="pendingDonations">{reportData.pendingDonations}</h2>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <h3>Expired Donations</h3>
              <h2 id="expiredDonations">{reportData.expiredDonations}</h2>
            </div>
          </div>

          {/* SECOND ROW REPORT CARDS */}
          <div className="cards-container second-row">
            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-utensils"></i>
              </div>
              <h3>Restaurants</h3>
              <h2 id="totalRestaurants">{reportData.totalRestaurants}</h2>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-hand-holding-heart"></i>
              </div>
              <h3>NGOs</h3>
              <h2 id="totalNgos">{reportData.totalNgos}</h2>
            </div>

            <div className="card">
              <div className="card-icon">
                <i className="fa-solid fa-person-circle-check"></i>
              </div>
              <h3>Volunteers</h3>
              <h2 id="totalVolunteers">{reportData.totalVolunteers}</h2>
            </div>
          </div>

          {/* PLATFORM SUMMARY */}
          <div className="section-card">
            <div className="section-header">
              <h2>
                <i className="fa-solid fa-chart-column"></i> Platform Summary
              </h2>
              <p>Overall performance of the food rescue system.</p>
            </div>

            <div className="report-box">
              <div>
                <h3>Donation Completion Rate</h3>
                <p id="completionRate">{completionRate}</p>
              </div>

              <div>
                <h3>Food Distribution Status</h3>
                <p id="distributionStatus">
                  {reportData.totalDonations > 0
                    ? `${reportData.completedDonations} out of ${reportData.totalDonations} donations successfully delivered.`
                    : 'No data available'}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
