import { Injectable } from '@nestjs/common';
import axios from 'axios';

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET_KEY = process.env.PAYPAL_SECRET_KEY;
const PAYPAL_API = process.env.PAYPAL_API;

// -------------------------------------------------------

@Injectable()
export class PaypalService {
  // 1. Create Order
  async createOrder(paymentData, params, req, res) {
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
        return res.json(response.data);
      })
      .catch((error) => {
        return res.json(error);
      });
  }

  // 2. Capture Order
  async captureOrder(newOrder, token, req, res): Promise<any> {
    // const captureOrder = await axios
    //   .post(
    //     `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
    //     {},
    //     {
    //       auth: {
    //         username: PAYPAL_CLIENT_ID,
    //         password: PAYPAL_SECRET_KEY,
    //       },
    //     },
    //   )
    //   .then((response) => {
    //     return res.send(response.data);
    //   })
    //   .catch((error) => {
    //     return res.send(error);
    //   });

    const captureOrder = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: PAYPAL_CLIENT_ID,
          password: PAYPAL_SECRET_KEY,
        },
      },
    );

    newOrder.email_paypal = captureOrder.data.payer.email_address;
    return newOrder;
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
}
