import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Prescription.css';
import { useNavigate } from 'react-router-dom';

const PrescriptionForm = ({ editingPrescription }) => {
    const [prescription, setPrescription] = useState({
        PrescriptionID: `PRE-${Date.now()}`,
        PatientID: '',
        DoctorID: '',
        Date: '',
        MedicationDetails: '',
        Dosage: '',
    });
    let VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (editingPrescription) {
            setPrescription(editingPrescription);
        }
    }, [editingPrescription]);

    useEffect(() => {
        const fetchPatientsAndDoctors = async () => {
            try {
                const patientsResponse = await axios.get(`${VITE_BACKEND_URL}/api/patients`);
                const doctorsResponse = await axios.get(`${VITE_BACKEND_URL}/api/doctors`);
                setPatients(patientsResponse.data);
                setDoctors(doctorsResponse.data);
            } catch (error) {
                console.error('Error fetching patients and doctors:', error);
            }
        };
        fetchPatientsAndDoctors();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrescription({
            ...prescription,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingPrescription) {
                await axios.put(`${VITE_BACKEND_URL}/api/prescriptions/${prescription.PrescriptionID}`, prescription);
            } else {
                await axios.post(`${VITE_BACKEND_URL}/api/prescriptions`, prescription);
            }
            setPrescription({
                PrescriptionID: '',
                PatientID: '',
                DoctorID: '',
                Date: '',
                MedicationDetails: '',
                Dosage: '',
            });
        } catch (error) {
            console.error('Error saving prescription:', error.response ? error.response.data : error.message);
        }
    };

    const handleNextClick = () => {
        navigate('/billing');
    };

    return (
        <div className="prescription-container">
            <div className="form-container">
                <button className="back-button" onClick={() => navigate('/dashboard')}>Back</button>
                <h1 className="header">Prescription Master</h1>
                <form className="prescription-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="PrescriptionID">Prescription ID:</label>
                        <input
                            type="text"
                            id="PrescriptionID"
                            name="PrescriptionID"
                            value={prescription.PrescriptionID}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="PatientID">Patient ID:</label>
                        <select
                            id="PatientID"
                            name="PatientID"
                            value={prescription.PatientID}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a Patient</option>
                            {patients.map((el) => (
                                <option key={el._id} value={el._id}>
                                    {el.patientID}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="DoctorID">Doctor ID:</label>
                        <select
                            id="DoctorID"
                            name="DoctorID"
                            value={prescription.DoctorID}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a Doctor</option>
                            {doctors.map((el) => (
                                <option key={el._id} value={el._id}>
                                    {el.doctorID}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Date">Date:</label>
                        <input
                            type="date"
                            id="Date"
                            name="Date"
                            value={prescription.Date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="MedicationDetails">Medication Details:</label>
                        <input
                            type="text"
                            id="MedicationDetails"
                            name="MedicationDetails"
                            value={prescription.MedicationDetails}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Dosage">Dosage:</label>
                        <input
                            type="text"
                            id="Dosage"
                            name="Dosage"
                            value={prescription.Dosage}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        {editingPrescription ? 'Update' : 'Add'}
                    </button>
                </form>
                <button className="next-button" onClick={handleNextClick}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default PrescriptionForm;
