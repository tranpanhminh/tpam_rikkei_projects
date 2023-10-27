import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStatusesEntity } from './database/entity/userStatuses.entity';
import { CreateUserStatusDTO } from './dto/create-userStatus.dto';
import { UpdateUserStatusDTO } from './dto/update-userStatus.dto';

@Injectable()
export class UserStatusesRepository {
  constructor(
    @InjectRepository(UserStatusesEntity)
    private userStatusesEntity: Repository<UserStatusesEntity>,
  ) {}

  // 1. Get All
  async getAllUsersStatuses() {
    return await this.userStatusesEntity.find();
  }

  // 2. Get Detail
  async getDetailUsersStatus(id: number): Promise<UserStatusesEntity> {
    const detailUsersStatus = await this.userStatusesEntity.findOneById(id);
    return detailUsersStatus;
  }

  // 3. Add
  async addUsersStatus(
    newUsersStatus: CreateUserStatusDTO,
  ): Promise<UserStatusesEntity | unknown> {
    return await this.userStatusesEntity.save(newUsersStatus);
  }

  // 4. Add
  async deleteUsersStatus(id: number): Promise<UserStatusesEntity | unknown> {
    return await this.userStatusesEntity.delete(id);
  }

  // 5. Update
  async updateUsersStatus(
    id: number,
    updateUsersStatus: UpdateUserStatusDTO,
  ): Promise<UserStatusesEntity | unknown> {
    return await this.userStatusesEntity.update(id, updateUsersStatus);
  }
}
