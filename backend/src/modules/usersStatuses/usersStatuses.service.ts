import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersStatusesRepository } from './usersStatuses.repository';
import { UsersStatusesEntity } from './database/entity/usersStatuses.entity';
import { CreateUserStatusDTO } from './dto/create-userStatus.dto';
import { UpdateUserStatusDTO } from './dto/update-userStatus.dto';

@Injectable()
export class UsersStatusesService {
  constructor(
    private readonly usersStatusesRepository: UsersStatusesRepository,
  ) {}

  // 1. Get All
  async getAllUsersStatuses() {
    const result = await this.usersStatusesRepository.getAllUsersStatuses();
    return result;
  }

  // 2. Get Detail
  async getDetailUsersStatus(
    id: number,
  ): Promise<UsersStatusesEntity | unknown> {
    const detailUsersStatus: UsersStatusesEntity | unknown =
      await this.usersStatusesRepository.getDetailUsersStatus(id);
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
  ): Promise<UsersStatusesEntity | unknown> {
    const { name } = body;
    console.log(body, 'AFAS');
    const newUsersStatus = {
      name: name,
    };
    await this.usersStatusesRepository.addUsersStatus(newUsersStatus);
    return new HttpException('UsersStatus Added', HttpStatus.OK);
  }

  // 4. Delete
  async deleteUsersStatus(id: number): Promise<UsersStatusesEntity | unknown> {
    const checkUsersStatus =
      await this.usersStatusesRepository.getDetailUsersStatus(id);
    if (checkUsersStatus) {
      await this.usersStatusesRepository.deleteUsersStatus(id);
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
  ): Promise<UsersStatusesEntity | unknown> {
    const { name } = body;
    const checkUsersStatus: UsersStatusesEntity =
      await this.usersStatusesRepository.getDetailUsersStatus(id);
    if (checkUsersStatus) {
      const updateUsersStatus = {
        name: !name ? checkUsersStatus.name : name,
      };
      await this.usersStatusesRepository.updateUsersStatus(
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
