const express = require('express');
const sinhVienController = require('../controller/sinhvienController');

const router = express.Router();

// Route đặc biệt trước để tránh xung đột với `/:id`
router.get('/top-truongdoitac', sinhVienController.getTopTruongDoiTac);

router
  .route('/')
  .get(sinhVienController.getAllSinhVien)
  .post(sinhVienController.createSinhVien);

router
  .route('/:id')
  .get(sinhVienController.getSinhVien)
  .patch(sinhVienController.updateSinhVien)
  .delete(sinhVienController.deleteSinhVien);

module.exports = router;
