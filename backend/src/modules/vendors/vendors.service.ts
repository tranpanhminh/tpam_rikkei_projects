import { Injectable } from '@nestjs/common';
import { VendorsRepository } from './vendors.repository';
// import { VendorsDTO } from './dto/vendors.dto';
import { VendorsEntity } from './entity/vendors.entity';

@Injectable()
export class VendorsService {
  constructor(private readonly vendorsRepository: VendorsRepository) {}

  // 1. Get All
  async getAllVendors() {
    const result = await this.vendorsRepository.getAllVendors();
    return result;
  }

  // 2. Get Detail
  async getDetailVendor(id: number): Promise<VendorsEntity | unknown> {
    const result: VendorsEntity | unknown =
      await this.vendorsRepository.getDetailVendor(id);
    return result;
  }
}
