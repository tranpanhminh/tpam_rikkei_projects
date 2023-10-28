import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserStatusesRepository } from './userStatuses.repository';
import { UserStatusesEntity } from './database/entity/userStatuses.entity';
import { CreateUserStatusDTO } from './dto/create-userStatus.dto';
import { UpdateUserStatusDTO } from './dto/update-userStatus.dto';

@Injectable()
export class UserStatusesService {
  constructor(
    private readonly userStatusesRepository: UserStatusesRepository,
  ) {}

  // 1. Get All
  async getAllUserStatuses() {
    const result = await this.userStatusesRepository.getAllUsersStatuses();
    return result;
  }

  // 2. Get Detail
  async getDetailUserStatus(id: number): Promise<UserStatusesEntity | unknown> {
    const detailUsersStatus: UserStatusesEntity | unknown =
      await this.userStatusesRepository.getDetailUserStatus(id);
    if (detailUsersStatus) {
      return detailUsersStatus;
    } else {
      return new HttpException('UserStatus ID Not Found', HttpStatus.NOT_FOUND);
    }
  }

  // 3. Add
  async addUserStatus(
    body: CreateUserStatusDTO,
  ): Promise<UserStatusesEntity | unknown> {
    const { name } = body;
    const newUsersStatus = {
      name: name,
    };
    await this.userStatusesRepository.addUserStatus(newUsersStatus);
    return new HttpException('UserStatus Added', HttpStatus.OK);
  }

  // 4. Delete
  async deleteUserStatus(id: number): Promise<UserStatusesEntity | unknown> {
    const checkUsersStatus =
      await this.userStatusesRepository.getDetailUserStatus(id);
    if (checkUsersStatus) {
      await this.userStatusesRepository.deleteUserStatus(id);
      return new HttpException('UserStatus Deleted', HttpStatus.OK);
    } else {
      return new HttpException('UserStatus ID Not Found', HttpStatus.NOT_FOUND);
    }
  }

  // 5. Update
  async updateUserStatus(
    id: number,
    body: UpdateUserStatusDTO,
  ): Promise<UserStatusesEntity | unknown> {
    const { name } = body;
    const checkUsersStatus: UserStatusesEntity =
      await this.userStatusesRepository.getDetailUserStatus(id);
    if (checkUsersStatus) {
      const updateUsersStatus = {
        name: !name ? checkUsersStatus.name : name,
      };
      await this.userStatusesRepository.updateUserStatus(id, updateUsersStatus);
      return new HttpException('UsersStatus Updated', HttpStatus.OK);
    } else {
      return new HttpException(
        'UsersStatus ID Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
