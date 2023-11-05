/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Injectable,
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
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
    private readonly cloudinaryService: CloudinaryService,
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
      image_avatar: 'https://i.ibb.co/3BtQdVD/pet-shop.png',
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
      image_avatar: 'https://i.ibb.co/3BtQdVD/pet-shop.png',
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
      image_avatar: 'https://i.ibb.co/3BtQdVD/pet-shop.png',
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
      return new HttpException('User Avatar Updated', HttpStatus.OK);
    }
  }
}
