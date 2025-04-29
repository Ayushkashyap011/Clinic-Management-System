const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  doctorID: { type: String, required: true, unique: true },
  doctorName: String,
  specialization: String,
  contactInformation: String,
  schedule: String,
  surgeries: String,
});

module.exports =mongoose.models.Doctor|| mongoose.model('Doctor', doctorSchema);