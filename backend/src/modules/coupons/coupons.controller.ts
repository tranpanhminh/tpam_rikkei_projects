import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDTO } from './dto/create-coupon.dto';
import { UpdateCouponDTO } from './dto/update-coupon.dto';
import { ConfigModule } from '@nestjs/config';
import { CouponsEntity } from './database/entity/coupons.entity';
import { IsCouponExist } from 'src/interceptors/checkCouponExist';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/coupons`)
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  // 1. Get All
  @Get()
  async getAllCoupons() {
    const result = await this.couponsService.getAllCoupons();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  @UseInterceptors(IsCouponExist)
  async getDetailCoupon(
    @Param('id') id: number,
  ): Promise<CouponsEntity | unknown> {
    const result: CouponsEntity | unknown =
      await this.couponsService.getDetailCoupon(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  async addCoupon(
    @Body() body: CreateCouponDTO,
  ): Promise<CouponsEntity | unknown> {
    const result: string | unknown = await this.couponsService.addCoupon(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  @UseInterceptors(IsCouponExist)
  async deleteCoupon(
    @Param('id') id: number,
  ): Promise<CouponsEntity | unknown> {
    const result: string | unknown = await this.couponsService.deleteCoupon(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  @UseInterceptors(IsCouponExist)
  async updateCoupon(
    @Param('id') id: number,
    @Body() body: UpdateCouponDTO,
  ): Promise<CouponsEntity | unknown> {
    const result = await this.couponsService.updateCoupon(id, body);
    return result;
  }
}
