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
    res.status(404).json({
      status: 'fail',
      message: err.message,
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
    res.status(404).json({
      status: 'fail',
      message: err.message,
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
    res.status(400).json({
      status: 'fail',
      message: err.message,
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
    res.status(404).json({
      status: 'fail',
      message: err.message,
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
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};