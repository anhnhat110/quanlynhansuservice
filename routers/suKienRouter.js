const express = require('express');
const suKienController = require('../controller/suKienController');

const router = express.Router();

router
    .route('/')
    .get(suKienController.getAllSuKiens)
    .post(suKienController.createSuKien);

router
    .route('/:id')
    .get(suKienController.getSuKien)
    .patch(suKienController.updateSuKien)
    .delete(suKienController.deleteSuKien);

module.exports = router; 