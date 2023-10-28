import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CouponsRepository } from './coupons.repository';
import { CouponsEntity } from './database/entity/coupons.entity';
import { CreateCouponDTO } from './dto/create-coupon.dto';
import { UpdateCouponDTO } from './dto/update-coupon.dto';

@Injectable()
export class CouponsService {
  constructor(private readonly couponsRepository: CouponsRepository) {}

  // 1. Get All
  async getAllCoupons() {
    const result = await this.couponsRepository.getAllCoupons();
    return result;
  }

  // 2. Get Detail
  async getDetailCoupon(id: number): Promise<CouponsEntity | unknown> {
    const detailCoupon: CouponsEntity | unknown =
      await this.couponsRepository.getDetailCoupon(id);
    if (detailCoupon) {
      return detailCoupon;
    }
  }

  // 3. Add
  async addCoupon(body: CreateCouponDTO): Promise<CouponsEntity | unknown> {
    const { name, code, discount_rate, min_bill } = body;
    const newCoupon = {
      name: name,
      code: code,
      discount_rate: discount_rate,
      min_bill: min_bill,
    };
    await this.couponsRepository.addCoupon(newCoupon);
    return new HttpException('Coupon Added', HttpStatus.OK);
  }

  // 4. Delete
  async deleteCoupon(id: number): Promise<CouponsEntity | unknown> {
    const checkCoupon = await this.couponsRepository.getDetailCoupon(id);
    if (checkCoupon) {
      await this.couponsRepository.deleteCoupon(id);
      return new HttpException('Coupon Deleted', HttpStatus.OK);
    }
  }

  // 5. Update
  async updateCoupon(
    id: number,
    body: UpdateCouponDTO,
  ): Promise<CouponsEntity | unknown> {
    const { name, code, discount_rate, min_bill } = body;
    const checkCoupon: CouponsEntity =
      await this.couponsRepository.getDetailCoupon(id);
    if (checkCoupon) {
      const updateCoupon = {
        name: !name ? checkCoupon.name : name,
        code: !code ? checkCoupon.code : code,
        discount_rate: !discount_rate
          ? checkCoupon.discount_rate
          : discount_rate,
        min_bill: !min_bill ? checkCoupon.min_bill : min_bill,
      };
      await this.couponsRepository.updateCoupon(id, updateCoupon);
      return new HttpException('Coupon Updated', HttpStatus.OK);
    }
  }
}
