import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDTO } from './dto/create-vendor.dto';
import { UpdateVendorDTO } from './dto/update-vendor.dto';
import { ConfigModule } from '@nestjs/config';
import { VendorsEntity } from './database/entity/vendors.entity';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------

@Controller(`${path}/vendors`)
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  // 1. Get All
  @Get()
  async getAllVendors(): Promise<VendorsEntity[]> {
    const result: VendorsEntity[] = await this.vendorsService.getAllVendors();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  async getDetailVendor(
    @Param('id') id: number,
  ): Promise<VendorsEntity | unknown> {
    const result: VendorsEntity | unknown =
      await this.vendorsService.getDetailVendor(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  async addVendor(
    @Body() body: CreateVendorDTO,
  ): Promise<VendorsEntity | unknown> {
    const result: string | unknown = await this.vendorsService.addVendor(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  async deleteVendor(
    @Param('id') id: number,
  ): Promise<VendorsEntity | unknown> {
    const result: string | unknown = await this.vendorsService.deleteVendor(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  async updateVendor(
    @Param('id') id: number,
    @Body() body: UpdateVendorDTO,
  ): Promise<VendorsEntity | unknown> {
    const result = await this.vendorsService.updateVendor(id, body);
    return result;
  }
}
