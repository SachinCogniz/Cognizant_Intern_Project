// src/components/Plans/WellnessPlans.js
import React, { useEffect, useState } from 'react';
import axios from '../../services/api';
import { toast } from 'react-toastify';

function WellnessPlans() {
  const [plans, setPlans] = useState([]);
  const [patients, setPatients] = useState([]);
  const [newPlan, setNewPlan] = useState({
    planName: '',
    activities: '',
    patientId: '',
  });

  const userRole = localStorage.getItem('role'); // Get role from localStorage

  const fetchPlans = async () => {
    try {
      const res = await axios.get('/plans');
      setPlans(res.data);
    } catch (err) {
      toast.error('Failed to load wellness plans');
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await axios.get('/patients');
      setPatients(res.data);
    } catch (err) {
      toast.error('Failed to load patients');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPlan.patientId) {
      toast.error('Please select a patient');
      return;
    }
    try {
      await axios.post(`/plans/create/${newPlan.patientId}`, {
        planName: newPlan.planName,
        activities: newPlan.activities,
      });
      toast.success('Plan created');
      setNewPlan({ planName: '', activities: '', patientId: '' });
      fetchPlans();
    } catch (err) {
      toast.error('Failed to create plan');
    }
  };

  useEffect(() => {
    fetchPlans();
    if (userRole === 'ROLE_ADMIN') {
      fetchPatients();
    }
  }, [userRole]);

  const getPatientName = (plan) => {
    if (plan.assignedTo?.name) return plan.assignedTo.name;
    const patient = patients.find(
      (p) =>
        p.patientId === plan.assignedTo?.patientId ||
        p.patientId === plan.patientId
    );
    return patient?.name || 'N/A';
  };

  return (
    <div className="row mt-4">
      {userRole === 'ROLE_ADMIN' && (
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h4 className="mb-4 text-center">➕ Create Wellness Plan</h4>
            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-3"
                placeholder="Plan Name"
                value={newPlan.planName}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, planName: e.target.value })
                }
              />
              <textarea
                className="form-control mb-3"
                placeholder="Activities"
                value={newPlan.activities}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, activities: e.target.value })
                }
              ></textarea>
              <select
                className="form-select mb-3"
                value={newPlan.patientId}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, patientId: e.target.value })
                }
              >
                <option value="">Select Patient</option>
                {patients.map((p) => (
                  <option key={p.patientId} value={p.patientId}>
                    {p.name}
                  </option>
                ))}
              </select>
              <button className="btn btn-success w-100">Create Plan</button>
            </form>
          </div>
        </div>
      )}
      <div className={userRole === 'ROLE_ADMIN' ? 'col-md-6' : 'col-md-12'}>
        <h4 className="text-center mb-3">📦 Existing Plans</h4>
        <table className="table table-bordered table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Plan</th>
              <th>Activities</th>
              <th>Patient</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.planId}>
                <td>{plan.planName}</td>
                <td>{plan.activities}</td>
                <td>{getPatientName(plan)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WellnessPlans;
