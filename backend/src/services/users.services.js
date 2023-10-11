const usersRepo = require("../repository/users.repository.js");

class UsersService {
  async getAllUsers() {
    const listUsers = await usersRepo.getAllUsers();
    return listUsers;
  }

  async getDetailUser(userId) {
    const detailUser = await usersRepo.getDetailUser(userId);
    return detailUser;
  }
}

module.exports = new UsersService();
