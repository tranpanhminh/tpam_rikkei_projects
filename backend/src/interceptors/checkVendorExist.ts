import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VendorsRepository } from './../modules/vendors/vendors.repository';

@Injectable()
export class CheckVendorExist implements NestInterceptor {
  constructor(private vendorsRepository: VendorsRepository) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const getId = context.switchToHttp().getRequest().params.id;
    const find = await this.vendorsRepository.getDetailVendor(getId);
    if (!find) {
      throw new NotFoundException('Vendor ID is not found');
    }
    return next.handle().pipe(
      catchError((error) => {
        // Handle any other errors that might occur
        return throwError(error);
      }),
    );
  }
}
