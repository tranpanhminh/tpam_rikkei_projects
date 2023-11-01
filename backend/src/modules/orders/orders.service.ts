import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { OrdersEntity } from './database/entity/orders.entity';
import { CheckOutOrderDTO } from './dto/check-out-order.dto';
import { OrdersInterface } from './interface/orders.interface';
import { CartsRepository } from '../carts/carts.repository';
import { BillInterface } from '../carts/interface/bill.interface';
import { CouponsInterface } from '../coupons/interface/coupons.interface';
import { CouponsRepository } from '../coupons/coupons.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly cartsRepository: CartsRepository,
    private readonly couponsRepository: CouponsRepository,
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
      email_paypal: 'ab',
    };
    console.log(newOrder, 'NEW ORDER');

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
