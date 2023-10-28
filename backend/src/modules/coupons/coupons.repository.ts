import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CouponsEntity } from './database/entity/coupons.entity';
import { CreateCouponDTO } from './dto/create-coupon.dto';
import { UpdateCouponDTO } from './dto/update-coupon.dto';

@Injectable()
export class CouponsRepository {
  constructor(
    @InjectRepository(CouponsEntity)
    public couponsEntity: Repository<CouponsEntity>,
  ) {}

  // 1. Get All
  async getAllCoupons() {
    return await this.couponsEntity.find();
  }

  // 2. Get Detail
  async getDetailCoupon(id: number): Promise<CouponsEntity> {
    const detailCoupon = await this.couponsEntity.findOneById(id);
    return detailCoupon;
  }

  // 3. Add
  async addCoupon(
    newCoupon: CreateCouponDTO,
  ): Promise<CouponsEntity | unknown> {
    return await this.couponsEntity.save(newCoupon);
  }

  // 4. Add
  async deleteCoupon(id: number): Promise<CouponsEntity | unknown> {
    return await this.couponsEntity.delete(id);
  }

  // 5. Update
  async updateCoupon(
    id: number,
    updateCoupon: UpdateCouponDTO,
  ): Promise<CouponsEntity | unknown> {
    return await this.couponsEntity.update(id, updateCoupon);
  }
}
