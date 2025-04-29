import React, { useEffect, useState } from 'react';
import './Transaction.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Transaction() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [diseases, setDiseases] = useState([]);

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // Fetch all required data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsRes, doctorsRes, diseasesRes] = await Promise.all([
          fetch(`${VITE_BACKEND_URL}/api/patients`),
          fetch(`${VITE_BACKEND_URL}/api/doctors`),
          fetch(`${VITE_BACKEND_URL}/api/diseases`)
        ]);
        
        setPatients(await patientsRes.json());
        setDoctors(await doctorsRes.json());
        setDiseases(await diseasesRes.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Fetch prescription and bill when patient is selected
  useEffect(() => {
    if (selectedPatient) {
      const fetchPatientDetails = async () => {
        try {
          const prescriptionRes = await fetch(`${VITE_BACKEND_URL}/api/prescriptions?patientId=${selectedPatient._id}`);
          const prescriptionData = await prescriptionRes.json();
          
          // Find the prescription that matches the selected patient
          const matchingPrescription = prescriptionData.find(
            pres => pres.PatientID === selectedPatient._id || 
                   (pres.PatientID && pres.PatientID._id === selectedPatient._id)
          );
          
          setSelectedPrescription(matchingPrescription || null);

          // Fetch bill data
          const billRes = await fetch(`${VITE_BACKEND_URL}/api/billings?patientId=${selectedPatient._id}`);
          const billData = await billRes.json();
          setSelectedBill(billData[0] || null);
        } catch (error) {
          console.error("Error fetching patient details:", error);
        }
      };

      fetchPatientDetails();
    }
  }, [selectedPatient]);

  const handlePatientSelect = (e) => {
    const patientId = e.target.value;
    const patient = patients.find(p => p._id === patientId);
    setSelectedPatient(patient || null);
    setIsSaved(false);
  };

  const handleDoctorSelect = (e) => {
    const doctorId = e.target.value;
    const doctor = doctors.find(d => d._id === doctorId);
    setSelectedDoctor(doctor || null);
    setIsSaved(false);
  };

  const handleDiseaseSelect = (e) => {
    const diseaseId = e.target.value;
    const disease = diseases.find(d => d._id === diseaseId);
    setSelectedDisease(disease || null);
    setIsSaved(false);
  };

  const handleClear = () => {
    setSelectedPatient(null);
    setSelectedDoctor(null);
    setSelectedDisease(null);
    setSelectedBill(null);
    setSelectedPrescription(null);
    setIsSaved(false);
  };

  const handleSave = async () => {
    if (!selectedPatient || !selectedDoctor || !selectedDisease) {
      alert('Please select a patient, doctor, and disease');
      return;
    }

    try {
      const transactionData = {
        p_id: selectedPatient._id,
        d_id: selectedDoctor._id,
        di_id: selectedDisease._id,
        dosage: selectedPrescription?.Dosage || '',
        medicationDetails: selectedPrescription?.MedicationDetails || '',
        billAmount: selectedBill?.BillAmount || 0,
        paymentStatus: selectedBill?.PaymentStatus || 'Pending',
        nextVisitDate: selectedDisease?.NextVisitDate || new Date()
      };

      await axios.post(`${VITE_BACKEND_URL}/api/transactions`, transactionData);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error("Error saving transaction:", error);
      alert('Failed to save transaction');
    }
  };

  const handleBack = () => navigate('/dashboard');

  const currentDate = new Date().toLocaleDateString();
  return (
    <div className="transaction-container">
      <button className="back-button" onClick={handleBack}>Back</button>
      <h2 className="transaction-header">Clinic Transaction Page</h2>
      <div className="current-date">{currentDate}</div>
      
      <div className="transaction-box">
        <div className="selection">
          <label htmlFor="patient-select">Select Patient ID: </label>
          <select 
            id="patient-select" 
            onChange={handlePatientSelect}
            value={selectedPatient?._id || ''}
          >
            <option value="">Select a Patient</option>
            {patients.map(patient => (
              <option key={patient._id} value={patient._id}>
                {patient.patientID} - {patient.patientName}
              </option>
            ))}
          </select>
        </div>
        
        <div className="selection">
          <label htmlFor="doctor-select">Select Doctor ID: </label>
          <select 
            id="doctor-select" 
            onChange={handleDoctorSelect}
            value={selectedDoctor?._id || ''}
          >
            <option value="">Select a Doctor</option>
            {doctors.map(doctor => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.doctorID} - {doctor.doctorName}
              </option>
            ))}
          </select>
        </div>

        {selectedDoctor && (
          <div>
            <h3>Doctor Details:</h3>
            <table>
              <thead>
                <tr>
                  <th>Doctor ID</th>
                  <th>Doctor Name</th>
                  <th>Specialization</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedDoctor.doctorID}</td>
                  <td>{selectedDoctor.doctorName}</td>
                  <td>{selectedDoctor.specialization}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {selectedPatient && (
          <div>
            <h3>Patient Details:</h3>
            <table>
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Patient Name</th>
                  <th>Gender</th>
                  <th>Contact No</th>
                  <th>
                    <div className="selection">
                      <select 
                        id="Disease-select" 
                        onChange={handleDiseaseSelect}
                        value={selectedDisease?._id || ''}
                      >
                        <option value="">Select Disease</option>
                        {diseases.map(disease => (
                          <option key={disease._id} value={disease._id}>
                            {disease.DiseaseID} - {disease.DiseaseName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </th>
                  <th>Disease Name</th>
                  <th>Date Diagnosed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedPatient.patientID}</td>
                  <td>{selectedPatient.patientName}</td>
                  <td>{selectedPatient.gender}</td>
                  <td>{selectedPatient.contactInfo}</td>
                  <td>{selectedDisease?.DiseaseID || '-'}</td>
                  <td>{selectedDisease?.DiseaseName || '-'}</td>
                  <td>{selectedDisease?.DateDiagnosed || '-'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {selectedPatient && (
          <div>
            <h3>Medication & Billing Details:</h3>
            <table>
              <thead>
                <tr>
                  <th>Dosage</th>
                  <th>Medication Details</th>
                  <th>Bill Amount</th>
                  <th>Payment Status</th>
                  <th>Next Visit Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedPrescription?.Dosage || '-'}</td>
                  <td>{selectedPrescription?.MedicationDetails || '-'}</td>
                  <td>{selectedBill?.BillAmount || '-'}</td>
                  <td>{selectedBill?.PaymentStatus || '-'}</td>
                  <td>{selectedDisease?.NextVisitDate || '-'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <button className="save" onClick={handleSave}>Save</button>
        <button className="clear" onClick={handleClear}>Clear</button>
        
        {isSaved && <div className="success-message">Details Saved successfully</div>}
      </div>
    </div>
  );
}

export default Transaction;