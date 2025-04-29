const express = require('express');
const router = express.Router();
const DoctorController = require('../Controller/doctorController')

router.post('/', DoctorController.createDoctor);
router.get('/', DoctorController.getDoctors);
router.get('/:id', DoctorController.getDoctorById);
router.put('/:id',DoctorController.updateDoctor);
router.delete('/:id',DoctorController.deleteDoctor);

module.exports = router;
