const express = require('express');
const router = express.Router();
const diseaseController = require('../Controller/diseaseController');

router.post('/',diseaseController.createDisease);
router.get('/', diseaseController.getDiseases);
router.get('/:id',diseaseController.getDiseaseById);
router.put('/:id',diseaseController.updateDisease);
router.delete('/:id',diseaseController.deleteDisease);
module.exports = router;
