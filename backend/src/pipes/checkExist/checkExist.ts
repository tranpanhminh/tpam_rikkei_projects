import { Injectable, PipeTransform } from '@nestjs/common';
import { ValidatorConstraint } from 'class-validator';
import { CouponsRepository } from '../../modules/coupons/coupons.repository';

@ValidatorConstraint({ name: 'CouponExistRule', async: true })
@Injectable()
export class CouponExistRule implements PipeTransform {
  constructor(private readonly couponsRepository: CouponsRepository) {}

  async transform(value: number) {
    const checkCoupon = await this.couponsRepository.getDetailCoupon(value);
    console.log(checkCoupon, 'Dasds');
    if (!checkCoupon) {
      return false;
    }
    return true;
  }
}
