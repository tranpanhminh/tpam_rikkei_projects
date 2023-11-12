import { Injectable } from '@nestjs/common';
import { MyGateway } from '../gateway/gateway';
import * as paypal from 'paypal-rest-sdk';
import { OrderItemsRepository } from '../orderItems/orderItems.repository';
import { OrdersRepository } from '../orders/orders.repository';
import { CartsRepository } from '../carts/carts.repository';
import { ProductsRepository } from '../products/products.repository';
import { OrderItemInterface } from '../orderItems/interface/orderItem.interface';
import { EmailService } from '../email/email.service';
import { UsersRepository } from 'src/modules/users/users.repository';

const FRONTEND_PATH = process.env.FRONTEND_PATH;

// -------------------------------------------------------

@Injectable()
export class PaypalService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly orderItemsRepository: OrderItemsRepository,
    private readonly cartsRepository: CartsRepository,
    private readonly productsRepository: ProductsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly emailService: EmailService,
    private readonly myGateway: MyGateway,
  ) {}
  // 1. Create Order
  async createOrder(paymentData, req, res): Promise<any> {
    paypal.payment.create(paymentData, function (error, payment) {
      if (error) {
        throw error;
      } else {
        // Mở lệnh này lên khi ghép với FrontEnd
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel == 'approval_url') {
            return res.json({ url: payment.links[i].href });
          }
        }
        // return res.send(payment);
      }
    });
  }

  // 2. Capture Order
  async captureOrder(paymentId, execute_payment_json, req, res): Promise<any> {
    try {
      const orderInfo: any = await new Promise((resolve, reject) => {
        paypal.payment.execute(
          paymentId,
          execute_payment_json,
          function (error, payment) {
            if (error) {
              reject(error);
            } else {
              resolve(payment);
            }
          },
        );
      });
      const copyOrderInfo = {
        order_code: orderInfo.id,
        sale_id: orderInfo.transactions[0].related_resources[0].sale.id,
        user_id: orderInfo.transactions[0].custom,
        customer_info: orderInfo.payer.payer_info,
        phone: orderInfo.transactions[0].item_list.shipping_phone_number,
        item_lists: orderInfo.transactions[0].item_list.items,
        amounts: orderInfo.transactions[0].amount,
      };
      const newOrder = {
        order_code: copyOrderInfo.order_code,
        sale_id: copyOrderInfo.sale_id,
        user_id: Number(copyOrderInfo.user_id),
        customer_name: `${copyOrderInfo.customer_info.shipping_address.recipient_name}`,
        address: `${copyOrderInfo.customer_info.shipping_address.line1}, ${copyOrderInfo.customer_info.shipping_address.city}, ${copyOrderInfo.customer_info.shipping_address.state}, ${copyOrderInfo.customer_info.shipping_address.postal_code}, ${copyOrderInfo.customer_info.shipping_address.country_code}`,
        phone: copyOrderInfo.phone,
        discounted: Number(copyOrderInfo.amounts.details.discount),
        bill: Number(copyOrderInfo.amounts.details.subtotal),
        total_bill: Number(copyOrderInfo.amounts.total),
        cancellation_reason: null,
        cancel_reason_id: null,
        status_id: 1,
        email_paypal: copyOrderInfo.customer_info.email,
      };

      // Tạo 1 Order mới
      const addNewOrder = await this.ordersRepository.addOrder(newOrder);

      // Lấy Id của Order vừa tạo
      const orderId = addNewOrder.id;
      // ----------- Xử lý giảm hàng tồn kho -------------
      const userCart = await this.cartsRepository.getDetailCartByUser(
        newOrder.user_id,
      );
      const findUser = await this.usersRepository.getDetailUser(
        newOrder.user_id,
      );
      let statusEmail = false;
      for (const cartProduct of userCart) {
        const findProduct = await this.productsRepository.getDetail(
          cartProduct.product_id,
        );
        const updatedQuantityStock =
          Number(findProduct.quantity_stock) - Number(cartProduct.quantity);

        const newQuantity = {
          quantity_stock: updatedQuantityStock,
        };
        // Cập nhật số lượng tồn kho trong bảng products
        await this.productsRepository.updateQuantityStock(
          newQuantity,
          cartProduct.product_id,
        );

        const copyProduct = {
          ...findProduct,
        };

        const orderItemInfo: OrderItemInterface = {
          order_id: orderId, // Sử dụng orderId đã gán ở trên
          product_id: cartProduct.product_id,
          product_name: copyProduct.name,
          product_description: copyProduct.description,
          product_thumbnail: copyProduct.thumbnail_url,
          quantity: cartProduct.quantity,
          price: cartProduct.price,
        };

        // Đẩy Cart vào Order Item
        await this.orderItemsRepository.addOrderItem(orderItemInfo);
        if (!statusEmail) {
          // Gửi Mail có order mới tới Admin
          const emailAdmin = process.env.MAIL_ADMIN;
          // Gửi email chứa liên kết reset đến người dùng
          const subject = `New Order (OrderID: ${orderId})`;
          const htmlContent = `<h3>A customer successully ordered:
          <a href="${FRONTEND_PATH}/admin/manage-orders/">See Detail</a>
          </h3>
      <img src="https://rabbunny.com/wp-content/uploads/2023/11/email-confirm-order.webp" alt="" />
      `;
          await this.emailService.sendEmail(emailAdmin, subject, htmlContent);
          // Gửi Mail xác nhận đã đặt hàng tới User
          const customerEmail = findUser.email;
          // Gửi email chứa liên kết reset đến người dùng
          const subjectCustomer = `New Order Created Successfully (OrderID: ${orderId})`;
          const htmlContentCustomer = `<h3>Thank you for purchasing our product:
                    <a href="${FRONTEND_PATH}/user/my-orders/">See Detail Your Order</a>
                    </h3>
                <img src="https://rabbunny.com/wp-content/uploads/2023/11/email-confirm-order.webp" alt="" />
                `;
          await this.emailService.sendEmail(
            customerEmail,
            subjectCustomer,
            htmlContentCustomer,
          );
          statusEmail = true;
        }
      }

      // Xoá tất cả sản phẩm của User trong Cart đi
      await this.cartsRepository.deleteAllProductsFromUserCart(
        newOrder.user_id,
      );
      // this.myGateway.alertNewOrder(`New Order: #OrderID ${orderId}`);
      return res.redirect(`${FRONTEND_PATH}/user/my-orders`);
    } catch (error) {
      throw error;
    }
  }
}
