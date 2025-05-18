const mongoose = require('mongoose');

const chuyenGiaSchema = new mongoose.Schema({
    maCG: {
        type: String,
        required: [true, 'Mã chuyên gia là bắt buộc'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email là bắt buộc'],
        unique: true,
        lowercase: true
    },
    hoVaTen: {
        type: String,
        required: [true, 'Họ và tên là bắt buộc']
    },
    gioiTinh: {
        type: String,
        enum: ['Nam', 'Nữ'],
        required: [true, 'Giới tính là bắt buộc']
    },
    quocGia: {
        type: String,
        required: [true, 'Quốc gia là bắt buộc']
    },
    hoChieu: {
        type: String,
        default: '',
        required: [true, 'Hộ chiếu là bắt buộc'],
        unique: true
    },
    anhHoChieu: {
        type: String,
        default: '',
        unique: true
    },
    truongDonVi: {
        type: String,
        required: [true, 'Trường/Đơn vị là bắt buộc']
    },
    chucDanh: {
        type: String,
        required: [true, 'Chức danh là bắt buộc']
    },
    chucVu: {
        type: String,
        required: [true, 'Chức vụ là bắt buộc']
    },
    chuyenNganh: {
        type: String,
        default: ''
    },
    ghiChu: {
        type: String,
        default: ''
    },
    
}, {
    timestamps: true
});

const ChuyenGia = mongoose.model('ChuyenGia', chuyenGiaSchema);

module.exports = ChuyenGia; 