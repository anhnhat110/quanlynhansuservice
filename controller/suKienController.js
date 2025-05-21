const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeature');
const SuKien = require('../models/SuKienModel');

exports.getAllSuKiens = async (req, res) => {
    try {
        const features = new APIFeatures(SuKien.find(), req.query)
            .searchforEvent()
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const suKiens = await features.query;
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            length: suKiens.length,
            data: {
                suKiens,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message || 'Không thể lấy danh sách sự kiện',
        });
    }
};

exports.getSuKien = async (req, res) => {
    try {
        const suKien = await SuKien.findById(req.params.id);
        if (!suKien) {
            return res.status(404).json({
                status: 'fail',
                message: 'Sự kiện không tìm thấy',
            });
        }
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                suKien,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message || 'Không tìm thấy sự kiện',
        });
    }
};

exports.createSuKien = async (req, res) => {
    try {
        const newSuKien = await SuKien.create(req.body);
        res.status(201).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                suKien: newSuKien,
            },
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                status: 'fail',
                message: 'Mã sự kiện đã tồn tại',
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
            message: err.message || 'Dữ liệu không hợp lệ',
        });
    }
};

exports.updateSuKien = async (req, res) => {
    try {
        const suKien = await SuKien.findById(req.params.id);
        if (!suKien) {
            return res.status(404).json({
                status: 'fail',
                message: 'Sự kiện không tìm thấy',
            });
        }

        // Cập nhật thủ công các trường từ req.body
        Object.keys(req.body).forEach(key => {
            suKien[key] = req.body[key];
        });

        // Lưu lại để kích hoạt validate đầy đủ
        await suKien.save();

        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                suKien,
            },
        });

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                status: 'fail',
                message: 'Mã sự kiện đã tồn tại',
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
            message: err.message || 'Dữ liệu không hợp lệ',
        });
    }
};


exports.deleteSuKien = async (req, res) => {
    try {
        const suKien = await SuKien.findByIdAndDelete(req.params.id);
        if (!suKien) {
            return res.status(404).json({
                status: 'fail',
                message: 'Sự kiện không tìm thấy',
            });
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message || 'Không thể xóa sự kiện',
        });
    }
};

exports.getTopChuyenGias = async (req, res) => {
    try {
        const topChuyenGias = await SuKien.aggregate([
            {
                $group: {
                    _id: '$chuyenGia',
                    eventCount: { $sum: 1 }
                }
            },
            {
                $sort: { eventCount: -1 }
            },
            {
                $limit: 5
            },
            {
                $project: {
                    chuyenGia: '$_id',
                    eventCount: 1,
                    _id: 0
                }
            }
        ]);

        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            length: topChuyenGias.length,
            data: {
                topChuyenGias
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message || 'Không thể lấy danh sách chuyên gia hàng đầu',
        });
    }
};