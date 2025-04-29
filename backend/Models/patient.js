const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patientID: { type: String, required: true, unique: true },
  patientName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  contactInfo: { type: String, required: true },
  address: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  medicalHistory: { type: String },
  surgeries: { type: String }
});

module.exports =mongoose.models.Patient||mongoose.model('Patient', patientSchema);

module.exports = mongoose.models.Patient || mongoose.model('Patient', patientSchema);