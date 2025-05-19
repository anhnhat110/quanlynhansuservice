
const APIFeatures = require('../utils/apiFeature');
const DanhMucDoan = require('../models/DanhMucDoanModel');

exports.getAllDanhMucDoan = async (req, res) => {
  try {
    const features = new APIFeatures(DanhMucDoan.find(), req.query)
      .searchforDanhMucDoan()
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const danhMucDoans = await features.query;

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      length: danhMucDoans.length,
      data: {
        danhMucDoans,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message || 'Không thể lấy danh sách đoàn',
    });
  }
};

exports.getDanhMucDoan = async (req, res) => {
  try {
    const danhMucDoan = await DanhMucDoan.findById(req.params.id);
    if (!danhMucDoan) {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy đoàn',
      });
    }
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        danhMucDoan,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message || 'Không tìm thấy đoàn',
    });
  }
};

exports.createDanhMucDoan = async (req, res) => {
  try {
    const newDanhMucDoan = await DanhMucDoan.create(req.body);
    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        danhMucDoan: newDanhMucDoan,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        status: 'fail',
        message: 'Hộ chiếu đã tồn tại, vui lòng nhập khác'
      });
    }
    if (err.message.includes('Hộ chiếu phải có đúng 8 ký tự')) {
      return res.status(400).json({
        status: 'fail',
        message: 'Hộ chiếu phải có đúng 8 ký tự chữ hoặc số'
      });
    }
    if (err.message.includes('Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu')) {
      return res.status(400).json({
        status: 'fail',
        message: 'Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu'
      });
    }
    res.status(400).json({
      status: 'fail',
      message: err.message || 'Dữ liệu không hợp lệ'
    });
  }
};

exports.updateDanhMucDoan = async (req, res) => {
  try {
    const danhMucDoan = await DanhMucDoan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!danhMucDoan) {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy đoàn',
      });
    }
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        danhMucDoan,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        status: 'fail',
        message: 'Hộ chiếu đã tồn tại, vui lòng nhập khác'
      });
    }
    if (err.message.includes('Hộ chiếu phải có đúng 8 ký tự')) {
      return res.status(400).json({
        status: 'fail',
        message: 'Hộ chiếu phải có đúng 8 ký tự chữ hoặc số'
      });
    }
    if (err.message.includes('Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu')) {
      return res.status(400).json({
        status: 'fail',
        message: 'Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu'
      });
    }
    res.status(400).json({
      status: 'fail',
      message: err.message || 'Dữ liệu không hợp lệ'
    });
  }
};

exports.deleteDanhMucDoan = async (req, res) => {
  try {
    const danhMucDoan = await DanhMucDoan.findByIdAndDelete(req.params.id);
    if (!danhMucDoan) {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy đoàn',
      });
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message || 'Không thể xóa đoàn',
    });
  }
};