import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductsRepository } from './../modules/products/products.repository';

@Injectable()
export class CheckProductExist implements NestInterceptor {
  constructor(private ProductsRepository: ProductsRepository) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const getId = context.switchToHttp().getRequest().params.id;
    const find = await this.ProductsRepository.getDetailProduct(getId);
    if (!find) {
      throw new NotFoundException('Product ID is not found');
    }
    return next.handle().pipe(
      catchError((error) => {
        // Handle any other errors that might occur
        return throwError(error);
      }),
    );
  }
}
