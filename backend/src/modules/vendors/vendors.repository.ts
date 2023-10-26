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

  async getAllVendors() {
    return 'All';
  }

  async getDetailVendor(id: number): Promise<VendorsEntity | null> {
    return this.vendorsEntity.findOneBy({ id });
  }
}
