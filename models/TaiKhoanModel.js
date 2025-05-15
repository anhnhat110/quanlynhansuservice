const mongoose = require('mongoose');

const taiKhoanSchema = new mongoose.Schema({
  Tendangnhap: {
    type: String,
    required: [true, 'Tên đăng nhập là bắt buộc'],
    unique: true,
    trim: true
  },
  Matkhau: {
    type: String,
    required: [true, 'Mật khẩu là bắt buộc']
  }
});

const TaiKhoan = mongoose.model('TaiKhoan', taiKhoanSchema);

module.exports = TaiKhoan;
