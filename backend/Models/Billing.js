const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  BillID: { type: String, required: true, unique: true },
  PatientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  Date: { type: Date, required: true },
  BillAmount: { type: Number, required: true },
  PaymentStatus: { type: String, required: true },
  AreaOfService: { type: String, required: true }
});

const Billing = mongoose.model('Billing', billingSchema);

module.exports = Billing;
