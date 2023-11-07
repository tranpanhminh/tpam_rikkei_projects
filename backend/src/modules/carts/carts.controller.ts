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
import { CartsService } from './carts.service';
import { AddToCartDTO } from './dto/addToCart.dto';
import { ConfigModule } from '@nestjs/config';
import { CartsEntity } from './database/entity/carts.entity';
import { UpdateQuantityProductInCartDTO } from './interface/update-quantity-product.interface';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationCustomerGuard } from 'src/guards/authorizationCustomer.guard';
import { AuthorizationAdminGuard } from 'src/guards/authorizationAdmin.guard';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/carts`)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  // 1. Get All
  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async getAllCarts() {
    const result = await this.cartsService.getAllCarts();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/users/:userId')
  @UseGuards(AuthenticationGuard, AuthorizationCustomerGuard)
  async getDetailCartByUser(
    @Param('userId') userId: number,
  ): Promise<CartsEntity | unknown> {
    const result: CartsEntity | unknown =
      await this.cartsService.getDetailCartByUser(userId);
    return result;
  }

  // 3. Add
  @Post('/add/products/:id/users/:userId')
  // @UseGuards(AuthenticationGuard, AuthorizationCustomerGuard)
  async addProductToCart(
    @Param() param: { id: number; userId: number },
    @Body() body: AddToCartDTO,
  ): Promise<CartsEntity | unknown> {
    const result: string | unknown = await this.cartsService.addProductToCart(
      param.id,
      param.userId,
      body,
    );
    return result;
  }

  // 4. Delete
  @Delete('/delete/products/:id/users/:userId')
  @UseGuards(AuthenticationGuard, AuthorizationCustomerGuard)
  async deleteProductFromUserCart(
    @Param() param: { id: number; userId: number },
  ): Promise<CartsEntity | unknown> {
    const result: string | unknown =
      await this.cartsService.deleteProductFromUserCart(param.id, param.userId);
    return result;
  }

  // 5. Delete All Products From User Cart
  @Delete('/delete/users/:userId')
  @UseGuards(AuthenticationGuard, AuthorizationCustomerGuard)
  async deleteAllProductsFromUserCart(
    @Param() param: { userId: number },
  ): Promise<CartsEntity | unknown> {
    const result: string | unknown =
      await this.cartsService.deleteAllProductsFromUserCart(param.userId);
    return result;
  }

  // 5. Update Quantity In Cart Page
  @Patch('/update/products/:id/users/:userId')
  @UseGuards(AuthenticationGuard, AuthorizationCustomerGuard)
  async updateQuantityProductInCart(
    @Param() param: { id: number; userId: number },
    @Body() body: UpdateQuantityProductInCartDTO,
  ): Promise<CartsEntity | unknown> {
    const result = await this.cartsService.updateQuantityProductInCart(
      param.id,
      param.userId,
      body,
    );
    return result;
  }
}
