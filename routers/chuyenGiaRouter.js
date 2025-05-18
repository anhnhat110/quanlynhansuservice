const express = require('express');
const chuyenGiaController = require('../controller/chuyenGiaController');

const router = express.Router();

router
  .route('/')
  .get(chuyenGiaController.getAllChuyenGias)
  .post(chuyenGiaController.createChuyenGia);

router
  .route('/:id')
  .get(chuyenGiaController.getChuyenGia)
  .patch(chuyenGiaController.updateChuyenGia)
  .delete(chuyenGiaController.deleteChuyenGia);

module.exports = router;
