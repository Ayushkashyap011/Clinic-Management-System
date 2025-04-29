const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    PrescriptionID: { type: String, required: true, unique: true },
    PatientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true},
    DoctorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true},
    Date: {type: Date,required: true},
    MedicationDetails: { type: String, required: true},
    Dosage: {type: String,required: true}
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
