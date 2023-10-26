/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { VendorsDTO } from './dto/vendors.dto';
import { VendorsEntity } from './entity/vendors.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VendorsRepository {
  constructor(
    @InjectRepository(VendorsEntity)
    private vendorsEntity: Repository<VendorsEntity>,
  ) {}

  // 1. Get All
  async getAllVendors() {
    return 'All';
  }

  // 2. Get Detail
  async getDetailVendor(id: number): Promise<VendorsEntity | unknown> {
    const detailVendor = await this.vendorsEntity.findOneById(id);
    if (detailVendor) {
      return detailVendor;
    } else {
      return new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
