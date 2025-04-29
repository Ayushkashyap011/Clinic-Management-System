const Billing = require('../Models/Billing');

// Get all bills
exports.getBills = async (req, res) => {
  try {
    const bills = await Billing.find();
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Create a new bill
exports.createBill = async (req, res) => {
  const { BillID, PatientID, Date, BillAmount, PaymentStatus, AreaOfService } = req.body;
  
  if (!BillID || !PatientID || !BillAmount) {
    return res.status(400).json({ message: "BillID, PatientID, and BillAmount are required" });
  }

  try {
    const newBill = new Billing({ BillID, PatientID, Date, BillAmount, PaymentStatus, AreaOfService });
    await newBill.save();
    res.status(201).json(newBill);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "BillID must be unique" });
    } else {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  }
};

// Get single bill by ID
exports.getBillById = async (req, res) => {
  try {
    const bill = await Billing.findById(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update a bill
exports.updateBill = async (req, res) => {
  try {
    const bill = await Billing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Returns updated document and runs schema validators
    );
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json(bill);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "BillID must be unique" });
    } else {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  }
};

// Delete a bill
exports.deleteBill = async (req, res) => {
  try {
    const bill = await Billing.findByIdAndDelete(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json({ message: 'Bill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};