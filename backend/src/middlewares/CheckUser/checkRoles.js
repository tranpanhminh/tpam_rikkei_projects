// Check Role gọi là Authorization
// Check Đăng nhập gọi là Authentication
const checkRole = (req, res, next) => {
  try {
    const roleNum = req.user.role;
    if (roleNum == 1) {
      next();
    } else if (roleNum == 2) {
      res.status(403).json({ message: "Forbidden" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = checkRole;
