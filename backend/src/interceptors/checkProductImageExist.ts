import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductImagesRepository } from 'src/modules/productImages/productImages.repository';

@Injectable()
export class CheckProductImageExist implements NestInterceptor {
  constructor(private productImagesRepository: ProductImagesRepository) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const getId = context.switchToHttp().getRequest().params.imageId;
    const find =
      await this.productImagesRepository.getDetailProductImage(getId);
    if (!find) {
      throw new NotFoundException('Image ID is not found');
    }
    return next.handle().pipe(
      catchError((error) => {
        // Handle any other errors that might occur
        return throwError(error);
      }),
    );
  }
}
