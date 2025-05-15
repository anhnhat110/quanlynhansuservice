const express = require('express');
const fs = require('fs');
const taiKhoanController = require('../controller/taiKhoanController');

const router = express.Router();

// router.param("id", tourController.checkID);

router
    .route('/')
    .get(taiKhoanController.getAllTaiKhoans)
    .post(taiKhoanController.createTaiKhoan);
router
    .route('/:id')
    .get(taiKhoanController.getTaiKhoans)
    .patch(taiKhoanController.updateTaiKhoan)
    .delete(taiKhoanController.deleteTaiKhoan);

module.exports = router;