import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { VendorsRepository } from 'src/modules/vendors/vendors.repository';

@Injectable()
export class CheckVendorExist implements NestMiddleware {
  constructor(private vendorsRepository: VendorsRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getId = req.params.id;
    const find = await this.vendorsRepository.getDetailVendor(getId);
    if (!find) {
      throw new NotFoundException('Vendor ID is not found');
    }
    next();
  }
}
