/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
// import { VendorsDTO } from './dto/vendors.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendorsEntity } from './database/entity/vendors.entity';
import { CreateVendorDTO } from './dto/create-vendor.dto';
import { UpdateVendorDTO } from './dto/update-vendor.dto';

@Injectable()
export class VendorsRepository {
  constructor(
    @InjectRepository(VendorsEntity)
    private vendorsEntity: Repository<VendorsEntity>,
  ) {}

  // 1. Get All
  async getAllVendors() {
    return await this.vendorsEntity.find();
  }

  // 2. Get Detail
  async getDetailVendor(id: number): Promise<VendorsEntity> {
    const detailVendor = await this.vendorsEntity.findOneById(id);
    return detailVendor;
  }

  // 3. Add
  async addVendor(
    newVendor: CreateVendorDTO,
  ): Promise<VendorsEntity | unknown> {
    return await this.vendorsEntity.save(newVendor);
  }

  // 4. Add
  async deleteVendor(id: number): Promise<VendorsEntity | unknown> {
    return await this.vendorsEntity.delete(id);
  }

  // 5. Update
  async updateVendor(
    id: number,
    updateVendor: UpdateVendorDTO,
  ): Promise<VendorsEntity | unknown> {
    return await this.vendorsEntity.update(id, updateVendor);
  }
}
