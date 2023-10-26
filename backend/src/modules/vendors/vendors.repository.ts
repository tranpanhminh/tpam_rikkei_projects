/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
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

  // Get All
  async getAllVendors() {
    return 'All';
  }

  // Get Detail
  async getDetailVendor(id: number): Promise<VendorsEntity | null> {
    return this.vendorsEntity.findOneBy({ id });
  }
}
