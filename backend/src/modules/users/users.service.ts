/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UsersEntity } from './database/entity/users.entity';
import { CreateAdminDTO } from './dto/createAdmin.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UsersInterface } from './interface/users.interface';
import { UpdateStatusUserDTO } from './dto/changeStatusUser.dto';
import { UpdatePasswordDTO } from './dto/updatePassword.dto';
import { ChangePasswordDTO } from './dto/changePassword.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UpdateAvatarDTO } from './dto/updateAvatar.dto';
import { LoginDTO } from './dto/login.dto';
import { DataTokenInterface } from './interface/dataToken.interface';
import { UserInfoLoginInterface } from './interface/userInfoLogin.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as generator from 'generate-password';
import { EmailService } from '../email/email.service';
import { ResetPasswordDTO } from './dto/resetPassword.dto';
import * as jwt from 'jsonwebtoken';
// import { MyGateway } from '../gateway/gateway';

const FRONTEND_PATH = process.env.FRONTEND_PATH;

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly emailService: EmailService,
    // private readonly myGateway: MyGateway,
  ) {}

  // 1. Get All
  async getAllUsers() {
    const result = await this.usersRepository.getAllUsers();
    return result;
  }

  // 2. Get Detail
  async getDetailUser(id: number): Promise<UsersEntity | unknown> {
    const detailUser: UsersEntity | unknown =
      await this.usersRepository.getDetailUser(id);
    if (detailUser) {
      return detailUser;
    }
  }

  // 3. Add
  async addAdmin(body: CreateAdminDTO): Promise<UsersEntity | unknown> {
    const { email, full_name, password } = body;

    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const encryptPassword = await bcrypt.hash(password, genSalt);

    const newAdmin: UsersInterface = {
      email: email.trim(),
      full_name: full_name,
      password: encryptPassword,
      image_avatar:
        'https://rabbunny.com/wp-content/uploads/2023/11/pet-shop.png',
      role_id: 2,
      status_id: 1,
    };

    await this.usersRepository.addAdmin(newAdmin);
    return new HttpException('Admin Added', HttpStatus.OK);
  }

  // 4. Delete
  async deleteUser(id: number): Promise<UsersEntity | unknown> {
    const checkUser = await this.usersRepository.getDetailUser(id);
    if (checkUser) {
      await this.usersRepository.deleteUser(id);
      return new HttpException('User Deleted', HttpStatus.OK);
    }
  }

  // 5. Update
  async updateUser(
    id: number,
    body: UpdateUserDTO,
  ): Promise<UsersEntity | unknown> {
    const { full_name } = body;
    const checkUser: UsersEntity = await this.usersRepository.getDetailUser(id);
    if (checkUser) {
      const updateUser = {
        full_name: !full_name ? checkUser.full_name.trim() : full_name.trim(),
      };
      await this.usersRepository.updateUser(id, updateUser);
      // this.myGateway.alertUpdateName();
      return new HttpException('User Updated', HttpStatus.OK);
    }
  }

  // 6. Register
  async userRegister(body: UsersInterface): Promise<UsersEntity | unknown> {
    const { email, full_name, password } = body;

    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const encryptPassword = await bcrypt.hash(password, genSalt);

    const newUser: UsersInterface = {
      email: email.trim(),
      full_name: full_name,
      password: encryptPassword,
      image_avatar:
        'https://rabbunny.com/wp-content/uploads/2023/11/pet-shop.png',
      role_id: 3,
      status_id: 1,
    };
    await this.usersRepository.userRegister(newUser);
    return new HttpException('Registered Successfully', HttpStatus.OK);
  }

  // 7. Login
  async login(body: LoginDTO): Promise<DataTokenInterface> {
    const { email } = body;
    const checkUser: UserInfoLoginInterface =
      await this.usersRepository.getDetailUserByEmail(email);

    const { password, created_at, updated_at, ...dataUser } = checkUser;
    // Mã hóa thông tin
    const jwtData = await jwt.sign(dataUser, process.env.ACCESS_TOKEN_SECRET); // Mã Token để biết ai đăng nhập

    return {
      message: 'Login successfully',
      accessToken: jwtData,
      data: dataUser,
      status: 200,
    };
  }

  // 8. Change Status
  async changeStatus(id: number): Promise<UsersEntity | unknown> {
    const checkUser: UsersEntity = await this.usersRepository.getDetailUser(id);
    if (checkUser) {
      const updatedStatus: UpdateStatusUserDTO = {
        status_id:
          checkUser.status_id == 1
            ? (checkUser.status_id = 2)
            : (checkUser.status_id = 1),
      };
      await this.usersRepository.changeStatus(id, updatedStatus);
      return new HttpException('User Status Updated', HttpStatus.OK);
    }
  }

  // 9. Change Status
  async changePassword(
    id: number,
    body: ChangePasswordDTO,
  ): Promise<UsersEntity | unknown> {
    const { new_password } = body;
    const checkUser: UsersEntity = await this.usersRepository.getDetailUser(id);

    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const encryptPassword = await bcrypt.hash(new_password, genSalt);

    if (checkUser) {
      const updatedPassword: UpdatePasswordDTO = {
        password: encryptPassword,
      };
      await this.usersRepository.changePassword(id, updatedPassword);
      return new HttpException('Password Changed Successfully', HttpStatus.OK);
    }
  }

  // 10. Create User
  async createUser(body: CreateAdminDTO): Promise<UsersEntity | unknown> {
    const { email, full_name, password, role_id, status_id } = body;

    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const encryptPassword = await bcrypt.hash(password, genSalt);

    const newUser: UsersInterface = {
      email: email.trim(),
      full_name: full_name,
      password: encryptPassword,
      image_avatar:
        'https://lh3.googleusercontent.com/pw/ADCreHc2tQfUrpVQ-_3-wfBetd3zGM9geB02UM1_hd5ieuUU06hShvCrKe3j2tC5JH49OsRDqynoeWdJhMpGh7NJKePGZM6mz2b9MQh7mTzXGuSlH3lAvpTqs2aRdTfHQvpNq-CrBpY_mj6eDrfL5b9JOSaGzLcjmJk7yE7NeM-fNHOvH6fzljl79iAfGg-IaxnPLDLSQIQ6P5o15xesaV8QoXjg9wovNB9wx-y9z8FyDvDpXD2Bhx3f7y2Fp3EMe_Q7aEF3vJyHvQWOOC_jwJHDGi4SZUiGslR-WVB_AYg_wAQ77863KpPYSK8mOb1neY1RoYUyzinObiuMxpdtzlipjZm5_yyWxNqHY2iK2RuPcURFd7zamiDNVKZTQzeliFBBQyM3B-947sLocC2_TAwctBefWLeW_QSqM_RYzL5Ml2wuBG1UiLO-FBpBrN7yegdqMfMrNeRxSFSOHlcgqa0Z_9m9o_N-XYc-d7tkRXNzhm9eW3rPfV7105TYkwFR3-ME9ugyeeXioJVysxCXiZgQAUbPp5PUcmN_LHTUh-q0f8XLE6ijibKJW_oJvvDGWwJnvrrclrcnBin27DBGPYsboOqnBYnOt141fNnSGZXmu1Rvf0YDTW82q8VeN74nglej27P-KgGAdYMiJo2utT30Ukfx6dh0FTQGkkOzEe6od-KNTdBPeSKD27M5H0ii7RZHBrcPzI_o9-6balt7rNf3jiz_L2oWol8nR5cUAwSAZQ2IQfkL8GBZji4lT0esxZbY6_rmUtol9oC47c8hm-kRzjtJoz15Fd1dml3SJzmo6FPI6Pl7IRN6UZP7-TwE6HS9FdBBS_-JBRAOKxgW5q50YQR5iN5aB5_-plry_sZ2XUMbbT3opzXjgajgwpsfD2TRd19ja78ZmSeVXHG8POZDfWqxFg=w350-h350-s-no-gm?authuser=0',
      role_id: role_id,
      status_id: status_id,
    };

    await this.usersRepository.addAdmin(newUser);
    return new HttpException('Admin Added', HttpStatus.OK);
  }

  // 11. Edit Avatar
  async editAvatar(
    id: number,
    body: UpdateAvatarDTO,
  ): Promise<UsersEntity | unknown> {
    const fileUploaded: any = body.image_avatar;
    const checkUser: UsersEntity = await this.usersRepository.getDetailUser(id);
    if (checkUser) {
      const result = await this.cloudinaryService.uploadFile(fileUploaded);
      const image_url = result.secure_url;
      const updateAvatar: UsersInterface = {
        ...checkUser,
        image_avatar: image_url,
      };
      await this.usersRepository.editAvatar(id, updateAvatar);
      // this.myGateway.alertUpdateAvatar();
      return new HttpException('User Avatar Updated', HttpStatus.OK);
    }
  }

  // Google Auth
  async getGoogleLoginUrl(res): Promise<any> {
    return res.json({ url: 'http://localhost:7373/api/users/google/callback' });
  }

  // 12. Google Login
  async googleLogin(req, res): Promise<any> {
    if (!req.user) {
      return 'No user from google';
    }

    const dataUserGoogleLogin = req.user;
    // Kiểm tra xem email đã có trong hệ thống hay chưa
    const checkEmail: UsersInterface =
      await this.usersRepository.getDetailUserByEmail(
        dataUserGoogleLogin.email,
      );

    if (checkEmail) {
      const { password, created_at, updated_at, ...dataUser } = checkEmail;
      const jwtData = await jwt.sign(dataUser, process.env.ACCESS_TOKEN_SECRET); // Mã Token để biết ai đăng nhập
      const data = {
        message: 'Login successfully',
        accessToken: jwtData,
        data: dataUser,
        status: 200,
      };
      // return { accessToken: jwtData };
      // this.myGateway.alertGoogleLogin();
      return res.redirect(`${FRONTEND_PATH}/?googleAuth=${jwtData}`);
    } else {
      // Nếu chưa có thì tạo tài khoản mới và push vào DB
      const newPassword = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
      });

      const salt = 10;
      const genSalt = await bcrypt.genSalt(salt);
      const encryptPassword = await bcrypt.hash(newPassword, genSalt);

      const newUser: UsersInterface = {
        email: dataUserGoogleLogin.email,
        full_name: `${dataUserGoogleLogin.firstName} ${dataUserGoogleLogin.lastName}`,
        password: encryptPassword,
        image_avatar: `${dataUserGoogleLogin.picture}`,
        role_id: 3,
        status_id: 1,
      };

      await this.usersRepository.userRegister(newUser);
      const { password, ...dataUser } = newUser;
      const jwtData = await jwt.sign(dataUser, process.env.ACCESS_TOKEN_SECRET); //
      const data = {
        message: 'Login successfully',
        accessToken: jwtData,
        data: dataUser,
        status: 200,
      };
      // return { accessToken: jwtData };
      // this.myGateway.alertGoogleLogin();
      return res.redirect(`${FRONTEND_PATH}/?googleAuth=${jwtData}`);
    }
  }

  // 13. Reset Password
  async requestResetPassword(body) {
    const { email } = body;
    const user: UsersInterface =
      await this.usersRepository.getDetailUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    // Tạo token reset mật khẩu và lưu nó vào cơ sở dữ liệu
    const resetToken = await jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: '300s',
    });
    const updatedUser = {
      ...user,
      reset_token: resetToken,
    };
    await this.usersRepository.updateUser(user.id, updatedUser);

    // Gửi email chứa liên kết reset đến người dùng
    const subject = 'Password Reset Request - [PetShop]';
    const htmlContent = `<h3>Reset Password Petshop Website</h3>
    <p>You have requested a password reset.</p>
    <p>Click on the button below to reset your password:</p>
    <a href="${FRONTEND_PATH}/reset-password/?resetToken=${resetToken}"><button>Reset Password</button></a>
    <p>This link is only exist in 5 minutes</p>
    `;
    // return result;
    await this.emailService.sendEmail(email, subject, htmlContent);
    return new HttpException(
      'Password reset link sent to your email.',
      HttpStatus.OK,
    );
  }

  async resetNewPassword(token: string, body: ResetPasswordDTO) {
    const { password } = body;
    const user =
      await this.usersRepository.getDetailUserByTokenResetPassword(token);

    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const encryptPassword = await bcrypt.hash(password, genSalt);

    const updatedUser: UsersInterface = {
      ...user,
      password: encryptPassword,
      reset_token: null,
    };
    await this.usersRepository.updateUser(user.id, updatedUser);
    return new HttpException('Password Reset Successfully', HttpStatus.OK);
  }

  // 14. Get Detail
  async getDetailUserByTokenResetPassword(
    token: string,
  ): Promise<UsersEntity | unknown> {
    const detailUser: UsersInterface =
      await this.usersRepository.getDetailUserByTokenResetPassword(token);
    const { id, ...dataUser } = detailUser;
    const data = {
      id: id,
      reset_token: dataUser.reset_token,
    };
    if (detailUser) {
      return data;
    }
  }
}
