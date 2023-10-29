import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UsersEntity } from './database/entity/users.entity';
import { CreateAdminDTO } from './dto/create-admin.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserRegisterDTO } from './dto/register-user.dto';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

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

    const newAdmin: CreateAdminDTO = {
      email: email.trim(),
      full_name: full_name,
      password: encryptPassword,
      image_avatar: 'https://i.ibb.co/3BtQdVD/pet-shop.png',
      role_id: 2,
      status_id: 1,
    };
    console.log(newAdmin, 'NEW ADMIN');
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
  async userRegister(body: UserRegisterDTO): Promise<UsersEntity | unknown> {
    const { email, full_name, password } = body;

    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const encryptPassword = await bcrypt.hash(password, genSalt);

    const newUser: UserRegisterDTO = {
      email: email.trim(),
      full_name: full_name,
      password: encryptPassword,
      image_avatar: 'https://i.ibb.co/3BtQdVD/pet-shop.png',
      role_id: 3,
      status_id: 1,
    };
    console.log(newUser, 'NEW USER');
    await this.usersRepository.userRegister(newUser);
    return new HttpException('Registered Successfully', HttpStatus.OK);
  }
}
