import {
  Injectable,
  NotFoundException,
  NestMiddleware,
  NotAcceptableException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { UsersRepository } from 'src/modules/users/users.repository';
import { ProductsRepository } from 'src/modules/products/products.repository';

@Injectable()
export class CheckProductAndUserBeforeAddToCart implements NestMiddleware {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getProductId = req.params.id;
    const getUserId = req.params.userId;
    const findProduct =
      await this.productsRepository.getDetailProduct(getProductId);
    const findUser = await this.usersRepository.getDetailUser(getUserId);

    if (!findProduct) {
      throw new NotFoundException('Product ID is not found');
    }

    if (!findUser) {
      throw new NotFoundException('User ID is not found');
    } else {
      if (findUser.role_id == 1 || findUser.role_id == 2) {
        throw new NotAcceptableException('Admin is not allowed');
      }
      if (findUser.status_id == 2) {
        throw new NotAcceptableException(
          "You can't add because your account is Inactive",
        );
      }
    }
    next();
  }
}
