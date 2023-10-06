const connectMySQL = require("../configs/db.config.js");
const usersModel = require("../models/users.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class UsersController {
  // 1. Get All Payments
  async getAllUsers(req, res) {
    try {
      const listUsers = await usersModel.findAll(); // include: <Tên bảng>
      res.status(200).json(listUsers);
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Payment
  async getDetailUser(req, res) {
    try {
      const userId = req.params.userId;
      const detailUser = await usersModel.findOne({
        where: { id: userId },
      });
      if (!detailUser) {
        return res.status(404).json({ message: "User ID Not Found" });
      } else {
        return res.status(200).json(detailUser);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Register User (Customer)
  async registerUser(req, res) {
    const { email, full_name, password, rePassword } = req.body;

    console.log(req.body, " req.body");
    try {
      if (!email) {
        return res.status(406).json({ message: "Email must not be blank" });
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(406).json({ message: "Invalid Email Format" });
      }
      if (!full_name) {
        return res.status(406).json({ message: "Full Name must not be blank" });
      }
      if (!/^[a-zA-Z\s]*$/.test(full_name)) {
        return res.status(406).json({
          message: "Full Name cannot contain special characters or numbers",
        });
      }
      if (!password) {
        return res.status(406).json({ message: "Password must not be blank" });
      }
      if (password.length < 8) {
        return res
          .status(406)
          .json({ message: "Password must be at least 8 characters" });
      }
      if (!rePassword) {
        return res
          .status(406)
          .json({ message: "RePassword must not be blank" });
      }
      if (password !== rePassword) {
        return res
          .status(406)
          .json({ message: "Password must be the same Repassword" });
      }

      const findEmail = await usersModel.findOne({ where: { email: email } });
      if (findEmail) {
        return res.status(409).json({ message: "Email is exist" });
      }

      const salt = 10;
      const genSalt = await bcrypt.genSalt(salt);
      const encryptPassword = await bcrypt.hash(password, genSalt);

      const userInfo = {
        email: email.trim(),
        full_name: full_name,
        password: encryptPassword,
        status: 1,
        role: 2, // Thêm tài khoản với Role là Customer
        image_avatar: "https://i.ibb.co/3BtQdVD/pet-shop.png",
      };
      console.log(userInfo, "userInfo");
      const newUser = await usersModel.create(userInfo);
      res
        .status(200)
        .json({ message: "User Register Successfully", data: userInfo });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Add User (Admin)
  async addUser(req, res) {
    const { email, full_name, password, rePassword } = req.body;
    try {
      if (!email) {
        return res.status(406).json({ message: "Email must not be blank" });
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(406).json({ message: "Invalid Email Format" });
      }
      if (!full_name) {
        return res.status(406).json({ message: "Full Name must not be blank" });
      }
      if (!/^[a-zA-Z\s]*$/.test(full_name)) {
        return res.status(406).json({
          message: "Full Name cannot contain special characters or numbers",
        });
      }
      if (!password) {
        return res.status(406).json({ message: "Password must not be blank" });
      }
      if (password.length < 8) {
        return res
          .status(406)
          .json({ message: "Password must be at least 8 characters" });
      }
      if (!rePassword) {
        return res
          .status(406)
          .json({ message: "RePassword must not be blank" });
      }
      if (password !== rePassword) {
        return res
          .status(406)
          .json({ message: "Password must be the same Repassword" });
      }

      const findEmail = await usersModel.findOne({ where: { email: email } });
      if (findEmail) {
        return res.status(409).json({ message: "Email is exist" });
      }

      const salt = 10;
      const genSalt = await bcrypt.genSalt(salt);
      const encryptPassword = await bcrypt.hash(password, genSalt);

      const userInfo = {
        email: email.trim(),
        full_name: full_name,
        password: encryptPassword,
        status: 1,
        role: 1, // Thêm tài khoản với Role là Admin
        image_avatar: "https://i.ibb.co/3BtQdVD/pet-shop.png",
      };
      console.log(userInfo, "userInfo");
      const newUser = await usersModel.create(userInfo);
      res
        .status(200)
        .json({ message: "User Added Successfully", data: userInfo });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Add User (Optional)
  async createUser(req, res) {
    const { email, full_name, password, status, role } = req.body;
    try {
      if (!email) {
        return res.status(406).json({ message: "Email must not be blank" });
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(406).json({ message: "Invalid Email Format" });
      }
      if (!full_name) {
        return res.status(406).json({ message: "Full Name must not be blank" });
      }
      if (!/^[a-zA-Z\s]*$/.test(full_name)) {
        return res.status(406).json({
          message: "Full Name cannot contain special characters or numbers",
        });
      }
      if (!password) {
        return res.status(406).json({ message: "Password must not be blank" });
      }
      if (password.length < 8) {
        return res
          .status(406)
          .json({ message: "Password must be at least 8 characters" });
      }
      if (!status) {
        return res
          .status(406)
          .json({ message: "Status must be 1 (Active) or 2 (Inactive)" });
      }
      if (status !== 1 && status !== 2) {
        return res
          .status(406)
          .json({ message: "Status must be 1 (Active) or 2 (Inactive)" });
      }
      if (!role) {
        return res
          .status(406)
          .json({ message: "Status must be 1 (Admin) or 2 (Customer)" });
      }
      if (role !== 1 && role !== 2) {
        return res
          .status(406)
          .json({ message: "Status must be 1 (Admin) or 2 (Customer)" });
      }

      const findEmail = await usersModel.findOne({ where: { email: email } });
      if (findEmail) {
        return res.status(409).json({ message: "Email is exist" });
      }

      const salt = 10;
      const genSalt = await bcrypt.genSalt(salt);
      const encryptPassword = await bcrypt.hash(password, genSalt);

      const userInfo = {
        email: email.trim(),
        full_name: full_name,
        password: encryptPassword,
        status: status,
        role: role,
        image_avatar: "https://i.ibb.co/3BtQdVD/pet-shop.png",
      };
      console.log(userInfo, "userInfo");
      const newUser = await usersModel.create(userInfo);
      res
        .status(200)
        .json({ message: "User Added Successfully", data: userInfo });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 6. Delete User
  async deleteUser(req, res) {
    try {
      const userId = req.params.userId;
      const findUser = await usersModel.findOne({
        where: { id: userId },
      });
      if (!findUser) {
        return res.status(404).json({ message: "User ID Not Found" });
      } else {
        const deleteUser = await usersModel.destroy({
          where: { id: userId },
        });
        return res
          .status(200)
          .json({ message: "User Deleted", dataDeleted: findUser });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 7. Update User
  async updateUser(req, res) {
    const { full_name } = req.body;
    const userId = req.params.userId;

    try {
      const findUser = await usersModel.findOne({ where: { id: userId } });
      if (!findUser) {
        return res.status(404).json({ message: "User is not exist" });
      }

      if (full_name && !/^[a-zA-Z\s]*$/.test(full_name)) {
        return res.status(406).json({
          message: "Full Name cannot contain special characters or numbers",
        });
      }

      const dataUser = findUser.dataValues;

      const updatedUser = {
        full_name: !full_name ? dataUser.full_name : full_name,
      };
      console.log(req.body, "req.body");

      console.log(updatedUser, "updatedUser");
      const newUser = await usersModel.update(updatedUser, {
        where: { id: userId },
      });
      res.status(200).json({
        message: "User Updated Successfully",
        dataUpdated: updatedUser,
      });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 8. Edit Password
  async changePassword(req, res) {
    const { oldPassword, newPassword } = req.body;
    const userId = req.params.userId;
    try {
      const findUser = await usersModel.findOne({ where: { id: userId } });

      if (!findUser) {
        return res.status(404).json({ message: "User is not exist" });
      }
      if (!oldPassword) {
        return res
          .status(406)
          .json({ message: "Please enter your current password" });
      }
      const dataUser = findUser.dataValues;
      const checkPass = await bcrypt.compare(oldPassword, dataUser.password);
      if (!checkPass) {
        return res
          .status(406)
          .json({ message: "Old password is not correct!" });
      }

      if (!newPassword) {
        return res
          .status(406)
          .json({ message: "Please enter your new password" });
      }
      if (newPassword.length < 8) {
        return res
          .status(406)
          .json({ message: "New Password must have > 8 characters" });
      }
      if (oldPassword === newPassword) {
        return res.status(406).json({
          message: "Old Password must not be the same to New Password",
        });
      }

      const salt = 10;
      const genSalt = await bcrypt.genSalt(salt);
      const encryptPassword = await bcrypt.hash(newPassword, genSalt);

      const userInfo = {
        password: encryptPassword,
      };

      const updatedUser = await usersModel.update(userInfo, {
        where: { id: userId },
      });
      res.status(200).json({ message: "Password Changed Successfully" });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 9. Change Status
  async changeStatus(req, res) {
    const userId = req.params.userId;
    try {
      const findUser = await usersModel.findOne({ where: { id: userId } });
      if (!findUser) {
        return res.status(404).json({ message: "User is not exist" });
      }
      const dataUser = findUser.dataValues;
      const updatedUser = {
        status:
          dataUser.status === 1 ? (dataUser.status = 2) : (dataUser.status = 1),
      };
      const resultUpdate = await usersModel.update(updatedUser, {
        where: { id: userId },
      });
      res.status(200).json({ message: "Status Changed" });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 10. Change Avatar
  async editAvatar(req, res) {
    const userId = req.params.userId;
    const avatar = req.file
      ? req.file.filename
      : "https://i.ibb.co/3BtQdVD/pet-shop.png";
    console.log(avatar, "AVATAR");
    try {
      const updatedUser = {
        image_avatar: avatar,
      };
      const resultUpdate = await usersModel.update(updatedUser, {
        where: { id: userId },
      });
      res.status(200).json({ message: "Avatar Changed" });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new UsersController();
