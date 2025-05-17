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
            message: err.message,
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
            message: err.message,
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
            message: err.message,
        });
    }
};

exports.updateSuKien = async (req, res) => {
    try {
        const suKien = await SuKien.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
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
            message: err.message,
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
            message: err.message,
        });
    }
};

exports.getTopChuyenGias = async (req, res) => {
    try {
        const topChuyenGias = await SuKien.aggregate([
            {
                $group: {
                    _id: '$chuyenGia', // Group by chuyenGia (specialist name)
                    eventCount: { $sum: 1 } // Count number of events per specialist
                }
            },
            {
                $sort: { eventCount: -1 } // Sort by event count in descending order
            },
            {
                $limit: 5 // Limit to top 5
            },
            {
                $project: {
                    chuyenGia: '$_id', // Rename _id to chuyenGia
                    eventCount: 1,
                    _id: 0 // Exclude _id field
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
            message: err.message
        });
    }
};