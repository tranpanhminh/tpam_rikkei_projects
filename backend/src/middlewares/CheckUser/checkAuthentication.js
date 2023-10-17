const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkAuthentication = (req, res, next) => {
  // Lấy phần header 'Authorization' từ request
  const authHeader = req.header("Authorization");
  console.log(authHeader, "AUTH HEADER");
  // Kiểm tra xem header 'Authorization' có tồn tại không
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" }); // Unauthorized
  }

  // Kiểm tra xem header 'Authorization' có chứa từ khóa 'Bearer' không
  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Unauthorized" }); // Unauthorized
  }

  const token = tokenParts[1];
  // Giải mã token và kiểm tra tính hợp lệ
  // Dịch ngược lại từ mã hóa (Ở file controllers)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json("Token is not valid"); // Forbidden
    }

    // Lưu thông tin người dùng vào request để sử dụng ở middleware tiếp theo
    req.user = user;

    // Cho phép request tiếp tục sang middleware hoặc route tiếp theo
    next();
  });
};

module.exports = checkAuthentication;
