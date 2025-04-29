const Prescription = require('../Models/Prescription');
const Doctor=require('../Models/doctor');
const Patient = require('../Models/patient')
exports.getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error',
      error:error.message
    });
  }
};
exports.createPrescription = async (req, res) => {
  const { PrescriptionID, PatientID, DoctorID, MedicationDetails, Dosage, Date } = req.body;
  console.log("Received body:", req.body);

  if (!PrescriptionID || !PatientID || !DoctorID || !Date || !MedicationDetails || !Dosage) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const patientExists = await Patient.findById(PatientID);
const doctorExists = await Doctor.findById(DoctorID);
if (!patientExists || !doctorExists) {
  return res.status(400).json({ error: "Invalid PatientID or DoctorID" });
}

  try {
    const newPrescription = new Prescription({ PrescriptionID,PatientID, DoctorID, MedicationDetails, Dosage, Date });
    await newPrescription.save();
    res.status(201).json(newPrescription);
  } catch (error) {
    res.status(500).json({ message: 'Server Error',
      error:error.message
     });
  }
};
exports.getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.updatePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.json({ message: 'Prescription deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
