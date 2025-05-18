const mongoose = require('mongoose');

const danhMucDoanSchema = new mongoose.Schema({
  tenDoan: {
    type: String,
    required: [true, 'Tên đoàn là bắt buộc'],
    trim: true,
  },
  nguoiDaiDien: {
    type: String,
    required: [true, 'Người đại diện là bắt buộc'],
    trim: true,
  },
  hoChieu: {
    type: String,
    required: [true, 'Hộ chiếu là bắt buộc'],
    unique: true,
    trim: true,
  },
  quocTich: {
    type: String,
    required: [true, 'Quốc tịch là bắt buộc'],
    trim: true,
  },
  DOB: {
    type: Date,
    required: [true, 'Ngày sinh là bắt buộc'],
  },
  thoiGianBatDau: {
    type: Date,
    required: [true, 'Thời gian bắt đầu là bắt buộc'],
  },
  thoiGianKetThuc: {
    type: Date,
    required: [true, 'Thời gian kết thúc là bắt buộc'],
  },
  noiDung: {
    type: String,
    required: [true, 'Nội dung là bắt buộc'],
    trim: true,
  },
  ghiChu: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DanhMucDoan = mongoose.model('DanhMucDoan', danhMucDoanSchema);

module.exports = DanhMucDoan;