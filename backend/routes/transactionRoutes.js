const express = require('express');
const router = express.Router();
const transactionController = require('../Controller/transactionController');

router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getTransactions);
router.get('/:id', transactionController.getTransactionById);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);
// router.get('/', transactionController.getPatientsByTransactionId)

module.exports = router;