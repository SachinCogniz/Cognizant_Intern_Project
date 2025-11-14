// src/components/Reports/Reports.js
import React, { useState, useEffect } from 'react';
import axios from '../../services/api';
import { toast } from 'react-toastify';
function Reports() {
 const [patients, setPatients] = useState([]);
 const [patientId, setPatientId] = useState('');
 const [summary, setSummary] = useState('');
 const [reports, setReports] = useState([]);
 const fetchPatients = async () => {
 try {
 const res = await axios.get('/patients');
 setPatients(res.data);
 } catch (err) {
 toast.error('Failed to load patients');
 }
 };
 const fetchReports = async (id) => {
 try {
 const res = await axios.get(`/reports/${id}`);
 setReports(res.data);
 } catch (err) {
 toast.error('Failed to fetch reports');
 setReports([]); // Clear reports if fetching fails
 }
 };
 const handleSubmit = async (e) => {
 e.preventDefault();
 if (!patientId || !summary) {
 toast.error('Please fill all fields');
 return;
 }
 try {
 await axios.post(`/reports/generate/${patientId}`, { summary });
 toast.success('Report generated!');
 setSummary(''); // Clear summary after successful generation
 fetchReports(patientId); // Refresh reports for the selected patient
 } catch (err) {
 toast.error('Failed to generate report');
 }
 };
 useEffect(() => {
 fetchPatients();
 }, []);
 return (
 <div>
 <h3 className="text-center mb-4">Generate & View Reports</h3>
 <form onSubmit={handleSubmit} className="row mb-4">
 <div className="col-md-4">
 <select
 className="form-select"
 value={patientId}
 onChange={(e) => {
 setPatientId(e.target.value);
 // Fetch reports immediately when patient selection changes
 fetchReports(e.target.value);
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
 <div className="col-md-6">
 <input
 className="form-control"
 placeholder="Enter summary"
 value={summary}
 onChange={(e) => setSummary(e.target.value)}
 />
 </div>
 <div className="col-md-2">
 <button className="btn btn-primary w-100">Generate</button>
 </div>
 </form>
 <h5>Reports:</h5>
 <table className="table table-bordered table-striped">
 <thead className="table-dark">
 <tr>
 <th>Summary</th>
 <th>Date</th>
 </tr>
 </thead>
 <tbody>
 {reports.length > 0 ? (
 reports.map((r) => (
 <tr key={r.reportId}>
 <td>{r.summary}</td>
 <td>{r.date}</td>
 </tr>
 ))
 ) : (
 <tr>
 <td colSpan={2} className="text-center">
 No reports available.
 </td>
 </tr>
 )}
 </tbody>
 </table>
 </div>
 );
}
export default Reports;
