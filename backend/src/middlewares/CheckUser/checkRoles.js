// Check Role gọi là Authorization
// Check Đăng nhập gọi là Authentication
const checkRole = (req, res, next) => {
  try {
    const roleNum = req.user.role_id;

    if (roleNum == 3) {
      next();
    } else if (roleNum == 1 || roleNum == 2) {
      res.status(406).json({ message: "Admin is not allowed" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = checkRole;
