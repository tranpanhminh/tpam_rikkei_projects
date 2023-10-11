const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersService = require("../services/users.service.js");

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

  // 5. Create User (Optional)
  async createUser(req, res) {
    const data = req.body;
    const result = await usersService.createUser(data);
    res.status(result.status).json(result);
  }

  // 6. Delete User
  async deleteUser(req, res) {
    const userId = req.params.userId;
    const result = await usersService.deleteUser(userId);
    res.status(result.status).json(result);
  }

  // 7. Update User
  async updateUser(req, res) {
    const data = req.body;
    const userId = req.params.userId;
    const result = await usersService.updateUser(data, userId);
    return res.status(result.status).json(result);
  }

  // 8. Edit Password
  async changePassword(req, res) {
    const userId = req.params.userId;
    const data = req.body;
    const result = await usersService.changePassword(userId, data);
    res.status(result.status).json(result);
  }

  // 9. Change Status (Admin)
  async changeStatus(req, res) {
    const userId = req.params.userId;
    const data = req.body;
    const result = await usersService.changeStatus(userId, data);
    res.status(result.status).json(result);
  }

  // 10. Edit Avatar
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
    const data = req.body;
    const result = await usersService.userLogin(data);
    res.status(result.status).json(result);
  }
}
module.exports = new UsersController();
