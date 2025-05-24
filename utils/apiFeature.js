const removeVietnameseAccents = require('../utils/removeVienameseAccents');

class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    // 1A) SEARCHING MULTIPLE FIELDS FOR EVENT
    searchforEvent() {
        if (this.queryString.search) {
            const searchTerm = this.queryString.search;
            const searchTermNoAccent = removeVietnameseAccents(searchTerm).toLowerCase();

            const fields = [ 'suKien','chuyenGia'];

            // Tạo điều kiện tìm kiếm cho cả có dấu và không dấu
            const searchConditions = fields.flatMap(field => ([
                {
                    [field]: {
                        $regex: searchTerm,
                        $options: 'i'
                    }
                },
                {
                    [field]: {
                        $regex: searchTermNoAccent,
                        $options: 'i'
                    }
                }
            ]));

            this.query = this.query.find({
                $or: searchConditions
            });
        }
        return this;
    }
    //1B)
    searchforExpert() {
        if (this.queryString.search) {
            const searchTerm = this.queryString.search;
            const searchTermNoAccent = removeVietnameseAccents(searchTerm).toLowerCase();

            const fields = ['email', 'hoVaTen', 'maCG', 'quocGia',"hoChieu","chucDanh","truongDonVi"];

            // Tạo điều kiện tìm kiếm cho cả có dấu và không dấu
            const searchConditions = fields.flatMap(field => ([
                {
                    [field]: {
                        $regex: searchTerm,
                        $options: 'i'
                    }
                },
                {
                    [field]: {
                        $regex: searchTermNoAccent,
                        $options: 'i'
                    }
                }
            ]));

            this.query = this.query.find({
                $or: searchConditions
            });
        }
        return this;
    }
    searchforSinhVien() {
        if (this.queryString.search) {
            const searchTerm = this.queryString.search;
            const searchTermNoAccent = removeVietnameseAccents(searchTerm).toLowerCase();

            const fields = [ 'hoVaTen', 'maSV', 'lop', "chuyenNganh"];

            // Tạo điều kiện tìm kiếm cho cả có dấu và không dấu
            const searchConditions = fields.flatMap(field => ([
                {
                    [field]: {
                        $regex: searchTerm,
                        $options: 'i'
                    }
                },
                {
                    [field]: {
                        $regex: searchTermNoAccent,
                        $options: 'i'
                    }
                }
            ]));

            this.query = this.query.find({
                $or: searchConditions
            });
        }
        return this;
    }
    searchforDanhMucDoan() {
        if (this.queryString.search) {
            const searchTerm = this.queryString.search;
            const searchTermNoAccent = removeVietnameseAccents(searchTerm).toLowerCase();

            const fields = [ 'tenDoan', 'quocTich', 'nguoiDaiDien'];

            // Tạo điều kiện tìm kiếm cho cả có dấu và không dấu
            const searchConditions = fields.flatMap(field => ([
                {
                    [field]: {
                        $regex: searchTerm,
                        $options: 'i'
                    }
                },
                {
                    [field]: {
                        $regex: searchTermNoAccent,
                        $options: 'i'
                    }
                }
            ]));

            this.query = this.query.find({
                $or: searchConditions
            });
        }
        return this;
    }
    // Các phương thức khác như filter, sort, limitFields, paginate... không thay đổi
    // 2) FILTERING
    filter() {
        const { limit, page, sort, search, fields , ...queryObj } = this.queryString;
         if (this.queryString.year) {
        const year = this.queryString.year;
        const start = new Date(`${year}-01-01T00:00:00.000Z`);
        const end = new Date(`${parseInt(year) + 1}-01-01T00:00:00.000Z`);
        queryObj.thoiGianBatDau = { gte: start.toISOString(), lt: end.toISOString() };
    }
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    // 3) SORTING
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    // 4) FIELD LIMITING
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            console.log('Selecting fields:',fields); // test log
            this.query = this.query.select(fields);
            console.log(this.query)
        } else {
            console.log('Default select: -__v');
            this.query = this.query.select('-__v');
        }
        return this;
    }
    

    // 5) PAGINATION
    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeatures;
