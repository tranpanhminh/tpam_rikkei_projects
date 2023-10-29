import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './database/entity/users.entity';
import { CreateAdminDTO } from './dto/create-admin.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserRegisterDTO } from './dto/register-user.dto';

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
  async getDetailUser(id: any): Promise<UsersEntity> {
    const detailUser = await this.usersEntity.findOne({
      where: { id: id },
      relations: { user_roles: true, user_statuses: true },
    });
    return detailUser;
  }

  // 3. Add
  async addAdmin(newAdmin: any): Promise<UsersEntity | unknown> {
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
  async userRegister(body: UserRegisterDTO): Promise<UsersEntity | unknown> {
    const result = await this.usersEntity.save(body);
    return result;
  }
}
