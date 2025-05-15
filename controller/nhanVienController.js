const APIFeatures = require('../utils/apiFeature');
const NhanVien = require('../models/NhanVienModel');

exports.getAllNhanViens = async (req, res) => {
    try {
        const features = new APIFeatures(NhanVien.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const nhanViens = await features.query;

        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            length: nhanViens.length,
            data: {
                nhanViens,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getNhanVien = async (req, res) => {
    try {
        const nhanVien = await NhanVien.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                nhanVien,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.createNhanVien = async (req, res) => {
    try {
        const newNhanVien = await NhanVien.create(req.body);

        res.status(201).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                nhanVien: newNhanVien,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.updateNhanVien = async (req, res) => {
    try {
        const nhanVien = await NhanVien.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                nhanVien,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.deleteNhanVien = async (req, res) => {
    try {
        await NhanVien.findByIdAndDelete(req.params.id);
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