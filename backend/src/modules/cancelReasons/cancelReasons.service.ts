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
  async getAllCancelReasons() {
    const result = await this.cancelReasonsRepository.getAllCancelReasons();
    return result;
  }

  // 2. Get Detail
  async getDetailCancelReason(
    id: number,
  ): Promise<CancelReasonsEntity | unknown> {
    const detailCancelReason: CancelReasonsEntity | unknown =
      await this.cancelReasonsRepository.getDetailCancelReason(id);
    if (detailCancelReason) {
      return detailCancelReason;
    } else {
      return new HttpException(
        'CancelReason ID Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // 3. Add
  async addCancelReason(
    body: CreateCancelReasonDTO,
  ): Promise<CancelReasonsEntity | unknown> {
    const { name } = body;
    console.log(body, 'AFAS');
    const newCancelReason = {
      name: name,
    };
    await this.cancelReasonsRepository.addCancelReason(newCancelReason);
    return new HttpException('CancelReason Added', HttpStatus.OK);
  }

  // 4. Delete
  async deleteCancelReason(id: number): Promise<CancelReasonsEntity | unknown> {
    const checkCancelReason =
      await this.cancelReasonsRepository.getDetailCancelReason(id);
    if (checkCancelReason) {
      await this.cancelReasonsRepository.deleteCancelReason(id);
      return new HttpException('CancelReason Deleted', HttpStatus.OK);
    } else {
      return new HttpException(
        'CancelReason ID Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // 5. Update
  async updateCancelReason(
    id: number,
    body: UpdateCancelReasonDTO,
  ): Promise<CancelReasonsEntity | unknown> {
    const { name } = body;
    const checkCancelReason: CancelReasonsEntity =
      await this.cancelReasonsRepository.getDetailCancelReason(id);
    if (checkCancelReason) {
      const updateCancelReason = {
        name: !name ? checkCancelReason.name : name,
      };
      await this.cancelReasonsRepository.updateCancelReason(
        id,
        updateCancelReason,
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
