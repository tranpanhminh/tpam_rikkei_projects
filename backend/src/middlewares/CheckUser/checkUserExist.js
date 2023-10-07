const usersModel = require("../../models/users.model.js");

const checkUserExist = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const findUser = await usersModel.findOne({ where: { id: userId } });
    if (!findUser) {
      return res.status(404).json({ message: "User is not exist" });
    }
    next();
  } catch (error) {
    console.log(error, "ERROR");
  }
};

module.exports = checkUserExist;
