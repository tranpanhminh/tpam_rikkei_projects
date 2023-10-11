const usersRepo = require("../repository/users.repository.js");

class UsersService {
  // 1. Get All Users
  async getAllUsers() {
    const listUsers = await usersRepo.getAllUsers();
    return listUsers;
  }

  // 2. Get Detail User
  async getDetailUser(userId) {
    const detailUser = await usersRepo.getDetailUser(userId);
    return detailUser;
  }

  // 3. Register User (Customer)
  async userRegister(email) {
    const findEmail = await usersRepo.userRegister(email);
    return findEmail;
  }

  // 4. Add User (By Admin)
  async addUser(email) {
    const findEmail = await usersRepo.addUser(email);
    return findEmail;
  }

  // 5. Add User (Optional)
  async createUser(email) {
    const findEmail = await usersRepo.createUser(email);
    return findEmail;
  }
}

module.exports = new UsersService();
