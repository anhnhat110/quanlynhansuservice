const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1. Cấu hình transporter với Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,      // Gmail của bạn
      pass: process.env.GMAIL_APP_PASS   // App Password từ Gmail
    }
  });

  // 2. Tùy chọn email với nội dung HTML
  const mailOptions = {
    from: `"Hệ thống quản lý 👨‍💻" <${process.env.GMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: `
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            padding: 20px;
            background-color: #4a90e2;
            color: white;
            border-radius: 8px 8px 0 0;
          }
          .content {
            padding: 20px;
            text-align: center;
            color: #333;
          }
          .otp {
            font-size: 24px;
            font-weight: bold;
            color: #4a90e2;
            margin: 20px 0;
            letter-spacing: 2px;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4a90e2;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
          .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Khôi phục mật khẩu</h1>
          </div>
          <div class="content">
            <p>Xin chào ${options.name || 'Người dùng'},</p>
            <p>Bạn đã yêu cầu khôi phục mật khẩu cho tài khoản của mình. Dưới đây là đường link để đặt lại mật khẩu:</p>
            
            <p>Link này có hiệu lực trong <strong>10 phút</strong>. Vui lòng không chia sẻ link này với bất kỳ ai.</p>
            ${options.resetLink ? `<a href="${options.resetLink}" class="button">Đặt lại mật khẩu ngay</a>` : ''}
            <p>Nếu bạn không yêu cầu điều này, hãy bỏ qua email này hoặc liên hệ hỗ trợ.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Hệ thống quản lý. Đã đăng ký bản quyền.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  // 3. Gửi email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;