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
import axios from 'axios';

const path = process.env.SERVER_PATH;
const BACKEND_PATH = process.env.BACKEND_PATH;
const FRONTEND_PATH = process.env.FRONTEND_PATH;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET_KEY = process.env.PAYPAL_SECRET_KEY;
const PAYPAL_API = process.env.PAYPAL_API;

// -------------------------------------------------------

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly cartsRepository: CartsRepository,
    private readonly couponsRepository: CouponsRepository,
    private readonly paypalService: PaypalService,
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
    @Req() req,
    @Res() res,
  ): Promise<OrdersEntity | unknown | any> {
    const { customer_name, address, phone } = body;
    // Tính tổng hóa đơn
    const caculateBill: BillInterface =
      await this.cartsRepository.caculateBill(userId);
    const bill: number = caculateBill.bill;
    console.log(bill, 'BILL');

    // Kiểm tra điều kiện của hóa đơn để áp mã Coupon
    let copyCoupon: CouponsInterface;
    const getCoupon: CouponsInterface =
      await this.couponsRepository.checkBillToApplyCoupon(bill);
    if (getCoupon) {
      copyCoupon = { ...getCoupon };
    }
    console.log(copyCoupon, 'COUPON Copy');

    // Tổng tiền được giảm
    const discountedAmount: number = copyCoupon
      ? (Number(copyCoupon.discount_rate) / 100) * Number(bill.toFixed(2))
      : 0;

    // Tính tổng Bill đã áp mã giảm giá
    const totalBillDiscounted: number = Number(
      (bill - discountedAmount).toFixed(2),
    );

    console.log(discountedAmount, 'Tiến chiết khấu');
    console.log(totalBillDiscounted, 'Tổng bill đã chiết khấu');

    // Data này chỉ Test
    const paymentData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: totalBillDiscounted,
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

    const newOrder: OrdersInterface = {
      user_id: userId,
      customer_name: customer_name,
      address: address,
      phone: phone,
      discount_rate: copyCoupon.discount_rate,
      discounted: discountedAmount,
      bill: bill,
      total_bill: totalBillDiscounted,
      cancellation_reason: null,
      cancel_reason_id: null,
      coupon_id: copyCoupon.id,
      status_id: 1,
      email_paypal: '',
    };

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const getOrderPaypal = await this.paypalService.createOrderGetInformation(
      paymentData,
      params,
      req,
      res,
    );

    const getOrderPaypalId = getOrderPaypal.id;

    const getEmail: any = await this.paypalService.createOrderDetailInformation(
      params,
      getOrderPaypalId,
      req,
      res,
    );

    newOrder.email_paypal = getEmail;

    const createPaypalOrder = await this.paypalService.createOrder(
      paymentData,
      params,
      req,
      res,
    );

    console.log('hehe');

    // await this.ordersRepository.checkOutOrder(newOrder);
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
