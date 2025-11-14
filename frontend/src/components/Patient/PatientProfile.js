// src/components/Patient/PatientProfile.js
import React, { useEffect, useState } from 'react';
import axios from '../../services/api';
import { toast } from 'react-toastify';
function PatientProfile() {
 const [patients, setPatients] = useState([]);
 const fetchPatients = async () => {
 try {
 const res = await axios.get('http://localhost:7777/api/patients');
 setPatients(res.data);
 } catch (err) {
 toast.error('Failed to fetch patients');
 }
 };
 useEffect(() => {
 fetchPatients();
 }, []);
 return (
 <div>
 <h3 className="text-center mb-3">All Patients</h3>
 <table className="table table-bordered table-striped">
 <thead className="table-dark">
 <tr>
 <th>Name</th>
 <th>Age</th>
 <th>Contact</th>
 <th>Medical History</th>
 </tr>
 </thead>
 <tbody>
 {patients.map((p) => (
 <tr key={p.patientId}>
 <td>{p.name}</td>
 <td>{p.age}</td>
 <td>{p.contactDetails}</td>
 <td>{p.medicalHistory}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 );
}
export default PatientProfile;