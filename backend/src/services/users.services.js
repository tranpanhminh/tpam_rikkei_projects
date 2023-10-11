const usersRepo = require("../repository/users.repository.js");
const bcrypt = require("bcryptjs");

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
  async addUser(data) {
    const { email, full_name, password, rePassword } = data;

    if (!email) {
      return { message: "Email must not be blank", status: 406 };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { message: "Invalid Email Format", status: 406 };
    }
    if (!full_name) {
      return { message: "Full Name must not be blank", status: 406 };
    }
    if (!/^[a-zA-Z\s]*$/.test(full_name)) {
      return {
        message: "Full Name cannot contain special characters or numbers",
        status: 406,
      };
    }
    if (!password) {
      return { message: "Password must not be blank", status: 406 };
    }
    if (password.length < 8) {
      return { message: "Password must be at least 8 characters", status: 406 };
    }
    if (!rePassword) {
      return { message: "RePassword must not be blank", status: 406 };
    }
    if (password !== rePassword) {
      return { message: "Password must be the same Repassword", status: 406 };
    }

    const findEmail = await usersRepo.findOneByEmail(email);
    if (findEmail) {
      return { message: "Email is exist", status: 409 };
    }

    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const encryptPassword = await bcrypt.hash(password, genSalt);

    const userInfo = {
      email: email.trim(),
      full_name: full_name,
      password: encryptPassword,
      status_id: 1,
      role_id: 2, // Thêm tài khoản với Role là Admin
      image_avatar: "https://i.ibb.co/3BtQdVD/pet-shop.png",
    };
    console.log(userInfo, "userInfo");
    const newUser = await usersRepo.addUser(userInfo);
    return {
      message: "New Admin Added Successfully",
      data: newUser,
      status: 200,
    };
  }

  // 5. Add User (Optional)
  async createUser(email) {
    const findEmail = await usersRepo.createUser(email);
    return findEmail;
  }
}

module.exports = new UsersService();
