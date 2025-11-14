// src/components/Dashboard.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="container mt-5">
      <div className="card text-center"> {/* Added text-center here for consistent alignment */}
        <h2 className="mb-4">Welcome to Patient Wellness Monitoring System</h2>
        <p className="mb-4">Click on My Dashboard to check your Events</p>
        <div className="mt-4">
          <h1 className="get-started-heading">Get Started</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;