import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Request, Response } from 'express';
import * as paypal from 'paypal-rest-sdk';
import { OrderItemsRepository } from '../orderItems/orderItems.repository';
import { OrdersRepository } from '../orders/orders.repository';

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET_KEY = process.env.PAYPAL_SECRET_KEY;
const PAYPAL_API = process.env.PAYPAL_API;
const path = process.env.SERVER_PATH;
const BACKEND_PATH = process.env.BACKEND_PATH;

// -------------------------------------------------------

@Injectable()
export class PaypalService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly orderItemsRepository: OrderItemsRepository,
  ) {}
  // 1. Create Order
  async createOrder(paymentData, req, res): Promise<any> {
    paypal.payment.create(paymentData, function (error, payment) {
      if (error) {
        throw error;
      } else {
        console.log('Create Payment Response');
        return res.send(payment);
      }
    });
  }

  // 2. Capture Order
  async captureOrder(paymentId, execute_payment_json, req, res): Promise<any> {
    console.log(execute_payment_json);
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          console.log(error.response);
          throw error;
        } else {
          return res.json(payment);
        }
      },
    );
  }

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
