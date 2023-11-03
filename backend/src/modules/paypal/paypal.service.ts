import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Request, Response } from 'express';
import * as paypal from 'paypal-rest-sdk';
import { OrderItemsRepository } from '../orderItems/orderItems.repository';
import { OrdersRepository } from '../orders/orders.repository';
import { CartsRepository } from '../carts/carts.repository';
import { ProductsRepository } from '../products/products.repository';
import { OrderItemInterface } from '../orderItems/interface/orderItem.interface';

// const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
// const PAYPAL_SECRET_KEY = process.env.PAYPAL_SECRET_KEY;
// const PAYPAL_API = process.env.PAYPAL_API;
// const path = process.env.SERVER_PATH;
// const BACKEND_PATH = process.env.BACKEND_PATH;

// -------------------------------------------------------

@Injectable()
export class PaypalService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly orderItemsRepository: OrderItemsRepository,
    private readonly cartsRepository: CartsRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}
  // 1. Create Order
  async createOrder(paymentData, req, res): Promise<any> {
    paypal.payment.create(paymentData, function (error, payment) {
      if (error) {
        throw error;
      } else {
        // Mở lệnh này lên khi ghép với FrontEnd
        // for (let i = 0; i < payment.links.length; i++) {
        //   if (payment.links[i].rel == 'approval_url') {
        //     res.redirect(payment.links[i].href);
        //   }
        // }
        return res.send(payment);
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
        user_id: orderInfo.transactions[0].custom,
        customer_info: orderInfo.payer.payer_info,
        phone: orderInfo.transactions[0].item_list.shipping_phone_number,
        item_lists: orderInfo.transactions[0].item_list.items,
        amounts: orderInfo.transactions[0].amount,
      };
      const newOrder = {
        order_code: copyOrderInfo.order_code,
        user_id: Number(copyOrderInfo.user_id),
        customer_name: `${copyOrderInfo.customer_info.first_name} ${copyOrderInfo.customer_info.last_name}`,
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
      for (const cartProduct of userCart) {
        const findProduct = await this.productsRepository.getDetail(
          cartProduct.product_id,
        );
        console.log(findProduct, 'FIND PRODUCT');
        const updatedQuantityStock =
          Number(findProduct.quantity_stock) - Number(cartProduct.quantity);
        console.log(updatedQuantityStock, 'AA');

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
      }

      // Xoá tất cả sản phẩm của User trong Cart đi
      await this.cartsRepository.deleteAllProductsFromUserCart(
        newOrder.user_id,
      );
      return res.redirect('http://localhost:3000/');
    } catch (error) {
      console.log(error);
    }
  }

  //   await new Promise((resolve, reject) => {
  //     paypal.payment.execute(
  //       paymentId,
  //       execute_payment_json,
  //       function (error, payment) {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           orderInfo = payment; // Lưu giá trị vào orderInfo
  //           resolve(payment);
  //         }
  //       },
  //     );
  //   })
  //     .then(() => {
  //       const copyOrderInfo = {
  //         order_code: orderInfo.id,
  //         user_id: orderInfo.transactions[0].custom,
  //         customer_info: orderInfo.payer.payer_info,
  //         phone: orderInfo.transactions[0].item_list.shipping_phone_number,
  //         item_lists: orderInfo.transactions[0].item_list.items,
  //         amounts: orderInfo.transactions[0].amount,
  //       };
  //       const newOrder = {
  //         order_code: copyOrderInfo.order_code,
  //         user_id: Number(copyOrderInfo.user_id),
  //         customer_name: `${copyOrderInfo.customer_info.first_name} ${copyOrderInfo.customer_info.last_name}`,
  //         address: `${copyOrderInfo.customer_info.shipping_address.line1}, ${copyOrderInfo.customer_info.shipping_address.city}, ${copyOrderInfo.customer_info.shipping_address.state}, ${copyOrderInfo.customer_info.shipping_address.postal_code}, ${copyOrderInfo.customer_info.shipping_address.country_code}`,
  //         phone: copyOrderInfo.phone,
  //         discounted: Number(copyOrderInfo.amounts.discount),
  //         bill: Number(copyOrderInfo.amounts.subtotal),
  //         total_bill: Number(copyOrderInfo.amounts.total),
  //         cancellation_reason: null,
  //         cancel_reason_id: null,
  //         status_id: 1,
  //         email_paypal: copyOrderInfo.customer_info.email,
  //       };
  //       console.log(newOrder);
  //       const addNewOrder = this.ordersRepository.addOrder(newOrder);
  //       return addNewOrder;
  //     })
  //     .catch((error) => {
  //       // Xử lý lỗi ở đây
  //       console.log(error);
  //       return res.status(500).json({ error: 'Internal server error' });
  //     });
  // }

  // // 4. createOrderGetInformation
  // async createOrderGetInformation(paymentData, params, req, res) {
  //   const {
  //     data: { access_token },
  //   } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     auth: {
  //       username: PAYPAL_CLIENT_ID,
  //       password: PAYPAL_SECRET_KEY,
  //     },
  //   });
  //   const result = await axios.post(
  //     `${PAYPAL_API}/v2/checkout/orders`,
  //     paymentData,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //     },
  //   );

  //   const resultData = await axios.get(
  //     `${PAYPAL_API}/v2/checkout/orders/${result.data.id}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //     },
  //   );

  //   return resultData.data;
  // }

  // // 5. Get Create Order Detail
  // async createOrderDetailInformation(params, getOrderPaypalId, req, res) {
  //   const {
  //     data: { access_token },
  //   } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     auth: {
  //       username: PAYPAL_CLIENT_ID,
  //       password: PAYPAL_SECRET_KEY,
  //     },
  //   });
  //   const result = await axios.get(
  //     `${PAYPAL_API}/v2/checkout/orders/${getOrderPaypalId}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //     },
  //   );
  //   return result.data;
  // }

  // // 6. Check Wallet Balance
  // async checkWalletBalance(params, req, res) {
  //   const {
  //     data: { access_token },
  //   } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     auth: {
  //       username: PAYPAL_CLIENT_ID,
  //       password: PAYPAL_SECRET_KEY,
  //     },
  //   });
  //   await axios
  //     .get(`${PAYPAL_API}/v1/reporting/balances`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //     })
  //     .then((response) => {
  //       res.json(response.data);
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       res.json(error);
  //       console.log(error, 'ERRPR');
  //     });
  // }

  // // 2. Capture Order
  // async captureCompleteOrder(token, req, res): Promise<any> {
  //   await axios
  //     .post(
  //       `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
  //       {},
  //       {
  //         auth: {
  //           username: PAYPAL_CLIENT_ID,
  //           password: PAYPAL_SECRET_KEY,
  //         },
  //       },
  //     )
  //     .then((response) => {
  //       return res.send(response.data);
  //     })
  //     .catch((error) => {
  //       return res.send(error);
  //     });
  // }

  // // 5. Get Order Status
  // async getOrderStatus(orderId, params) {
  //   const {
  //     data: { access_token },
  //   } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     auth: {
  //       username: PAYPAL_CLIENT_ID,
  //       password: PAYPAL_SECRET_KEY,
  //     },
  //   });
  //   const result = await axios.get(
  //     `https://api.sandbox.paypal.com/v2/checkout/orders/${orderId}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //     },
  //   );
  //   return result.data;
  // }

  // // 6. Get Order Status
  // async getOrderAfterCheckoutStatus(orderId, params) {
  //   const {
  //     data: { access_token },
  //   } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     auth: {
  //       username: PAYPAL_CLIENT_ID,
  //       password: PAYPAL_SECRET_KEY,
  //     },
  //   });
  //   const result = await axios.get(
  //     `https://api.sandbox.paypal.com/v2/checkout/orders/${orderId}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //     },
  //   );
  //   return result.data;
  // }

  // // 2. Capture Order
  // async addWebhook(params, req, res): Promise<any> {
  //   const {
  //     data: { access_token },
  //   } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     auth: {
  //       username: PAYPAL_CLIENT_ID,
  //       password: PAYPAL_SECRET_KEY,
  //     },
  //   });
  //   await axios
  //     .post(`${PAYPAL_API}/v1/notifications/webhooks`, {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //       url: `${BACKEND_PATH}/${path}/paypal/webhook-checkout`,
  //       event_types: [{ name: 'CHECKOUT.ORDER.COMPLETED' }],
  //     })
  //     .then((response) => {
  //       return res.json(response.data);
  //     })
  //     .catch((error) => {
  //       return res.json(error);
  //     });
  //   console.log('AAAAA');
  // }

  // // 2. Capture Order
  // async getWebhooks(params, req, res): Promise<any> {
  //   const {
  //     data: { access_token },
  //   } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     auth: {
  //       username: PAYPAL_CLIENT_ID,
  //       password: PAYPAL_SECRET_KEY,
  //     },
  //   });
  //   await axios
  //     .get(`${PAYPAL_API}/v1/notifications/webhooks`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //     })
  //     .then((response) => {
  //       return res.json(response.data);
  //     })
  //     .catch((error) => {
  //       return res.json(error);
  //     });
  // }

  // // 2. Capture Order
  // async detailWebhook(id, params, req, res): Promise<any> {
  //   const {
  //     data: { access_token },
  //   } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     auth: {
  //       username: PAYPAL_CLIENT_ID,
  //       password: PAYPAL_SECRET_KEY,
  //     },
  //   });
  //   await axios
  //     .get(`${PAYPAL_API}/v1/notifications/webhooks/${id}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //     })
  //     .then((response) => {
  //       return res.json(response.data);
  //     })
  //     .catch((error) => {
  //       return res.json(error);
  //     });
  // }

  // // Get Access Token
  // async getAccessToken() {
  //   const params = new URLSearchParams();
  //   params.append('grant_type', 'client_credentials');

  //   const response = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
  //     auth: {
  //       username: PAYPAL_CLIENT_ID,
  //       password: PAYPAL_SECRET_KEY,
  //     },
  //   });

  //   return response.data.access_token;
  // }
}
