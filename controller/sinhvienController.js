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
      message: err.message || 'Không thể lấy danh sách sinh viên',
    });
  }
};

exports.getSinhVien = async (req, res) => {
  try {
    const sinhVien = await SinhVien.findById(req.params.id);
    if (!sinhVien) {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy sinh viên',
      });
    }
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
      message: err.message || 'Không tìm thấy sinh viên',
    });
  }
};

exports.createSinhVien = async (req, res) => {
  try {
    const newSinhVien = await SinhVien.create(req.body);

    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        sinhVien: newSinhVien,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        status: 'fail',
        message: 'Mã sinh viên đã tồn tại',
      });
    }
    if (
      err.message.includes('Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu')
    ) {
      return res.status(400).json({
        status: 'fail',
        message: 'Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu',
      });
    }
    res.status(400).json({
      status: 'fail',
      message: err.message || 'Dữ liệu không hợp lệ',
    });
  }
};

exports.updateSinhVien = async (req, res) => {
  try {
    const sinhVien = await SinhVien.findById(req.params.id);

    if (!sinhVien) {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy sinh viên',
      });
    }
    // Cập nhật thủ công các trường từ req.body
    Object.keys(req.body).forEach((key) => {
      sinhVien[key] = req.body[key];
    });

    // Lưu lại để kích hoạt validate đầy đủ
    await sinhVien.save();
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        sinhVien,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        status: 'fail',
        message: 'Mã sinh viên đã tồn tại',
      });
    }
    if (
      err.message.includes('Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu')
    ) {
      return res.status(400).json({
        status: 'fail',
        message: 'Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu',
      });
    }
    res.status(400).json({
      status: 'fail',
      message: err.message || 'Dữ liệu không hợp lệ',
    });
  }
};

exports.deleteSinhVien = async (req, res) => {
  try {
    const sinhVien = await SinhVien.findByIdAndDelete(req.params.id);
    if (!sinhVien) {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy sinh viên',
      });
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message || 'Không thể xóa sinh viên',
    });
  }
};

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
      message: err.message || 'Không thể lấy danh sách trường đối tác',
    });
  }
};
