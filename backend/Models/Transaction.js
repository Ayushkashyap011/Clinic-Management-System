const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  p_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  d_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  di_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Disease', required: true },
  bill_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Billing',require:true},
  dosage: { type: String, required: true },
  medicationDetails: { type: String, required: true },
  billAmount: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
  nextVisitDate: { type: Date }
});

module.exports = mongoose.model('Transaction', transactionSchema);