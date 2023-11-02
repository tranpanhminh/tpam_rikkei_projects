import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { CouponsRepository } from 'src/modules/coupons/coupons.repository';

@Injectable()
export class CheckCouponExist implements NestMiddleware {
  constructor(private readonly couponsRepository: CouponsRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getId = req.params.id;
    const findUser = await this.couponsRepository.getDetailCoupon(getId);
    if (!findUser) {
      throw new NotFoundException('Coupon ID is not found');
    }
    next();
  }
}
