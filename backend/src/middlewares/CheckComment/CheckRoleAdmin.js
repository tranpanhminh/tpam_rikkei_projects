// Check Role gọi là Authorization
// Check Đăng nhập gọi là Authentication
const checkRole = (req, res, next) => {
  try {
    const user = req.user;
    if (
      (user.role_id == 1 && user.status_id == 1) ||
      (user.role_id == 2 && user.status_id == 1)
    ) {
      next();
    } else if (user.role_id !== 1 || user.role_id !== 2) {
      res.status(406).json({ message: "You're not allowed" });
    } else if (
      user.role_id == 1 ||
      (user.role_id == 2 && user.status_id !== 1)
    ) {
      res.status(406).json({
        message: "You can't process because your account is Inactive",
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = checkRole;
