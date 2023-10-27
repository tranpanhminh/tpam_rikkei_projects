import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRolesEntity } from './database/entity/userRoles.entity';
import { CreateUserRoleDTO } from './dto/create-userRole.dto';
import { UpdateUserRoleDTO } from './dto/update-userRole.dto';

@Injectable()
export class UserRolesRepository {
  constructor(
    @InjectRepository(UserRolesEntity)
    private userRolesEntity: Repository<UserRolesEntity>,
  ) {}

  // 1. Get All
  async getAllUserRoles() {
    return await this.userRolesEntity.find();
  }

  // 2. Get Detail
  async getDetailUserRole(id: number): Promise<UserRolesEntity> {
    const detailUserRole = await this.userRolesEntity.findOneById(id);
    return detailUserRole;
  }

  // 3. Add
  async addUserRole(
    newUserRole: CreateUserRoleDTO,
  ): Promise<UserRolesEntity | unknown> {
    return await this.userRolesEntity.save(newUserRole);
  }

  // 4. Add
  async deleteUserRole(id: number): Promise<UserRolesEntity | unknown> {
    return await this.userRolesEntity.delete(id);
  }

  // 5. Update
  async updateUserRole(
    id: number,
    updateUserRole: UpdateUserRoleDTO,
  ): Promise<UserRolesEntity | unknown> {
    return await this.userRolesEntity.update(id, updateUserRole);
  }
}
