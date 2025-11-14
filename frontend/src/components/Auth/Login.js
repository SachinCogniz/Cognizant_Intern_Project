// src/components/Auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/api';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      
      if (res.data.role === 'ROLE_USER') {
        localStorage.setItem('patientId', res.data.patientId); 
        localStorage.setItem('patientName', res.data.patientName);
      }

      toast.success('Login successful!');
      // Navigate based on role
      if (res.data.role === 'ROLE_USER') {
        navigate('/patient-dashboard'); // New route for patients
      } else {
        navigate('/'); // Existing dashboard for admins
      }
    } catch {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="card p-4 col-md-6 mx-auto mt-4 shadow">
      <h3 className="text-center mb-3">Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
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
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;