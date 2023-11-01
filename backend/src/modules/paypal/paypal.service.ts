import { Injectable } from '@nestjs/common';
import * as paypal from 'paypal-rest-sdk';

@Injectable()
export class PaypalService {
  async createOrder(paymentData: any, request, response) {
    // Thực hiện tạo thanh toán
    paypal.payment.create(paymentData, function (error, payment) {
      if (error) {
        throw error;
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

  async captureOrder(payerId, paymentId, paymentData: any, request, response) {
    paypal.payment.execute(paymentId, paymentData, function (error, payment) {
      if (error) {
        console.log(error, 'ERROR Excute');
        throw error;
      } else {
        console.log(JSON.stringify(payment));
        response.send('Success');
      }
    });
  }
}
