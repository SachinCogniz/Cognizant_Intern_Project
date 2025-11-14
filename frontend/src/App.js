// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PatientProfile from './components/Patient/PatientProfile';
import AddPatient from './components/Patient/AddPatient';
import WellnessPlans from './components/Plans/WellnessPlans';
import ProgressTracker from './components/Progress/ProgressTracker';
import Notifications from './components/Notifications/Notifications';
import Reports from './components/Reports/Reports';
import Navbar from './components/Navbar';
import PatientDashboard from './components/Patient/PatientDashboard';
import AuthPage from './components/Auth/AuthPage'; // Import the new AuthPage
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <Router>
      {/* Conditionally render Navbar only if authenticated */}
      {token && <Navbar />} 
      <div className="container mt-3">
        <Routes>
          {/* Default route: if token exists, go to Dashboard, otherwise go to AuthPage */}
          <Route path="/" element={token ? <Dashboard /> : <Navigate to="/auth" />} />

          {/* New combined Auth Page route */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Redirect old login/register routes to the new auth route */}
          <Route path="/login" element={<Navigate to="/auth" replace />} />
          <Route path="/register" element={<Navigate to="/auth" replace />} />

          {/* Protected Routes - only accessible if authenticated */}
          <Route path="/patients" element={token ? <PatientProfile /> : <Navigate to="/auth" />} />
          <Route path="/add-patient" element={token ? <AddPatient /> : <Navigate to="/auth" />} />
          <Route path="/plans" element={token ? <WellnessPlans /> : <Navigate to="/auth" />} />
          <Route path="/progress" element={token ? <ProgressTracker /> : <Navigate to="/auth" />} />
          <Route path="/notifications" element={token ? <Notifications /> : <Navigate to="/auth" />} />
          <Route path="/reports" element={token ? <Reports /> : <Navigate to="/auth" />} />

          {/* Patient-specific dashboard, accessible only if token exists AND role is ROLE_USER */}
          <Route 
            path="/patient-dashboard" 
            element={token && role === 'ROLE_USER' ? <PatientDashboard /> : <Navigate to="/auth" />} 
          />

          {/* Fallback for any unmatched routes: if authenticated, go to Dashboard, else AuthPage */}
          <Route path="*" element={token ? <Dashboard /> : <Navigate to="/auth" />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;