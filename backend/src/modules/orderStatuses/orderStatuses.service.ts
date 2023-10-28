import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserStatusesRepository } from './orderStatuses.repository';
import { UserStatusesEntity } from './database/entity/orderStatuses.entity';
import { CreateUserStatusDTO } from './dto/create-orderStatus.dto';
import { UpdateUserStatusDTO } from './dto/update-orderStatus.dto';

@Injectable()
export class UserStatusesService {
  constructor(
    private readonly userStatusesRepository: UserStatusesRepository,
  ) {}

  // 1. Get All
  async getAllUsersStatuses() {
    const result = await this.userStatusesRepository.getAllUsersStatuses();
    return result;
  }

  // 2. Get Detail
  async getDetailUsersStatus(
    id: number,
  ): Promise<UserStatusesEntity | unknown> {
    const detailUsersStatus: UserStatusesEntity | unknown =
      await this.userStatusesRepository.getDetailUsersStatus(id);
    if (detailUsersStatus) {
      return detailUsersStatus;
    } else {
      return new HttpException(
        'UsersStatus ID Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // 3. Add
  async addUsersStatus(
    body: CreateUserStatusDTO,
  ): Promise<UserStatusesEntity | unknown> {
    const { name } = body;
    console.log(body, 'AFAS');
    const newUsersStatus = {
      name: name,
    };
    await this.userStatusesRepository.addUsersStatus(newUsersStatus);
    return new HttpException('UsersStatus Added', HttpStatus.OK);
  }

  // 4. Delete
  async deleteUsersStatus(id: number): Promise<UserStatusesEntity | unknown> {
    const checkUsersStatus =
      await this.userStatusesRepository.getDetailUsersStatus(id);
    if (checkUsersStatus) {
      await this.userStatusesRepository.deleteUsersStatus(id);
      return new HttpException('UsersStatus Deleted', HttpStatus.OK);
    } else {
      return new HttpException(
        'UsersStatus ID Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // 5. Update
  async updateUsersStatus(
    id: number,
    body: UpdateUserStatusDTO,
  ): Promise<UserStatusesEntity | unknown> {
    const { name } = body;
    const checkUsersStatus: UserStatusesEntity =
      await this.userStatusesRepository.getDetailUsersStatus(id);
    if (checkUsersStatus) {
      const updateUsersStatus = {
        name: !name ? checkUsersStatus.name : name,
      };
      await this.userStatusesRepository.updateUsersStatus(
        id,
        updateUsersStatus,
      );
      return new HttpException('UsersStatus Updated', HttpStatus.OK);
    } else {
      return new HttpException(
        'UsersStatus ID Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
