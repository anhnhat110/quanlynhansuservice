const APIFeatures = require('../utils/apiFeature');
const SinhVien = require('../models/SinhVienModel');

exports.getAllSinhVien = async (req, res) => {
  try {
    const features = new APIFeatures(SinhVien.find(), req.query)
      .searchforSinhVien()
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const sinhViens = await features.query;

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      length: sinhViens.length,
      data: {
        sinhViens,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getSinhVien = async (req, res) => {
  try {
    const sinhVien = await SinhVien.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        sinhVien,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createSinhVien = async (req, res) => {
  try {
    const newSinhVien = await SinhVien.create(req.body);

    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime,
      data :{
        sinhVien: newSinhVien,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateSinhVien = async (req, res) => {
  try {
    const sinhVien = await SinhVien.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        sinhVien,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteSinhVien = async (req, res) => {
  try {
    await SinhVien.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// Get top 5 partner schools
exports.getTopTruongDoiTac = async (req, res) => {
  try {
    const topTruongDoiTac = await SinhVien.aggregate([
      {
        $group: {
          _id: '$truongDoiTac',
          studentCount: { $sum: 1 },
        },
      },
      {
        $sort: { studentCount: -1 },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          truongDoiTac: '$_id',
          studentCount: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      length: topTruongDoiTac.length,
      data: {
        topTruongDoiTac,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};