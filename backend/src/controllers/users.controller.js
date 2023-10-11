const connectMySQL = require("../configs/db.config.js");
const usersEntity = require("../entities/users.entity.js");
const userRolesEntity = require("../entities/userRoles.entity.js");
const userStatusesEntity = require("../entities/userStatuses.entity.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersService = require("../services/users.services.js");

// ---------------------------------------------------------
class UsersController {
  // 1. Get All Users
  async getAllUsers(req, res) {
    const listUsers = await usersService.getAllUsers();
    res.status(listUsers.status).json(listUsers.data);
  }

  // 2. Get Detail Payment
  async getDetailUser(req, res) {
    const userId = req.params.userId;
    const detailUser = await usersService.getDetailUser(userId);
    res.status(detailUser.status).json(detailUser.data);
  }

  // 3. Register User (Customer)
  async userRegister(req, res) {
    const data = req.body;
    const result = await usersService.userRegister(data);
    res.status(result.status).json(result);
  }

  // 4. Add Admin (By Admin)
  async addAdmin(req, res) {
    const data = req.body;
    const result = await usersService.addAdmin(data);
    res.status(result.status).json(result);
  }

  // 5. Add User (Optional)
  async createUser(req, res) {
    const { email, full_name, password, status_id, role_id } = req.body;
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
      if (!status_id) {
        return res.status(406).json({ message: "Status ID must not be blank" });
      }
      if (!role_id) {
        return res.status(406).json({ message: "Role ID must not be blank" });
      }

      const findEmail = await usersService.createUser(email);
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
        status_id: status_id,
        role_id: role_id,
        image_avatar: "https://i.ibb.co/3BtQdVD/pet-shop.png",
      };
      console.log(userInfo, "userInfo");
      const newUser = await usersEntity.create(userInfo);
      res
        .status(200)
        .json({ message: "User Added Successfully", data: newUser });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 6. Delete User
  async deleteUser(req, res) {
    const userId = req.params.userId;
    const result = await usersService.deleteUser(userId);
    res.status(result.status).json(result);
  }

  // 7. Update User
  async updateUser(req, res) {
    const { full_name } = req.body;
    const userId = req.params.userId;

    try {
      const findUser = await usersEntity.findOne({ where: { id: userId } });
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
      const newUser = await usersEntity.update(updatedUser, {
        where: { id: userId },
      });
      res.status(200).json({
        message: "User Updated Successfully",
        dataUpdated: newUser,
      });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 8. Edit Password
  async changePassword(req, res) {
    const userId = req.params.userId;
    const data = req.body;
    const result = await usersService.changePassword(userId, data);
    res.status(result.status).json(result);
  }

  // 9. Change Status
  async changeStatus(req, res) {
    const userId = req.params.userId;
    try {
      const findUser = await usersEntity.findOne({ where: { id: userId } });
      if (!findUser) {
        return res.status(404).json({ message: "User is not exist" });
      }
      const dataUser = findUser.dataValues;
      const updatedUser = {
        status_id:
          dataUser.status_id === 1
            ? (dataUser.status_id = 2)
            : (dataUser.status_id = 1),
      };
      const resultUpdate = await usersEntity.update(updatedUser, {
        where: { id: userId },
      });
      res.status(200).json({ message: "Status Changed", data: resultUpdate });
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

    const result = await usersService.editAvatar(userId, avatar);
    res.status(result.status).json(result);
  }

  // 11. User Login
  async userLogin(req, res) {
    const { email, password } = req.body;
    try {
      const findUser = await usersEntity.findOne({ where: { email: email } });
      if (!findUser) {
        res.status(404).json({ message: "Email is not exist" });
      }
      const dataUser = findUser.dataValues;
      console.log(dataUser, "dataUser");
      // Sau khi check User thành công sẽ check Password gửi lên đúng không
      const checkPass = await bcrypt.compare(password, dataUser.password); // 2 tham số (password gửi lên, password trong db)
      console.log(checkPass, ")))))");
      if (!checkPass) {
        return res.status(401).json({ message: "Password is not correct" });
      } else {
        const { password, ...data } = dataUser;

        // Mã hóa thông tin
        const jwtData = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET); // Mã Token để biết ai đăng nhập
        return res.status(200).json({
          msg: "Login successfully",
          accessToken: jwtData,
          data: data,
        });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new UsersController();
