const mongoose = require('mongoose');


const suKienSchema = new mongoose.Schema({
    maSK: {
        type: String,
        required: [true, 'Mã sự kiện là bắt buộc'],
        unique: true
    },
    chuyenGia: {
        type: String,
        required: [true, 'Tên chuyên gia là bắt buộc']
    },
    suKien: {
        type: String,
        required: [true, 'Tên sự kiện là bắt buộc']
    },
    mucDich: {
        type: String,
        required: [true, 'Mục đích là bắt buộc']
    },
    thoiGianBatDau: {
        type: Date,
        required: [true, 'Ngày bắt đầu là bắt buộc']
    },
    thoiGianKetThuc: {
        type: Date,
        required: [true, 'Ngày kết thúc là bắt buộc']
    },
    diaDiem: {
        type: String,
        required: [true, 'Địa điểm là bắt buộc']
    },
    thanhPhan: {
        type: String,
        required: [true, 'Thành phần tham gia là bắt buộc']
    },
    ghiChu: {
        type: String,
        default: ''
    },
    guides :[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'ChuyenGia'
        }
    ]
}, {
    timestamps: true
});

suKienSchema.pre(/^find/, function(next) {
    this.populate({
        path:'guides',
        select: '-ghiChu -createdAt -updatedAt -__v'});
    next();
});


const SuKien = mongoose.model('SuKien', suKienSchema);

module.exports = SuKien; 