const express = require('express');
const router = express.Router();
const billingController = require('../Controller/billingController');

router.get('/allbills', billingController.getBills);

router.post('/', billingController.createBill);

router.get('/', billingController.getBillById);

router.put('/:id', billingController.updateBill);

router.delete('/:id', billingController.deleteBill);

module.exports = router;