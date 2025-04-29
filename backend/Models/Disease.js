const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
  DiseaseID: { type: String, required: true, unique: true },
  DiseaseName: { type: String, required: true },
  Description: { type: String, required: true },
  Symptoms: { type: String, required: true },
  DateDiagnosed: { type: Date, required: true },
  NextVisitDate: { type: Date, default: null }
});
module.exports = mongoose.models.Disease || mongoose.model('Disease', DiseaseSchema);
