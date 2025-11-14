// src/components/Patient/PatientDashboard.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

function PatientDashboard() {
  const patientName = localStorage.getItem('patientName');
  const patientId = localStorage.getItem('patientId');

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="card shadow p-5 text-center" style={{ maxWidth: '500px' }}>
        <h2 className="mb-3">👋 Welcome !</h2>
    
        <p className="text-muted mb-4">Explore your personalized wellness journey:</p>

        <div className="d-grid gap-3"> {/* Using d-grid for buttons, Bootstrap 5 */}
          <Link to="/plans" className="btn btn-primary btn-lg">
            My Wellness Plans
          </Link>
          <Link to="/progress" className="btn btn-info btn-lg">
            Track My Progress
          </Link>
          <Link to="/notifications" className="btn btn-warning btn-lg">
            View Notifications
          </Link>
          {/* You can add more links here as needed, e.g., to profile, reports */}
          {/* <Link to="/patient-profile" className="btn btn-secondary btn-lg">
            My Profile
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;