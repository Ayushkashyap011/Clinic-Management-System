const Disease = require('../Models/Disease');

// Get all diseases
exports.getDiseases = async (req, res) => {
  try {
    const diseases = await Disease.find();
    res.json(diseases);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get single disease by ID
exports.getDiseaseById = async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);
    if (!disease) {
      return res.status(404).json({ message: 'Disease not found' });
    }
    res.json(disease);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create new disease
exports.createDisease = async (req, res) => {
  const { DiseaseID, DiseaseName, Description, Symptoms, DateDiagnosed, NextVisitDate } = req.body;
  
  try {
    const disease = new Disease({
      DiseaseID,
      DiseaseName,
      Description,
      Symptoms,
      DateDiagnosed,
      NextVisitDate,
    });
    
    const newDisease = await disease.save();
    res.status(201).json(newDisease);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update disease
exports.updateDisease = async (req, res) => {
  try {
    const disease = await Disease.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!disease) {
      return res.status(404).json({ message: 'Disease not found' });
    }
    
    res.json(disease);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete disease
exports.deleteDisease = async (req, res) => {
  try {
    const disease = await Disease.findByIdAndDelete(req.params.id);
    
    if (!disease) {
      return res.status(404).json({ message: 'Disease not found' });
    }
    
    res.json({ message: 'Disease deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};