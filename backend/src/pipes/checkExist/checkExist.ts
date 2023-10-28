/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CouponsRepository } from '../../modules/coupons/coupons.repository';

@ValidatorConstraint({ name: 'IsCouponExist', async: true })
@Injectable()
export class CouponExistRule implements ValidatorConstraintInterface {
  constructor(private couponsRepository: CouponsRepository) {}

  async validate(value: number) {
    const parseValue = Number(value);
    console.log(value, 'AAAA');
    console.log(this.couponsRepository, 'DASDSA');
    try {
      const test = await this.couponsRepository.getDetailCoupon(parseValue);
      return true;
    } catch (e) {
      return false;
    }
  }
}
