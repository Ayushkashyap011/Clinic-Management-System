import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Billing.css';

const Billing = () => {
  const [bills, setBills] = useState([]);
  const [patients, setPatients] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [newBill, setNewBill] = useState({
    BillID: '', PatientID: '', Date: '', BillAmount: '', PaymentStatus: '', AreaOfService: ''
  });
  let VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/dashboard'); 
  };

  const handleNextClick = () => {
    navigate('/disease'); 
  };

  useEffect(() => {
    const fetchBillsAndPatients = async () => {
      try {
        const billsResponse = await axios.get(`${VITE_BACKEND_URL}/api/billings`);
        setBills(billsResponse.data);

        const patientsResponse = await axios.get(`${VITE_BACKEND_URL}/api/patients`);
        setPatients(patientsResponse.data);
      } catch (error) {
        console.error('Error fetching bills or patients:', error);
      }
    };

    fetchBillsAndPatients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBill({ ...newBill, [name]: value });
  };

  const handleAddOrUpdate = async () => {
    try {
      if (editIndex === -1) {
        await axios.post(`${VITE_BACKEND_URL}/api/billings`, newBill);
      } else {
        await axios.put(`${VITE_BACKEND_URL}/api/billings/${newBill.BillID}`, newBill);
        setEditIndex(-1);
      }
      const billsResponse = await axios.get(`${VITE_BACKEND_URL}/api/billings`);
      setBills(billsResponse.data);
      setNewBill({ BillID: '', PatientID: '', Date: '', BillAmount: '', PaymentStatus: '', AreaOfService: '' });
    } catch (error) {
      console.error('Error saving bill:', error);
    }
  };

  const handleEdit = (index) => {
    setNewBill(bills[index]);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this bill?');
    if (isConfirmed) {
      try {
        await axios.delete(`${VITE_BACKEND_URL}/api/billings/${bills[index].BillID}`);
        const updatedBills = bills.filter((_, i) => i !== index);
        setBills(updatedBills);
      } catch (error) {
        console.error('Error deleting bill:', error);
      }
    }
  };

  return (
    <div className="billing-container">
      <div className="button-container">
        <button className="back-button" onClick={handleBackClick}>
          Back
        </button>
        <button className="next-button" onClick={handleNextClick}>
          Next
        </button>
      </div>
      <div className="header">Billing Master</div>
      <form className="billing-form">
        <div>
          <label>Bill ID:</label>
          <input
            type="text"
            name="BillID"
            value={newBill.BillID}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Patient ID:</label>
          <select
            name="PatientID"
            value={newBill.PatientID}
            onChange={handleChange}
            required
          >
            <option value="">Select Patient</option>
            {patients.map(patient => (
              <option key={patient._id} value={patient._id}>
                {patient.patientID}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="Date"
            value={newBill.Date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Bill Amount:</label>
          <input
            type="number"
            name="BillAmount"
            value={newBill.BillAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Payment Status:</label>
          <select
            name="PaymentStatus"
            value={newBill.PaymentStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div>
          <label>Area of Service:</label>
          <input
            type="text"
            name="AreaOfService"
            value={newBill.AreaOfService}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="button"
          className="add-button"
          onClick={handleAddOrUpdate}
        >
          {editIndex === -1 ? 'Add Bill' : 'Update Bill'}
        </button>
      </form>

      <table className="billing-table">
        <thead>
          <tr>
            <th>Bill ID</th>
            <th>Patient ID</th>
            <th>Date</th>
            <th>Bill Amount</th>
            <th>Payment Status</th>
            <th>Area of Service</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => (
            <tr key={bill.BillID}>
              <td>{bill.BillID}</td>
              <td>{bill.PatientID}</td>
              <td>{bill.Date}</td>
              <td>{bill.BillAmount}</td>
              <td>{bill.PaymentStatus}</td>
              <td>{bill.AreaOfService}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(index)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Billing;
