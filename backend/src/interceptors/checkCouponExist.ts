import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CouponsRepository } from 'src/modules/coupons/coupons.repository';

@Injectable()
export class IsCouponExist implements NestInterceptor {
  constructor(private couponsRepository: CouponsRepository) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const getId = context.switchToHttp().getRequest().params.id;
    const checkCoupon = await this.couponsRepository.getDetailCoupon(getId);
    if (!checkCoupon) {
      console.log(new NotFoundException());
      throw new NotFoundException('Coupon ID is not found');
    }
    return next.handle().pipe(
      catchError((error) => {
        // Handle any other errors that might occur
        return throwError(error);
      }),
    );
  }
}
