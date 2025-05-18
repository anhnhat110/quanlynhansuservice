const express = require('express');
const danhMucDoanController = require('../controller/danhmucDoanController');

const router = express.Router();

router
  .route('/')
  .get(danhMucDoanController.getAllDanhMucDoan)
  .post(danhMucDoanController.createDanhMucDoan);

router
  .route('/:id')
  .get(danhMucDoanController.getDanhMucDoan)
  .patch(danhMucDoanController.updateDanhMucDoan)
  .delete(danhMucDoanController.deleteDanhMucDoan);

module.exports = router;