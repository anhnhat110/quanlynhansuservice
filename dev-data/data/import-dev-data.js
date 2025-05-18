const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const SinhVien = require('../../models/SinhVienModel');
const ChuyenGia = require('../../models/ChuyenGiaModel');
const SuKien = require('../../models/SuKienModel');
const DanhMucDoan = require('../../models/DanhMucDoanModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

//READ JSON FILE
const sinhvien = JSON.parse(fs.readFileSync(`${__dirname}/sinhvien.json`));
const chuyengia = JSON.parse(fs.readFileSync(`${__dirname}/chuyengia.json`));
const sukien = JSON.parse(fs.readFileSync(`${__dirname}/sukien.json`));
const danhmucdoan = JSON.parse(fs.readFileSync(`${__dirname}/danhmucdoan.json`));
//IMPORT DATA INTO DB
const importData = async () => {
    try {
        await DanhMucDoan.create(danhmucdoan);
        await SinhVien.create(sinhvien);
        await ChuyenGia.create(chuyengia);
        await SuKien.create(sukien);
        console.log('Data successfully loaded!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

//DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await DanhMucDoan.deleteMany();
        await SinhVien.deleteMany();
        await ChuyenGia.deleteMany();
        await SuKien.deleteMany();
        console.log('Data successfully deleted!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
