import React, { useState, useEffect } from 'react';
import axios from '../../services/api';
import { toast } from 'react-toastify';

function Notifications() {
  const userRole = localStorage.getItem('role');
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState([]);

  const fetchPatients = async () => {
    try {
      const res = await axios.get('/patients');
      setPatients(res.data);
    } catch (error) {
      toast.error('Could not load patients');
    }
  };

  const fetchNotifications = async (id) => {
    if (!id) {
      setNotifications([]);
      return;
    }
    try {
      const res = await axios.get(`/notifications/${id}`);
      setNotifications(res.data);
    } catch (error) {
      toast.error('Could not load notifications');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientId || !message) {
      toast.error('Please select a patient and type a message');
      return;
    }
    try {
      await axios.post(`/notifications/send/${patientId}`, { message });
      toast.success('Notification sent!');
      setMessage('');
      fetchNotifications(patientId);
    } catch (error) {
      toast.error('Send failed');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="card shadow p-4 mt-4">
      <h4 className="text-center mb-4">🔔 Notifications</h4>
      <div className="row mb-4">
        <div className={userRole === 'ROLE_ADMIN' ? 'col-md-4' : 'col-md-12'}>
          <select
            className="form-select"
            value={patientId}
            onChange={(e) => {
              setPatientId(e.target.value);
              fetchNotifications(e.target.value);
            }}
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.patientId} value={p.patientId}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {userRole === 'ROLE_ADMIN' && (
          <>
            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="Enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <button onClick={handleSubmit} className="btn btn-success w-100">Send</button>
            </div>
          </>
        )}
      </div>

      <h5 className="mb-3">Recent Messages</h5>
      <ul className="list-group">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <li key={n.notificationId} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{n.message}</span>
              <small className="text-muted">{n.timestamp || 'Just now'}</small>
            </li>
          ))
        ) : (
          <p className="text-muted">No notifications available.</p>
        )}
      </ul>
    </div>
  );
}

export default Notifications;
