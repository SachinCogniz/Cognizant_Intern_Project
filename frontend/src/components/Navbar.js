// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // Get the role from localStorage

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Remove role on logout
    localStorage.removeItem('patientId'); // Remove patient-specific data on logout
    localStorage.removeItem('patientName');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">Wellness System</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token && ( // Show general dashboard link for all authenticated users
              <li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
            )}

            {token && role === 'ROLE_ADMIN' && ( // Show these links only for ADMIN
              <>
                <li className="nav-item"><Link className="nav-link" to="/patients">Patients</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/add-patient">Add Patient</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/plans">Plans</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/progress">Progress</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/notifications">Notifications</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/reports">Reports</Link></li>
              </>
            )}
            {token && role === 'ROLE_USER' && ( // Show relevant links for PATIENT
              <>
                {/* You might want specific patient-facing links here, e.g., to view their own progress, plans, and notifications */}
                <li className="nav-item"><Link className="nav-link" to="/patient-dashboard">My Dashboard</Link></li> {/* Example for patient's personal dashboard */}
                {/* Or links to specific patient-accessible views like: */}
                {/* <li className="nav-item"><Link className="nav-link" to="/my-plans">My Plans</Link></li> */}
                {/* <li className="nav-item"><Link className="nav-link" to="/my-progress">My Progress</Link></li> */}
                {/* <li className="nav-item"><Link className="nav-link" to="/my-notifications">My Notifications</Link></li> */}
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {!token ? (
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            ) : (
              <li className="nav-item"><button className="btn btn-outline-light" onClick={handleLogout}>Logout</button></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;