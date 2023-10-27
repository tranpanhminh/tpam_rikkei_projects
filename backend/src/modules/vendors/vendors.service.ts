import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { VendorsRepository } from './vendors.repository';
import { VendorsEntity } from './database/entity/vendors.entity';
import { CreateVendorDTO } from './dto/create-vendor.dto';
import { UpdateVendorDTO } from './dto/update-vendor.dto';

@Injectable()
export class VendorsService {
  constructor(private readonly vendorsRepository: VendorsRepository) {}

  // 1. Get All
  async getAllVendors(): Promise<VendorsEntity[]> {
    const result: VendorsEntity[] =
      await this.vendorsRepository.getAllVendors();
    return result;
  }

  // 2. Get Detail
  async getDetailVendor(id: number): Promise<VendorsEntity | unknown> {
    const detailVendor: VendorsEntity | unknown =
      await this.vendorsRepository.getDetailVendor(id);
    if (detailVendor) {
      return detailVendor;
    } else {
      return new HttpException('Vendor ID Not Found', HttpStatus.NOT_FOUND);
    }
  }

  // 3. Add
  async addVendor(body: CreateVendorDTO): Promise<VendorsEntity | unknown> {
    const { name } = body;
    const newVendor = {
      name: name,
    };
    await this.vendorsRepository.addVendor(newVendor);
    return new HttpException('Vendor Added', HttpStatus.OK);
  }

  // 4. Delete
  async deleteVendor(id: number): Promise<VendorsEntity | unknown> {
    const checkVendor = await this.vendorsRepository.getDetailVendor(id);
    if (checkVendor) {
      await this.vendorsRepository.deleteVendor(id);
      return new HttpException('Vendor Deleted', HttpStatus.OK);
    } else {
      return new HttpException('Vendor ID Not Found', HttpStatus.NOT_FOUND);
    }
  }

  // 5. Update
  async updateVendor(
    id: number,
    body: UpdateVendorDTO,
  ): Promise<VendorsEntity | unknown> {
    const { name } = body;
    const checkVendor: VendorsEntity =
      await this.vendorsRepository.getDetailVendor(id);
    if (checkVendor) {
      const updateVendor = {
        name: !name ? checkVendor.name : name,
      };
      await this.vendorsRepository.updateVendor(id, updateVendor);
      return new HttpException('Vendor Updated', HttpStatus.OK);
    } else {
      return new HttpException('Vendor ID Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
