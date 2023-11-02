import {
  HttpException,
  HttpStatus,
  Injectable,
  Req,
  Res,
} from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { OrdersEntity } from './database/entity/orders.entity';
import { CheckOutOrderDTO } from './dto/check-out-order.dto';
import { OrdersInterface } from './interface/orders.interface';
import { CartsRepository } from '../carts/carts.repository';
import { BillInterface } from '../carts/interface/bill.interface';
import { CouponsInterface } from '../coupons/interface/coupons.interface';
import { CouponsRepository } from '../coupons/coupons.repository';
import { PaypalService } from '../paypal/paypal.service';
import { OrderItemsRepository } from '../orderItems/orderItems.repository';
import { ProductsRepository } from '../products/products.repository';
import { OrderItemInterface } from '../orderItems/interface/orderItem.interface';
import axios from 'axios';
import { UsersRepository } from '../users/users.repository';

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
        name: item.products.name,
        quantity: item.quantity.toString(),
        price: item.price.toString(),
        currency: 'USD',
        url: item.products.thumbnail_url,
      };
    });

    const findUser = await this.usersRepository.getDetailUser(userId);

    const { customer_name, address, phone } = body;
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

    // Tính tổng Bill đã áp mã giảm giá
    const totalBillDiscounted: number = Number(
      (bill - discountedAmount).toFixed(2),
    );

    // const newOrder: OrdersInterface = {
    //   user_id: userId,
    //   customer_name: customer_name,
    //   address: address,
    //   phone: phone,
    //   discount_rate: copyCoupon.discount_rate,
    //   discounted: discountedAmount,
    //   bill: bill,
    //   total_bill: totalBillDiscounted,
    //   cancellation_reason: null,
    //   cancel_reason_id: null,
    //   coupon_id: copyCoupon.id,
    //   status_id: 1,
    //   email_paypal: '',
    // };

    // Data này chỉ Test
    const paymentData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: totalBillDiscounted,
          },

          item_list: { items: listItems },
          shipping_address: {
            recipient_name: customer_name,
            primary_address: address,
            phone: phone,
          },
        },
      ],

      application_context: {
        brand_name: 'petshop.com',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${BACKEND_PATH}/${path}/paypal/capture-order`,
        cancel_url: `${BACKEND_PATH}/${path}/paypal/cancel-order`,
      },
    };

    await this.paypalService.createOrder(paymentData, req, res);

    // await res.json(checkOutPaypal);

    // const getCheckOutId = checkOutPaypal.id;
    // let getCheckOutLink: any = '';
    // for (let i = 0; i < checkOutPaypal.links.length; i++) {
    //   if (checkOutPaypal.links[i].rel === 'approve') {
    //     getCheckOutLink = checkOutPaypal.links[i].href;
    //   }
    // }

    // const checkOrder = await this.paypalService.getOrderStatus(
    //   getCheckOutId,
    //   params,
    // );

    // if (checkOrder.status === 'CREATED') {
    //   return console.log(checkOrder);
    // } else if (checkOrder.status === 'COMPLETED') {
    //   console.log('next');
    // }

    // // Tạo Order vào bảng Order
    // const orderInfo: OrdersInterface =
    //   await this.ordersRepository.addOrder(newOrder);
    // const orderId = orderInfo.id;

    // // Push tất cả sản phẩm trong Cart của User vào Order item

    // // ----------- Xử lý giảm hàng tồn kho -------------

    // for (const cartProduct of userCart) {
    //   const findProduct = await this.productsRepository.getDetail(
    //     cartProduct.product_id,
    //   );
    //   const updatedQuantityStock =
    //     findProduct.quantity_stock - cartProduct.quantity;

    //   // Cập nhật số lượng tồn kho trong bảng products
    //   await this.productsRepository.updateQuantityStock(
    //     updatedQuantityStock,
    //     cartProduct.product_id,
    //   );

    //   const copyProduct = {
    //     ...findProduct,
    //   };

    //   const orderItemInfo: OrderItemInterface = {
    //     order_id: orderId, // Sử dụng orderId đã gán ở trên
    //     product_id: cartProduct.product_id,
    //     product_name: copyProduct.name,
    //     product_description: copyProduct.description,
    //     product_thumbnail: copyProduct.thumbnail_url,
    //     quantity: cartProduct.quantity,
    //     price: cartProduct.price,
    //   };

    //   // Đẩy Cart vào Order Item
    //   await this.orderItemsRepository.addOrderItem(orderItemInfo);
    // }

    // // Xoá tất cả sản phẩm của User trong Cart đi
    // await this.cartsRepository.deleteAllProductsFromUserCart(userId);

    // return new HttpException('Checkout Completed', HttpStatus.OK);
  }

  // 4. Delete
  // async deleteOrder(id: number): Promise<OrdersEntity | unknown> {
  //   const checkOrder = await this.ordersRepository.getDetailOrder(id);
  //   if (checkOrder) {
  //     await this.ordersRepository.deleteOrder(id);
  //     return new HttpException("Order Deleted", HttpStatus.OK);
  //   }
  // }

  // 5. Update
  // async updateOrder(
  //   id: number,
  //   body: UpdateOrderDTO
  // ): Promise<OrdersEntity | unknown> {
  //   const { name, code, discount_rate, min_bill } = body;
  //   const checkOrder: OrdersEntity = await this.ordersRepository.getDetailOrder(
  //     id
  //   );
  //   if (checkOrder) {
  //     const updateOrder = {
  //       name: !name ? checkOrder.name : name,
  //       code: !code ? checkOrder.code : code,
  //       discount_rate: !discount_rate
  //         ? checkOrder.discount_rate
  //         : discount_rate,
  //       min_bill: !min_bill ? checkOrder.min_bill : min_bill,
  //     };
  //     await this.ordersRepository.updateOrder(id, updateOrder);
  //     return new HttpException("Order Updated", HttpStatus.OK);
  //   }
  // }
}
