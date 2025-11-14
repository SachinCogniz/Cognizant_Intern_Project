// src/components/Auth/Register.js
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // No longer strictly needed for navigation back to login if AuthPage handles it
import axios from '../../services/api';
import { toast } from 'react-toastify';

// Add onRegistrationSuccess prop
function Register({ onRegistrationSuccess }) {
  // const navigate = useNavigate(); // Keep if you might use it for other navigations later
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'ROLE_USER', // Default role for new registrations
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', form);
      toast.success('Registration successful! Please login.');
      // Call the success callback passed from AuthPage
      if (onRegistrationSuccess) {
        onRegistrationSuccess();
      }
      // If AuthPage is not used, you could navigate directly here:
      // else {
      //   navigate('/login');
      // }
    } catch (err) {
      toast.error(err.response?.data || 'Registration failed'); // Show error message
    }
  };

  return (
    <div className="card p-4 col-md-6 mx-auto mt-4 shadow">
      <h3 className="text-center mb-3">Register</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <select
          className="form-select mb-3"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="ROLE_USER">User</option>
          <option value="ROLE_ADMIN">Admin</option>
        </select>
        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}

export default Register;