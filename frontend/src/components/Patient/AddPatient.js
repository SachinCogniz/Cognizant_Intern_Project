// src/components/Patient/AddPatient.js
import React, { useState } from 'react';
import axios from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function AddPatient() {
 const [patient, setPatient] = useState({
 name: '',
 age: '',
 contactDetails: '',
 medicalHistory: '',
 });
 const navigate = useNavigate();
 const handleSubmit = async (e) => {
 e.preventDefault();
 try {
 await axios.post('/patients/register', patient);
 toast.success('Patient added successfully!');
 navigate('/patients');
 } catch (err) {
 toast.error('Failed to add patient');
 }
 };
 return (
 <div className="card p-4 col-md-6 mx-auto">
 <h3 className="text-center">Add New Patient</h3>
 <form onSubmit={handleSubmit}>
 <input
 className="form-control mb-3"
 placeholder="Name"
 value={patient.name}
 onChange={(e) => setPatient({ ...patient, name: e.target.value })}
 />
 <input
 type="number"
 className="form-control mb-3"
 placeholder="Age"
 value={patient.age}
 onChange={(e) => setPatient({ ...patient, age: e.target.value })}
 />
 <input
 className="form-control mb-3"
 placeholder="Contact Details"
 value={patient.contactDetails}
 onChange={(e) => setPatient({ ...patient, contactDetails: e.target.value })}
 />
 <textarea
 className="form-control mb-3"
 placeholder="Medical History"
 value={patient.medicalHistory}
 onChange={(e) => setPatient({ ...patient, medicalHistory: e.target.value })}
 ></textarea>
 <button className="btn btn-primary w-100">Submit</button>
 </form>
 </div>
 );
}
export default AddPatient;