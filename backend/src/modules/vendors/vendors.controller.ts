import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { VendorsService } from './vendors.service';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  // 1. Get All
  @Get()
  async getAllVendors(req, res) {
    const result = await vendorsService.getAllVendors();
    return res.status(result.status).json(result.data);
  }

  //   // 2. Get Detail
  //   @Get()
  //   async getDetailVendor(req, res) {
  //     const vendorId = req.params.vendorId;
  //     const result = await vendorsService.getDetailVendor(vendorId);
  //     return res.status(result.status).json(result.data);
  //   }

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
