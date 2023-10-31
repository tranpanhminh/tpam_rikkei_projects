import { Injectable } from '@nestjs/common';
import * as paypal from 'paypal-rest-sdk';

@Injectable()
export class PaypalService {
  async createPayment(paymentData: any, request, response) {
    // Thực hiện tạo thanh toán
    await paypal.payment.create(paymentData, function (error, payment) {
      if (error) {
        console.log(error, 'ERROR Create');
      } else {
        console.log(payment);
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel == 'approval_url') {
            response.redirect(payment.links[i].href);
          }
        }
      }
    });
  }

  async executePayment(paymentData: any, request, response) {
    // Thực hiện thanh toán
    const payerId = paymentData.payerId;
    const paymentId = paymentData.paymentId;
    const executePayment = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: 'USD',
            total: '1.00',
          },
        },
      ],
    };

    paypal.payment.execute(
      paymentId,
      executePayment,
      function (error, payment) {
        if (error) {
          console.log(error, 'ERROR Excute');
          throw error;
        } else {
          console.log(JSON.stringify(payment));
          response.send('Success');
        }
      },
    );
  }
}
