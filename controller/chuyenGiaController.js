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
            message: err,
        });
    }
};

exports.getChuyenGia = async (req, res) => {
    try {
        const chuyenGia = await ChuyenGia.findById(req.params.id);
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
            message: err,
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
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.updateChuyenGia = async (req, res) => {
    try {
        const chuyenGia = await ChuyenGia.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
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
            message: err,
        });
    }
};

exports.deleteChuyenGia = async (req, res) => {
    try {
        await ChuyenGia.findByIdAndDelete(req.params.id);
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