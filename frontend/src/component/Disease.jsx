import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Disease.css';

const Disease = () => {
  const [diseases, setDiseases] = useState([]);
  const [formState, setFormState] = useState({
    DiseaseID: '',
    DiseaseName: '',
    Description: '',
    Symptoms: '',
    DateDiagnosed: '',
    NextVisitDate: ''
  });
  const [editingDiseaseID, setEditingDiseaseID] = useState(null);
  let VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const handleNextClick = () => {
    navigate('/transaction'); 
  };

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await axios.get(`${VITE_BACKEND_URL}/api/diseases`);
        setDiseases(response.data);
      } catch (error) {
        console.error('Error fetching diseases:', error);
      }
    };

    fetchDiseases();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { DiseaseID } = formState;

    try {
      if (editingDiseaseID) {
        await axios.put(`${VITE_BACKEND_URL}/api/diseases/${editingDiseaseID}`, formState);
        setDiseases(
          diseases.map((disease) =>
            disease.DiseaseID === editingDiseaseID ? { ...formState, DiseaseID: editingDiseaseID } : disease
          )
        );
        setEditingDiseaseID(null);
      } else {
        const response = await axios.post(`${VITE_BACKEND_URL}/api/diseases`, formState);
        setDiseases([...diseases, response.data]);
      }
      setFormState({
        DiseaseID: '',
        DiseaseName: '',
        Description: '',
        Symptoms: '',
        DateDiagnosed: '',
        NextVisitDate: ''
      });
    } catch (error) {
      console.error('Error saving disease:', error);
    }
  };

  const handleEdit = (id) => {
    const diseaseToEdit = diseases.find((disease) => disease.DiseaseID === id);
    setFormState(diseaseToEdit);
    setEditingDiseaseID(id);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this disease?');
    if (isConfirmed) {
      try {
        await axios.delete(`${VITE_BACKEND_URL}/api/diseases/${id}`);
        setDiseases(diseases.filter((disease) => disease.DiseaseID !== id));
      } catch (error) {
        console.error('Error deleting disease:', error);
      }
    }
  };

  const cancelEdit = () => {
    setFormState({
      DiseaseID: '',
      DiseaseName: '',
      Description: '',
      Symptoms: '',
      DateDiagnosed: '',
      NextVisitDate: ''
    });
    setEditingDiseaseID(null);
  };

  return (
    <div className="disease-page">
      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>
      <div className="disease-container">
        <div className="header">
          <h1>Disease Master</h1>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="DiseaseID">Disease ID:</label>
              <input
                id="DiseaseID"
                type="text"
                name="DiseaseID"
                value={formState.DiseaseID}
                onChange={handleChange}
                required
                disabled={editingDiseaseID !== null}
              />
            </div>
            <div className="form-group">
              <label htmlFor="DiseaseName">Disease Name:</label>
              <input
                id="DiseaseName"
                type="text"
                name="DiseaseName"
                value={formState.DiseaseName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Description">Description:</label>
              <textarea
                id="Description"
                name="Description"
                value={formState.Description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Symptoms">Symptoms:</label>
              <textarea
                id="Symptoms"
                name="Symptoms"
                value={formState.Symptoms}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="DateDiagnosed">Date Diagnosed:</label>
              <input
                id="DateDiagnosed"
                type="date"
                name="DateDiagnosed"
                value={formState.DateDiagnosed}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="NextVisitDate">Next Visit Date:</label>
              <input
                id="NextVisitDate"
                type="date"
                name="NextVisitDate"
                value={formState.NextVisitDate || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-actions">
              <button type="submit">
                {editingDiseaseID ? 'Update Disease' : 'Add Disease'}
              </button>
              {editingDiseaseID && (
                <button type="button" className="cancel" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="list-container">
          <h2>Disease List</h2>
          {diseases.length === 0 ? (
            <p>No diseases available.</p>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Disease ID</th>
                    <th>Disease Name</th>
                    <th>Description</th>
                    <th>Symptoms</th>
                    <th>Date Diagnosed</th>
                    <th>Next Visit Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {diseases.map((disease) => (
                    <tr key={disease.DiseaseID}>
                      <td>{disease.DiseaseID}</td>
                      <td>{disease.DiseaseName}</td>
                      <td>{disease.Description}</td>
                      <td>{disease.Symptoms}</td>
                      <td>{disease.DateDiagnosed}</td>
                      <td>{disease.NextVisitDate || 'N/A'}</td>
                      <td>
                        <button className="edit" onClick={() => handleEdit(disease.DiseaseID)}>Edit</button>
                        <button className="delete" onClick={() => handleDelete(disease.DiseaseID)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <button className="next-button" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Disease;
