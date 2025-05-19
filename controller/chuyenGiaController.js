const APIFeatures = require('../utils/apiFeature');
const ChuyenGia = require('../models/ChuyenGiaModel');

exports.getAllChuyenGias = async (req, res) => {
    try {
        const features = new APIFeatures(ChuyenGia.find(), req.query)
            .searchforExpert()
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const chuyenGias = await features.query;

        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            length: chuyenGias.length,
            data: {
                chuyenGias,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message || 'Không thể lấy danh sách chuyên gia',
        });
    }
};

exports.getChuyenGia = async (req, res) => {
    try {
        const chuyenGia = await ChuyenGia.findById(req.params.id);
        if (!chuyenGia) {
            return res.status(404).json({
                status: 'fail',
                message: 'Không tìm thấy chuyên gia',
            });
        }
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                chuyenGia,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message || 'Không tìm thấy chuyên gia',
        });
    }
};

exports.createChuyenGia = async (req, res) => {
    try {
        const newChuyenGia = await ChuyenGia.create(req.body);

        res.status(201).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                chuyenGia: newChuyenGia,
            },
        });
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            const message = field === 'email' ? 'Email đã tồn tại' : 'Hộ chiếu đã tồn tại';
            return res.status(400).json({
                status: 'fail',
                message,
            });
        }
        res.status(400).json({
            status: 'fail',
            message: err.message || 'Dữ liệu không hợp lệ',
        });
    }
};

exports.updateChuyenGia = async (req, res) => {
    try {
        const chuyenGia = await ChuyenGia.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!chuyenGia) {
            return res.status(404).json({
                status: 'fail',
                message: 'Không tìm thấy chuyên gia',
            });
        }
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                chuyenGia,
            },
        });
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            const message = field === 'email' ? 'Email đã tồn tại' : 'Hộ chiếu đã tồn tại';
            return res.status(400).json({
                status: 'fail',
                message,
            });
        }
        res.status(400).json({
            status: 'fail',
            message: err.message || 'Dữ liệu không hợp lệ',
        });
    }
};

exports.deleteChuyenGia = async (req, res) => {
    try {
        const chuyenGia = await ChuyenGia.findByIdAndDelete(req.params.id);
        if (!chuyenGia) {
            return res.status(404).json({
                status: 'fail',
                message: 'Không tìm thấy chuyên gia',
            });
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message || 'Không thể xóa chuyên gia',
        });
    }
};