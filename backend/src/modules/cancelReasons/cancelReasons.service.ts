import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CancelReasonsRepository } from './cancelReasons.repository';
import { CancelReasonsEntity } from './database/entity/cancelReasons.entity';
import { CreateCancelReasonDTO } from './dto/create-cancelReason.dto';
import { UpdateCancelReasonDTO } from './dto/update-cancelReason.dto';

@Injectable()
export class CancelReasonsService {
  constructor(
    private readonly cancelReasonsRepository: CancelReasonsRepository,
  ) {}

  // 1. Get All
  async getAllPostsStatuses() {
    const result = await this.cancelReasonsRepository.getAllPostsStatuses();
    return result;
  }

  // 2. Get Detail
  async getDetailPostsStatus(
    id: number,
  ): Promise<CancelReasonsEntity | unknown> {
    const detailPostsStatus: CancelReasonsEntity | unknown =
      await this.cancelReasonsRepository.getDetailPostsStatus(id);
    if (detailPostsStatus) {
      return detailPostsStatus;
    } else {
      return new HttpException(
        'CancelReason ID Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // 3. Add
  async addPostsStatus(
    body: CreateCancelReasonDTO,
  ): Promise<CancelReasonsEntity | unknown> {
    const { name } = body;
    console.log(body, 'AFAS');
    const newPostsStatus = {
      name: name,
    };
    await this.cancelReasonsRepository.addPostsStatus(newPostsStatus);
    return new HttpException('CancelReason Added', HttpStatus.OK);
  }

  // 4. Delete
  async deletePostsStatus(id: number): Promise<CancelReasonsEntity | unknown> {
    const checkPostsStatus =
      await this.cancelReasonsRepository.getDetailPostsStatus(id);
    if (checkPostsStatus) {
      await this.cancelReasonsRepository.deletePostsStatus(id);
      return new HttpException('CancelReason Deleted', HttpStatus.OK);
    } else {
      return new HttpException(
        'CancelReason ID Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // 5. Update
  async updatePostsStatus(
    id: number,
    body: UpdateCancelReasonDTO,
  ): Promise<CancelReasonsEntity | unknown> {
    const { name } = body;
    const checkPostsStatus: CancelReasonsEntity =
      await this.cancelReasonsRepository.getDetailPostsStatus(id);
    if (checkPostsStatus) {
      const updatePostsStatus = {
        name: !name ? checkPostsStatus.name : name,
      };
      await this.cancelReasonsRepository.updatePostsStatus(
        id,
        updatePostsStatus,
      );
      return new HttpException('CancelReason Updated', HttpStatus.OK);
    } else {
      return new HttpException(
        'CancelReason ID Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
