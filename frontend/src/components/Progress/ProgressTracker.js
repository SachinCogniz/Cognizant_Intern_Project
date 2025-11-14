import React, { useState, useEffect } from 'react';
import axios from '../../services/api';
import { toast } from 'react-toastify';

function ProgressTracker() {
  const [progressList, setProgressList] = useState([]);
  const [patients, setPatients] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [newProgress, setNewProgress] = useState({
    patientId: '',
    planId: '',
    completedActivities: '',
  });

  const userRole = localStorage.getItem('role');

  const fetchPatients = async () => {
    try {
      const res = await axios.get('/patients');
      setPatients(res.data);
    } catch (err) {
      toast.error('Failed to load patients');
    }
  };

  const fetchPlans = async () => {
    try {
      const res = await axios.get('/plans');
      setPlans(res.data);
    } catch (err) {
      toast.error('Failed to load plans');
    }
  };

  const fetchProgress = async (patientId) => {
    try {
      const res = await axios.get(`/progress/${patientId}`);
      setProgressList(res.data);
    } catch {
      setProgressList([]);
      toast.info('No progress found for this patient or failed to load.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/progress/track', {
        patient: { patientId: newProgress.patientId },
        plan: { planId: newProgress.planId },
        completedActivities: newProgress.completedActivities,
      });
      toast.success('Progress logged!');
      if (selectedPatientId) {
        fetchProgress(selectedPatientId);
      }
      setNewProgress({ patientId: '', planId: '', completedActivities: '' });
    } catch {
      toast.error('Logging failed');
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchPlans();
  }, []);

  return (
    <div className="row mt-4">
      {userRole === 'ROLE_ADMIN' && (
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h4 className="text-center mb-3">📝 Log Progress</h4>
            <form onSubmit={handleSubmit}>
              <select
                className="form-select mb-3"
                value={newProgress.patientId}
                onChange={(e) =>
                  setNewProgress({ ...newProgress, patientId: e.target.value })
                }
              >
                <option value="">Select Patient</option>
                {patients.map((p) => (
                  <option key={p.patientId} value={p.patientId}>
                    {p.name}
                  </option>
                ))}
              </select>
              <select
                className="form-select mb-3"
                value={newProgress.planId}
                onChange={(e) =>
                  setNewProgress({ ...newProgress, planId: e.target.value })
                }
              >
                <option value="">Select Plan</option>
                {plans.map((p) => (
                  <option key={p.planId} value={p.planId}>
                    {p.planName}
                  </option>
                ))}
              </select>
              <textarea
                className="form-control mb-3"
                placeholder="Completed Activities"
                value={newProgress.completedActivities}
                onChange={(e) =>
                  setNewProgress({
                    ...newProgress,
                    completedActivities: e.target.value,
                  })
                }
              ></textarea>
              <button className="btn btn-primary w-100">Log</button>
            </form>
          </div>
        </div>
      )}

      <div className={userRole === 'ROLE_ADMIN' ? 'col-md-6' : 'col-md-12'}>
        <h4 className="text-center mb-3">📊 View Progress</h4>
        <select
          className="form-select mb-3"
          value={selectedPatientId}
          onChange={(e) => {
            setSelectedPatientId(e.target.value);
            if (e.target.value) {
              fetchProgress(e.target.value);
            } else {
              setProgressList([]);
            }
          }}
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.patientId} value={p.patientId}>
              {p.name}
            </option>
          ))}
        </select>
        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Plan</th>
                <th>Activities</th>
              </tr>
            </thead>
            <tbody>
              {progressList.length > 0 ? (
                progressList.map((p) => (
                  <tr key={p.progressId}>
                    <td>{p.plan?.planName}</td>
                    <td>{p.completedActivities}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center text-muted">
                    {selectedPatientId
                      ? 'No progress entries for this patient.'
                      : 'Please select a patient to view progress.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProgressTracker;
