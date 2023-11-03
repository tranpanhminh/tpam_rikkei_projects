import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { OrdersEntity } from './database/entity/orders.entity';
import { CheckOutOrderDTO } from './dto/checkOutOrder.dto';
import { CartsRepository } from '../carts/carts.repository';
import { BillInterface } from '../carts/interface/bill.interface';
import { CouponsInterface } from '../coupons/interface/coupons.interface';
import { CouponsRepository } from '../coupons/coupons.repository';
import { PaypalService } from '../paypal/paypal.service';
import { OrderItemsRepository } from '../orderItems/orderItems.repository';
import { ProductsRepository } from '../products/products.repository';
import { UsersRepository } from '../users/users.repository';
import { OrderItemsEntity } from '../orderItems/database/entity/orderItems.entity';
import { UpdateOrderDTO } from './dto/updateOrder.dto';
import * as paypal from 'paypal-rest-sdk';
import { OrdersInterface } from './interface/orders.interface';
import { CancelReasonsRepository } from '../cancelReasons/cancelReasons.repository';

const path = process.env.SERVER_PATH;
const BACKEND_PATH = process.env.BACKEND_PATH;

// -------------------------------------------------------

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly cartsRepository: CartsRepository,
    private readonly couponsRepository: CouponsRepository,
    private readonly paypalService: PaypalService,
    private readonly orderItemsRepository: OrderItemsRepository,
    private readonly productsRepository: ProductsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly cancelReasonsRepository: CancelReasonsRepository,
  ) {}

  // 1. Get All
  async getAllOrders() {
    const result = await this.ordersRepository.getAllOrders();
    return result;
  }

  // 2. Get Detail
  async getDetailOrder(id: number): Promise<OrdersEntity | unknown> {
    const detailOrder: OrdersEntity | unknown =
      await this.ordersRepository.getDetailOrder(id);
    if (detailOrder) {
      return detailOrder;
    }
  }

  // 3. Add
  async checkOutOrder(
    userId: number,
    body: CheckOutOrderDTO,
    req,
    res,
  ): Promise<OrdersEntity | unknown | any> {
    const userCart = await this.cartsRepository.getDetailCartByUser(userId);
    const listItems = userCart.map((item) => {
      return {
        sku: item.products.id,
        name: item.products.name,
        price: item.price.toString(),
        currency: 'USD',
        quantity: item.quantity,
        image_url: item.products.thumbnail_url,
      };
    });

    const { phone } = body;
    // Tính tổng hóa đơn
    const caculateBill: BillInterface =
      await this.cartsRepository.caculateBill(userId);
    const bill: number = caculateBill.bill;

    // Kiểm tra điều kiện của hóa đơn để áp mã Coupon
    let copyCoupon: CouponsInterface;
    const getCoupon: CouponsInterface =
      await this.couponsRepository.checkBillToApplyCoupon(bill);
    if (getCoupon) {
      copyCoupon = { ...getCoupon };
    }

    // Tổng tiền được giảm
    const discountedAmount: number = copyCoupon
      ? (Number(copyCoupon.discount_rate) / 100) * Number(bill.toFixed(2))
      : 0;

    // Data
    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: `${BACKEND_PATH}/${path}/paypal/capture-order`,
        cancel_url: `${BACKEND_PATH}/${path}/paypal/cancel-order`,
      },
      transactions: [
        {
          item_list: {
            // items: [
            //   {
            //     name: 'Test',
            //     price: '1.00',
            //     currency: 'USD',
            //     quantity: 1,
            //     sku: '1',
            //     description:
            //       'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ABC-2021-LOGO.svg/1200px-ABC-2021-LOGO.svg.png',
            //   },
            //   {
            //     name: 'Bla',
            //     price: '1.00',
            //     currency: 'USD',
            //     quantity: 4,
            //     sku: '2',
            //     description:
            //       'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ABC-2021-LOGO.svg/1200px-ABC-2021-LOGO.svg.png',
            //   },
            // ],
            shipping_phone_number: phone,
            items: listItems,
          },
          amount: {
            currency: 'USD',
            total: (bill - discountedAmount).toString(),
            details: {
              subtotal: bill.toString(),
              shipping: '0.00',
              insurance: '0.00',
              handling_fee: '0.00',
              shipping_discount: '0.00',
              discount: discountedAmount.toString(),
            },
          },
          // note_to_payee: address,
          // description: phone,
          custom: userId,
        },
      ],
    };

    await this.paypalService.createOrder(create_payment_json, req, res);
  }

  // 4. Get Detail Order Items By Order ID
  async getDetailOrderItemsByOrderId(
    id: number,
  ): Promise<OrderItemsEntity | unknown> {
    const detailOrderItems: OrderItemsEntity | unknown =
      await this.orderItemsRepository.getDetailOrderItem(id);
    if (detailOrderItems) {
      return detailOrderItems;
    }
  }

  // 5. Get All Orders By User ID
  async getAllOrdersByUserId(userId: number): Promise<OrdersEntity | unknown> {
    const getAllOrders: OrderItemsEntity | unknown =
      await this.ordersRepository.getAllOrdersByUserId(userId);
    if (getAllOrders) {
      return getAllOrders;
    }
  }

  // 6. Update Order By Admin
  async updateOrder(
    id: number,
    body: UpdateOrderDTO,
  ): Promise<OrdersEntity | unknown> {
    const { status_id } = body;
    const checkOrder: OrdersEntity =
      await this.ordersRepository.getDetailOrder(id);
    if (checkOrder) {
      const updateOrder = {
        status_id: !status_id ? checkOrder.status_id : status_id,
      };
      await this.ordersRepository.updateOrder(id, updateOrder);
      return new HttpException('Order Updated', HttpStatus.OK);
    }
  }

  // 7. Cancel Order By User
  async cancelOrder(
    id: number,
    body: OrdersInterface,
  ): Promise<OrdersEntity | unknown | any> {
    const { cancel_reason_id } = body;

    try {
      const checkOrder: OrdersEntity =
        await this.ordersRepository.getDetailOrder(id);
      console.log(checkOrder);

      await new Promise((resolve, reject) => {
        const refundRequest = {
          amount: {
            total: checkOrder.total_bill.toString(),
            currency: 'USD',
          },
        };

        paypal.sale.refund(
          checkOrder.sale_id,
          refundRequest,
          (error, refund) => {
            if (error) {
              reject(error);
            } else {
              resolve(refund);
            }
          },
        );
      });

      // Get Order Detail của Order
      const getAllOrderItems: any =
        await this.orderItemsRepository.getDetailOrderItem(checkOrder.id);

      for (const cartProduct of getAllOrderItems) {
        const findProduct = await this.productsRepository.getDetail(
          cartProduct.product_id,
        );
        const updatedQuantityStock =
          Number(findProduct.quantity_stock) + Number(cartProduct.quantity);

        const newQuantity = {
          quantity_stock: updatedQuantityStock,
        };
        // Cập nhật số lượng tồn kho trong bảng products
        await this.productsRepository.updateQuantityStock(
          newQuantity,
          cartProduct.product_id,
        );
      }
      // Hoàn lại sản phẩm
      const findCancelReason =
        await this.cancelReasonsRepository.getDetailCancelReason(
          cancel_reason_id,
        );

      if (checkOrder) {
        const updateOrder = {
          cancel_reason_id: cancel_reason_id,
          cancellation_reason: findCancelReason.name,
          status_id: 5,
        };
        await this.ordersRepository.updateOrder(id, updateOrder);
        return new HttpException('Order Cancelled Completed', HttpStatus.OK);
      }
    } catch (error) {
      throw error;
    }
  }
}
