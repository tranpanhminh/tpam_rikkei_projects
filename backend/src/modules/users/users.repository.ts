import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './database/entity/users.entity';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UsersInterface } from './interface/users.interface';
import { UpdateStatusUserDTO } from './dto/change-status-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { UserInfoLoginInterface } from './interface/userInfoLogin.interface';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UsersEntity)
    public usersEntity: Repository<UsersEntity>,
  ) {}

  // 1. Get All
  async getAllUsers() {
    return await this.usersEntity.find({
      relations: { user_roles: true, user_statuses: true },
    });
  }

  // 2. Get Detail
  async getDetailUser(id: number): Promise<UsersEntity> {
    const detailUser = await this.usersEntity.findOne({
      where: { id: id },
      relations: { user_roles: true, user_statuses: true },
    });
    return detailUser;
  }

  // 3. Add
  async addAdmin(newAdmin: UsersInterface): Promise<UsersEntity | unknown> {
    return await this.usersEntity.save(newAdmin);
  }

  // 4. Add
  async deleteUser(id: number): Promise<UsersEntity | unknown> {
    return await this.usersEntity.delete(id);
  }

  // 5. Update
  async updateUser(
    id: number,
    updateUser: UpdateUserDTO,
  ): Promise<UsersEntity | unknown> {
    return await this.usersEntity.update(id, updateUser);
  }

  // 6. Register
  async userRegister(body: UsersInterface): Promise<UsersEntity | unknown> {
    const result = await this.usersEntity.save(body);
    return result;
  }

  // 7. Change Status
  async changeStatus(
    id: number,
    updatedStatus: UpdateStatusUserDTO,
  ): Promise<UsersEntity | unknown> {
    return await this.usersEntity.update(id, updatedStatus);
  }

  // 8. Change Status
  async changePassword(
    id: number,
    updatedPassword: UpdatePasswordDTO,
  ): Promise<UsersEntity | unknown> {
    return await this.usersEntity.update(id, updatedPassword);
  }

  // 9. Create User
  async createUser(newUser: UsersInterface): Promise<UsersEntity | unknown> {
    return await this.usersEntity.save(newUser);
  }

  // 10. Edit Avatar
  async editAvatar(
    id: number,
    updatedAvatar: UsersInterface,
  ): Promise<UsersEntity | unknown> {
    return await this.usersEntity.update(id, updatedAvatar);
  }

  // 11. Get Detail User By Email
  async getDetailUserByEmail(email: string): Promise<UserInfoLoginInterface> {
    return await this.usersEntity.findOne({ where: { email: email } });
  }
}
