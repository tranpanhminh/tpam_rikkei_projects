import { IsCouponExist } from '../../../pipes/custom-validator';

export class couponIdDTO {
  @IsCouponExist({ message: 'Coupon ID is not exist' })
  readonly id: number;
}
