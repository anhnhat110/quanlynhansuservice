const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const taiKhoanRouter = require('./routers/taiKhoanRouter');
const userRouter = require('./routers/userRouter');
const chuyenGiaRoutes = require('./routers/chuyenGiaRouter');
const suKienRoutes = require('./routers/suKienRouter');

const app = express();

// 1. MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// Cấu hình CORS
app.use(cors({
  origin: 'https://quanlynhansu-six.vercel.app', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  credentials: true // Cho phép gửi cookie
}));

// Xử lý yêu cầu OPTIONS
app.options('*', cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});



// 2. ROUTES
app.use('/api/v1/taikhoans', taiKhoanRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/chuyengias', chuyenGiaRoutes);
app.use('/api/v1/sukiens', suKienRoutes);

// Xử lý lỗi 404


// 3. START SERVER
module.exports = app;
