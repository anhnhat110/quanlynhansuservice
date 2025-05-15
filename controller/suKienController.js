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
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getSuKien = async (req, res) => {
    try {
        const suKien = await SuKien.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                suKien,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
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
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.updateSuKien = async (req, res) => {
    try {
        const suKien = await SuKien.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                suKien,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.deleteSuKien = async (req, res) => {
    try {
        await SuKien.findByIdAndDelete(req.params.id);
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