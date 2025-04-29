const Patient = require('../Models/patient');
const Transaction = require('../Models/Transaction');

// Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ 
      message: 'Server Error',
      error: error.message  // Added detailed error
    });
  }
};

// exports.getPatientsByTranscationId = async (req,res) => {
//   try{
//     const transactions =await Transaction.find();
//     transactions.map((el)=>{setPatientId(el.p_id)})
//     patientId.map((el)=>{
//       const transactionPatients = patient.find(el);
//       res.json(transactionPatients);
      
//     })
//   }
//   catch(error)
//   {
//     res.status(500).json({
//       message:'Server Error',
//       error: error.message
//     });
//   }
// };

// Create a new transaction
exports.createTransaction = async (req, res) => {
  const { p_id, d_id, di_id, dosage, medicationDetails, billAmount, paymentStatus, nextVisitDate } = req.body;

  if (!p_id || !d_id || !di_id || !dosage || !medicationDetails || !billAmount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newTransaction = new Transaction({ 
      p_id, 
      d_id, 
      di_id, 
      dosage, 
      medicationDetails, 
      billAmount, 
      paymentStatus, 
      nextVisitDate 
    });
    
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to create transaction',
      error: error.message 
    });
  }
};

exports.getPatientsByTransactionId = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    
    // Extract unique patient IDs
    const patientIds = [...new Set(transactions.map(el => el.p_id))];
    
    // Fetch all patients in a single query
    const patients = await Patient.find({ _id: { $in: patientIds } });

    res.json({
      success: true,
      count: patients.length,
      data: patients
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ 
      message: 'Server Error',
      error: error.message 
    });
  }
};

// Update transaction
exports.updateTransaction = async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return updated document
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to update transaction',
      error: error.message 
    });
  }
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to delete transaction',
      error: error.message 
    });
  }
};