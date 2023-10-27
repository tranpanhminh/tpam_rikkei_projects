import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRolesRepository } from './userRoles.repository';
import { UserRolesEntity } from './database/entity/userRoles.entity';
import { CreateUserRoleDTO } from './dto/create-userRole.dto';
import { UpdateUserRoleDTO } from './dto/update-userRole.dto';

@Injectable()
export class UserRolesService {
  constructor(private readonly userRolesRepository: UserRolesRepository) {}

  // 1. Get All
  async getAllUserRoles() {
    const result = await this.userRolesRepository.getAllUserRoles();
    return result;
  }

  // 2. Get Detail
  async getDetailUserRole(id: number): Promise<UserRolesEntity | unknown> {
    const detailUserRole: UserRolesEntity | unknown =
      await this.userRolesRepository.getDetailUserRole(id);
    if (detailUserRole) {
      return detailUserRole;
    } else {
      return new HttpException('UserRole ID Not Found', HttpStatus.NOT_FOUND);
    }
  }

  // 3. Add
  async addUserRole(
    body: CreateUserRoleDTO,
  ): Promise<UserRolesEntity | unknown> {
    const { name } = body;
    console.log(body, 'AFAS');
    const newUserRole = {
      name: name,
    };
    await this.userRolesRepository.addUserRole(newUserRole);
    return new HttpException('UserRole Added', HttpStatus.OK);
  }

  // 4. Delete
  async deleteUserRole(id: number): Promise<UserRolesEntity | unknown> {
    const checkUserRole = await this.userRolesRepository.getDetailUserRole(id);
    if (checkUserRole) {
      await this.userRolesRepository.deleteUserRole(id);
      return new HttpException('UserRole Deleted', HttpStatus.OK);
    } else {
      return new HttpException('UserRole ID Not Found', HttpStatus.NOT_FOUND);
    }
  }

  // 5. Update
  async updateUserRole(
    id: number,
    body: UpdateUserRoleDTO,
  ): Promise<UserRolesEntity | unknown> {
    const { name } = body;
    const checkUserRole: UserRolesEntity =
      await this.userRolesRepository.getDetailUserRole(id);
    if (checkUserRole) {
      const updateUserRole = {
        name: !name ? checkUserRole.name : name,
      };
      await this.userRolesRepository.updateUserRole(id, updateUserRole);
      return new HttpException('UserRole Updated', HttpStatus.OK);
    } else {
      return new HttpException('UserRole ID Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
