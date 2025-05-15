const fs = require('fs');
const APIFeatures = require('../utils/apiFeature');
const TaiKhoan = require('../models/TaiKhoanModel');

// const TaiKhoans = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/TaiKhoans-simple.json`)
//   );

exports.getAllTaiKhoans = async (req, res) => {
    try {

        //EXECUTE QUERY
        const features = new APIFeatures(TaiKhoan.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const TaiKhoans = await features.query;

        //SEND RESPONSE
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            length: TaiKhoans.length,
            data: {
                TaiKhoans,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getTaiKhoans = async (req, res) => {
    try {
        const taiKhoan = await TaiKhoan.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                taiKhoan,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.createTaiKhoan = async (req, res) => {
    try {
        // const newTaiKhoan = new TaiKhoan({});
        // newTaiKhoan.create(); 
        const newTaiKhoan = await TaiKhoan.create(req.body);

        res.status(201).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                TaiKhoan: newTaiKhoan,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.updateTaiKhoan = async (req, res) => {
    try {
        const taiKhoan = await TaiKhoan.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                taiKhoan,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.deleteTaiKhoan = async (req, res) => {
    try {
        await TaiKhoan.findByIdAndDelete(req.params.id);
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
