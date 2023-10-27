import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersStatusesEntity } from './database/entity/usersStatuses.entity';
import { CreateUserStatusDTO } from './dto/create-userStatus.dto';
import { UpdateUserStatusDTO } from './dto/update-userStatus.dto';

@Injectable()
export class UsersStatusesRepository {
  constructor(
    @InjectRepository(UsersStatusesEntity)
    private usersStatusesEntity: Repository<UsersStatusesEntity>,
  ) {}

  // 1. Get All
  async getAllUsersStatuses() {
    return await this.usersStatusesEntity.find();
  }

  // 2. Get Detail
  async getDetailUsersStatus(id: number): Promise<UsersStatusesEntity> {
    const detailUsersStatus = await this.usersStatusesEntity.findOneById(id);
    return detailUsersStatus;
  }

  // 3. Add
  async addUsersStatus(
    newUsersStatus: CreateUserStatusDTO,
  ): Promise<UsersStatusesEntity | unknown> {
    return await this.usersStatusesEntity.save(newUsersStatus);
  }

  // 4. Add
  async deleteUsersStatus(id: number): Promise<UsersStatusesEntity | unknown> {
    return await this.usersStatusesEntity.delete(id);
  }

  // 5. Update
  async updateUsersStatus(
    id: number,
    updateUsersStatus: UpdateUserStatusDTO,
  ): Promise<UsersStatusesEntity | unknown> {
    return await this.usersStatusesEntity.update(id, updateUsersStatus);
  }
}
