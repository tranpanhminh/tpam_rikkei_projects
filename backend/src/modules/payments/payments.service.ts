import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaymentsRepository } from './payments.repository';
import { PaymentsEntity } from './database/entity/payments.entity';
import { CreatePaymentDTO } from './dto/create-payment.dto';
import { UpdatePaymentDTO } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  // 1. Get All
  async getAllPayments() {
    const result = await this.paymentsRepository.getAllPayments();
    return result;
  }

  // 2. Get Detail
  async getDetailPayment(id: number): Promise<PaymentsEntity | unknown> {
    const detailPayment: PaymentsEntity | unknown =
      await this.paymentsRepository.getDetailPayment(id);
    if (detailPayment) {
      return detailPayment;
    }
  }

  // 3. Add
  async addPayment(body: CreatePaymentDTO): Promise<PaymentsEntity | unknown> {
    const { cardholder_name, card_number, expiry_date, cvv, balance } = body;
    const newPayment = {
      cardholder_name: cardholder_name,
      card_number: card_number,
      expiry_date: expiry_date,
      cvv: cvv,
      balance: balance,
    };
    await this.paymentsRepository.addPayment(newPayment);
    return new HttpException('Payment Added', HttpStatus.OK);
  }

  // 4. Delete
  async deletePayment(id: number): Promise<PaymentsEntity | unknown> {
    const checkPayment = await this.paymentsRepository.getDetailPayment(id);
    if (checkPayment) {
      await this.paymentsRepository.deletePayment(id);
      return new HttpException('Payment Deleted', HttpStatus.OK);
    }
  }

  // 5. Update
  async updatePayment(
    id: number,
    body: UpdatePaymentDTO,
  ): Promise<PaymentsEntity | unknown> {
    const { cardholder_name, card_number, expiry_date, cvv, balance } = body;

    const checkPayment: PaymentsEntity =
      await this.paymentsRepository.getDetailPayment(id);
    if (checkPayment) {
      const updatePayment = {
        cardholder_name: !cardholder_name
          ? checkPayment.cardholder_name
          : cardholder_name,
        card_number: !card_number ? checkPayment.card_number : card_number,
        expiry_date: !expiry_date ? checkPayment.expiry_date : expiry_date,
        cvv: !cvv ? checkPayment.cvv : cvv,
        balance: !balance ? checkPayment.balance : balance,
      };
      await this.paymentsRepository.updatePayment(id, updatePayment);
      return new HttpException('Payment Updated', HttpStatus.OK);
    }
  }
}
