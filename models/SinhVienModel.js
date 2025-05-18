const mongoose = require('mongoose');

const sinhVienSchema = new mongoose.Schema({
  maSV: {
    type: String,
    required: true,
    unique: true,
  },
  hoVaTen: {
    type: String,
    required: true,
    trim: true,
  },
  hinhThuc: {
    type: String,
    required: true,
    enum: ['Trao đổi', 'Chuyển tiếp'],
  },
  capBac: {
    type: String,
    required: true,
    enum: ['Đại học', 'Sau đại học'],
  },
  chuyenNganh: {
    type: String,
    trim: true,
  },
  lop: {
    type: String,
    trim: true,
  },
  truongDoiTac: {
    type: String,
    required: true,
    trim: true,
  },
  quocGia: {
    type: String,
    required: true,
    trim: true,
  },
  thoiGianBatDau: {
    type: Date,
    required: [true, 'Ngày bắt đầu là bắt buộc'],
  },
  thoiGianKetThuc: {
    type: Date,
    required: [true, 'Ngày kết thúc là bắt buộc'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SinhVien', sinhVienSchema);
