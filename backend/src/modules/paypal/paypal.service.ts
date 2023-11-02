import { Injectable } from '@nestjs/common';
import axios from 'axios';
const fs = require('fs');

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET_KEY = process.env.PAYPAL_SECRET_KEY;
const PAYPAL_API = process.env.PAYPAL_API;
const path = process.env.SERVER_PATH;
const BACKEND_PATH = process.env.BACKEND_PATH;

// -------------------------------------------------------

@Injectable()
export class PaypalService {
  // 1. Create Order
  async createOrder(paymentData, params, req, res): Promise<any> {
    const {
      data: { access_token },
    } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: PAYPAL_CLIENT_ID,
        password: PAYPAL_SECRET_KEY,
      },
    });
    await axios
      .post(`${PAYPAL_API}/v2/checkout/orders`, paymentData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        // for (let i = 0; i < response.data.links; i++) {
        //   if (response.data.links[i].rel === 'approve') {
        //     return res.redirect(response.data.links[i].href);
        //   }
        // }

        req.body.paymentData = paymentData;
        return res.json(response.data);
      })
      .catch((error) => {
        return res.json(error);
      });

    // const result = await axios.post(
    //   `${PAYPAL_API}/v2/checkout/orders`,
    //   paymentData,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${access_token}`,
    //     },
    //   },
    // );
    // return result.data;
  }

  // 2. Capture Order
  async captureOrder(token, req, res): Promise<any> {
    await axios
      .post(
        `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
        {},
        {
          auth: {
            username: PAYPAL_CLIENT_ID,
            password: PAYPAL_SECRET_KEY,
          },
        },
      )
      .then((response) => {
        return res.send(response.data);
      })
      .catch((error) => {
        return res.send(error);
      });

    // const captureOrder = await axios.post(
    //   `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
    //   {},
    //   {
    //     auth: {
    //       username: PAYPAL_CLIENT_ID,
    //       password: PAYPAL_SECRET_KEY,
    //     },
    //   },
    // );

    // newOrder.email_paypal = captureOrder.data.payer.email_address;
    // return newOrder;
  }

  // 4. createOrderGetInformation
  async createOrderGetInformation(paymentData, params, req, res) {
    const {
      data: { access_token },
    } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: PAYPAL_CLIENT_ID,
        password: PAYPAL_SECRET_KEY,
      },
    });
    const result = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    return result.data;
  }

  // 5. Get Create Order Detail
  async createOrderDetailInformation(params, getOrderPaypalId, req, res) {
    const {
      data: { access_token },
    } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: PAYPAL_CLIENT_ID,
        password: PAYPAL_SECRET_KEY,
      },
    });
    const result = await axios.get(
      `${PAYPAL_API}/v2/checkout/orders/${getOrderPaypalId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    return result.data.purchase_units[0].payee.email_address;
  }

  // 6. Check Wallet Balance
  async checkWalletBalance(params, req, res) {
    const {
      data: { access_token },
    } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: PAYPAL_CLIENT_ID,
        password: PAYPAL_SECRET_KEY,
      },
    });
    await axios
      .get(`${PAYPAL_API}/v1/reporting/balances`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        res.json(response.data);
        console.log(response);
      })
      .catch((error) => {
        res.json(error);
        console.log(error, 'ERRPR');
      });
  }

  // 2. Capture Order
  async captureCompleteOrder(token, req, res): Promise<any> {
    await axios
      .post(
        `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
        {},
        {
          auth: {
            username: PAYPAL_CLIENT_ID,
            password: PAYPAL_SECRET_KEY,
          },
        },
      )
      .then((response) => {
        return res.send(response.data);
      })
      .catch((error) => {
        return res.send(error);
      });
  }

  // 5. Get Order Status
  async getOrderStatus(orderId, params) {
    const {
      data: { access_token },
    } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: PAYPAL_CLIENT_ID,
        password: PAYPAL_SECRET_KEY,
      },
    });
    const result = await axios.get(
      `https://api.sandbox.paypal.com/v2/checkout/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    return result.data;
  }

  // 6. Get Order Status
  async getOrderAfterCheckoutStatus(orderId, params) {
    const {
      data: { access_token },
    } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: PAYPAL_CLIENT_ID,
        password: PAYPAL_SECRET_KEY,
      },
    });
    const result = await axios.get(
      `https://api.sandbox.paypal.com/v2/checkout/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    return result.data;
  }

  // 2. Capture Order
  async addWebhook(params, req, res): Promise<any> {
    const {
      data: { access_token },
    } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: PAYPAL_CLIENT_ID,
        password: PAYPAL_SECRET_KEY,
      },
    });
    await axios
      .post(`${PAYPAL_API}/v1/notifications/webhooks`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        url: `${BACKEND_PATH}/${path}/paypal/webhook-checkout`,
        event_types: [{ name: 'CHECKOUT.ORDER.COMPLETED' }],
      })
      .then((response) => {
        return res.json(response.data);
      })
      .catch((error) => {
        return res.json(error);
      });
    console.log('AAAAA');
  }

  // 2. Capture Order
  async getWebhooks(params, req, res): Promise<any> {
    const {
      data: { access_token },
    } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: PAYPAL_CLIENT_ID,
        password: PAYPAL_SECRET_KEY,
      },
    });
    await axios
      .get(`${PAYPAL_API}/v1/notifications/webhooks`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        return res.json(response.data);
      })
      .catch((error) => {
        return res.json(error);
      });
  }

  // 2. Capture Order
  async detailWebhook(id, params, req, res): Promise<any> {
    const {
      data: { access_token },
    } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: PAYPAL_CLIENT_ID,
        password: PAYPAL_SECRET_KEY,
      },
    });
    await axios
      .get(`${PAYPAL_API}/v1/notifications/webhooks/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        return res.json(response.data);
      })
      .catch((error) => {
        return res.json(error);
      });
  }
}
