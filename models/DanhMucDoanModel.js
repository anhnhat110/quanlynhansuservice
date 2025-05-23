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
    default: '',
  },
  thoiGianBatDau: {
    type: Date,
    required: [true, 'Ngày bắt đầu là bắt buộc'],
  },
  thoiGianKetThuc: {
    type: Date,
    required: [true, 'Ngày kết thúc là bắt buộc'],
    validate: {
      validator: function (value) {
        return value >= this.thoiGianBatDau;
      },
      message: 'Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu',
    },
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

// Pre-update hook to validate only uniqueness of hoChieu during updates
danhMucDoanSchema.pre(['updateOne', 'findOneAndUpdate'], async function (next) {
  const update = this.getUpdate();
  if (update.hoChieu) {
    const existing = await this.model.findOne({
      hoChieu: update.hoChieu,
      _id: { $ne: this.getQuery()._id },
    });
    if (existing) {
      return next(new Error('Hộ chiếu đã tồn tại'));
    }
  }
  next();
});

const DanhMucDoan = mongoose.model('DanhMucDoan', danhMucDoanSchema);

module.exports = DanhMucDoan;