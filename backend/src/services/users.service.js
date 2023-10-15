const usersRepo = require("../repository/users.repository.js");
const bcrypt = require("bcryptjs");
const sourceImage = process.env.BASE_URL_IMAGE;
const jwt = require("jsonwebtoken");

class UsersService {
  // 1. Get All Users
  async getAllUsers() {
    const listUsers = await usersRepo.getAllUsers();
    if (listUsers.length === 0) {
      return { data: "No Data Users", status: 404 };
    } else {
      return { data: listUsers, status: 200 };
    }
  }

  // 2. Get Detail User
  async getDetailUser(userId) {
    const detailUser = await usersRepo.getDetailUser(userId);
    if (!detailUser) {
      return { data: "User Not Found", status: 404 };
    } else {
      return { data: detailUser, status: 200 };
    }
  }

  // 3. Register User (Customer)
  async userRegister(data) {
    const { email, full_name, password, rePassword } = data;
    const findEmail = await usersRepo.findOneByEmail(email);
    if (findEmail) {
      return { message: "Email is exist", status: 409 };
    }
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

    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const encryptPassword = await bcrypt.hash(password, genSalt);

    const userInfo = {
      email: email.trim(),
      full_name: full_name,
      password: encryptPassword,
      status_id: 1,
      role_id: 3, // Thêm tài khoản với Role là Admin
      image_avatar: "https://i.ibb.co/3BtQdVD/pet-shop.png",
    };
    console.log(userInfo, "userInfo");
    const newUser = await usersRepo.userRegister(userInfo);
    return {
      message: "User Register Successfully",
      data: newUser,
      status: 200,
    };
  }

  // 4. Add Admin (By Admin)
  async addAdmin(data) {
    const { email, full_name, password, rePassword } = data;
    const findEmail = await usersRepo.findOneByEmail(email);
    if (findEmail) {
      return { message: "Email is exist", status: 409 };
    }
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

    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const encryptPassword = await bcrypt.hash(password, genSalt);

    const userInfo = {
      email: email.trim().toLowerCase(),
      full_name: full_name,
      password: encryptPassword,
      status_id: 1,
      role_id: 2, // Thêm tài khoản với Role là Admin
      image_avatar: "https://i.ibb.co/3BtQdVD/pet-shop.png",
    };
    console.log(userInfo, "userInfo");
    const newUser = await usersRepo.addAdmin(userInfo);
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

  // 6. Delete User
  async deleteUser(userId) {
    const findUser = await usersRepo.findOneById(userId);
    if (!findUser) {
      return { status: 404, message: "User ID Not Found" };
    }

    await usersRepo.deleteUser(userId);
    return { status: 200, message: "User Deleted" };
  }

  // 7. Change Password
  async changePassword(userId, data) {
    const { oldPassword, newPassword } = data;
    const findUser = await usersRepo.findOneById(userId);

    if (!findUser) {
      return { message: "User is not exist", status: 404 };
    }
    if (!oldPassword) {
      return { message: "Please enter your current password", status: 406 };
    }
    const dataUser = findUser.dataValues;
    const checkPass = await bcrypt.compare(oldPassword, dataUser.password);
    if (!checkPass) {
      return { message: "Old password is not correct!", status: 406 };
    }

    if (!newPassword) {
      return { message: "Please enter your new password", status: 406 };
    }
    if (newPassword.length < 8) {
      return {
        message: "New Password must have > 8 characters",
        status: 406,
      };
    }
    if (oldPassword === newPassword) {
      return {
        message: "Old Password must not be the same to New Password",
        status: 406,
      };
    }

    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const encryptPassword = await bcrypt.hash(newPassword, genSalt);

    const updatedInfo = {
      password: encryptPassword,
    };

    const updatedUser = await usersRepo.changePassword(userId, updatedInfo);
    return {
      message: "Password Changed Successfully",
      data: updatedUser,
      status: 200,
    };
  }

  // 8. Change Status (Admin)
  async changeStatus(userId) {
    const findUser = await usersRepo.findOneById(userId);
    if (!findUser) {
      return { message: "User is not exist", status: 404 };
    }
    const dataUser = findUser.dataValues;
    const updatedUser = {
      status_id:
        dataUser.status_id === 1
          ? (dataUser.status_id = 2)
          : (dataUser.status_id = 1),
    };
    const resultUpdate = await usersRepo.changeStatus(updatedUser, userId);
    return { message: "Status Changed", data: resultUpdate, status: 200 };
  }

  // 9.Edit Avatar
  async editAvatar(userId, avatar) {
    const findUser = await usersRepo.findOneById(userId);

    if (!findUser) {
      return { message: "User is not exist", status: 404 };
    }
    const updatedUser = {
      image_avatar: sourceImage + avatar,
    };
    const result = await usersRepo.editAvatar(userId, updatedUser);
    return { message: "Avatar Changed", status: 200, data: result };
  }

  // 10. Create User
  async createUser(data) {
    const { email, full_name, password, status_id, role_id } = data;
    const findEmail = await usersRepo.findOneByEmail(email);
    if (findEmail) {
      return { message: "Email is exist", status: 409 };
    }
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
    if (!status_id) {
      return { message: "Status ID must not be blank", status: 406 };
    }
    if (!role_id) {
      return { message: "Status ID must not be blank", status: 406 };
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
    const newUser = await usersRepo.createUser(userInfo);
    return {
      message: "New Admin Added Successfully",
      data: newUser,
      status: 200,
    };
  }

  // 11. Update User
  async updateUser(data, userId) {
    const { full_name } = data;
    const findUser = await usersRepo.findOneById(userId);
    if (!findUser) {
      return { message: "User is not exist", status: 404 };
    }

    if (full_name && !/^[a-zA-Z\s]*$/.test(full_name)) {
      return {
        message: "Full Name cannot contain special characters or numbers",
        status: 406,
      };
    }

    const dataUser = findUser.dataValues;

    const userInfo = {
      full_name: !full_name ? dataUser.full_name.trim() : full_name.trim(),
    };

    const updatedUser = await usersRepo.updateUser(userInfo, userId);
    return {
      message: "User Updated Successfully",
      dataUpdated: userInfo,
      status: 200,
    };
  }

  // 12. User Login
  async userLogin(data) {
    const { email, password } = data;
    if (!email) {
      return { message: "Please fill Email", status: 406 };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { message: "Invalid Email Format", status: 406 };
    }

    const findUser = await usersRepo.findOneByEmail(email);
    if (!findUser) {
      return { message: "Email is not exist", status: 404 };
    }
    const dataUser = findUser.dataValues;
    // Sau khi check User thành công sẽ check Password gửi lên đúng không
    const checkPass = await bcrypt.compare(password, dataUser.password); // 2 tham số (password gửi lên, password trong db)

    if (!checkPass) {
      return { message: "Password is not correct", status: 406 };
    } else {
      const { password, created_at, updated_at, ...dataInfo } = dataUser;

      // Mã hóa thông tin
      const jwtData = jwt.sign(dataInfo, process.env.ACCESS_TOKEN_SECRET); // Mã Token để biết ai đăng nhập

      return {
        message: "Login successfully",
        accessToken: jwtData,
        data: dataInfo,
        status: 200,
      };
    }
  }
}

module.exports = new UsersService();
