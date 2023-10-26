/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VendorsService } from './vendors.service';
// import { VendorsDTO } from './dto/vendors.dto';
import { ConfigModule } from '@nestjs/config';
import { VendorsEntity } from './entity/vendors.entity';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.PATH;
// -------------------------------------------------------

@Controller(`${path}/vendors`)
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}
  @UsePipes(new ValidationPipe({ transform: true }))

  // 1. Get All
  @Get()
  async getAllVendors() {
    const result = await this.vendorsService.getAllVendors();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  async getDetailVendor(@Param('id') id: number): Promise<VendorsEntity> {
    const result: VendorsEntity = await this.vendorsService.getDetailVendor(id);
    return result;
  }

  //   // 3. Add
  //   @Post()
  //   async addVendor(req, res) {
  //     const { name } = req.body;
  //     const result = await vendorsService.addVendor(name);
  //     return res.status(result.status).json(result);
  //   }

  //   // 4. Delete
  //   @Delete()
  //   async deleteVendor(req, res) {
  //     const vendorId = req.params.vendorId;
  //     const result = await vendorsService.deleteVendor(vendorId);
  //     return res.status(result.status).json(result);
  //   }

  //   // 5. Update
  //   @Patch()
  //   async updateVendor(req, res) {
  //     const { name } = req.body;
  //     const vendorId = req.params.vendorId;
  //     const result = await vendorsService.updateVendor(name, vendorId);
  //     return res.status(result.status).json(result);
  //   }
}
