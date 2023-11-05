import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDTO } from './dto/createCoupon.dto';
import { UpdateCouponDTO } from './dto/updateCoupon.dto';
import { ConfigModule } from '@nestjs/config';
import { CouponsEntity } from './database/entity/coupons.entity';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationAdminGuard } from 'src/guards/authorizationAdmin.guard';

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
  async getDetailCoupon(
    @Param('id') id: number,
  ): Promise<CouponsEntity | unknown> {
    const result: CouponsEntity | unknown =
      await this.couponsService.getDetailCoupon(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async addCoupon(
    @Body() body: CreateCouponDTO,
  ): Promise<CouponsEntity | unknown> {
    const result: string | unknown = await this.couponsService.addCoupon(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async deleteCoupon(
    @Param('id') id: number,
  ): Promise<CouponsEntity | unknown> {
    const result: string | unknown = await this.couponsService.deleteCoupon(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async updateCoupon(
    @Param('id') id: number,
    @Body() body: UpdateCouponDTO,
  ): Promise<CouponsEntity | unknown> {
    const result = await this.couponsService.updateCoupon(id, body);
    return result;
  }
}
