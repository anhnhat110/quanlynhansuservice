const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRouter = require('./routers/userRouter');
const chuyenGiaRoutes = require('./routers/chuyenGiaRouter');
const suKienRoutes = require('./routers/suKienRouter');
const sinhVienRoutes = require('./routers/sinhvienRouter');
const danhMucDoanRoutes = require('./routers/danhMucDoanRouter');
const app = express();

// 1. MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));

// Cấu hình CORS
app.use(
  cors({
    origin: [
      'https://quanlynhansu-six.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    credentials: true,
  })
);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2. ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/danhmucdoans', danhMucDoanRoutes);
app.use('/api/v1/chuyengias', chuyenGiaRoutes);
app.use('/api/v1/sukiens', suKienRoutes);
app.use('/api/v1/sinhviens', sinhVienRoutes);

// 3. ERROR HANDLING
// 404 Not Found
app.use((req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Không tìm thấy tuyến đường: ${req.originalUrl}`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Lỗi máy chủ nội bộ',
  });
});

module.exports = app;