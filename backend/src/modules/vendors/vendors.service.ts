import { Injectable } from '@nestjs/common';
import { VendorsRepository } from './vendors.repository';

@Injectable()
export class VendorsService {
  constructor(private readonly vendorsRepository: VendorsRepository) {}

  // 1. Get All
  async getAllVendors() {
    const result = await vendorsRepository.getAllVendors();
    return result;
  }
}
