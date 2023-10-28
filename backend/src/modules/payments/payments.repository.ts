import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentsEntity } from './database/entity/payments.entity';
import { CreatePaymentDTO } from './dto/create-payment.dto';
import { UpdatePaymentDTO } from './dto/update-payment.dto';

@Injectable()
export class PaymentsRepository {
  constructor(
    @InjectRepository(PaymentsEntity)
    private paymentsEntity: Repository<PaymentsEntity>,
  ) {}

  // 1. Get All
  async getAllPayments() {
    return await this.paymentsEntity.find();
  }

  // 2. Get Detail
  async getDetailPayment(id: number): Promise<PaymentsEntity> {
    const detailPayment = await this.paymentsEntity.findOneById(id);
    return detailPayment;
  }

  // 3. Add
  async addPayment(
    newPayment: CreatePaymentDTO,
  ): Promise<PaymentsEntity | unknown> {
    return await this.paymentsEntity.save(newPayment);
  }

  // 4. Add
  async deletePayment(id: number): Promise<PaymentsEntity | unknown> {
    return await this.paymentsEntity.delete(id);
  }

  // 5. Update
  async updatePayment(
    id: number,
    updatePayment: UpdatePaymentDTO,
  ): Promise<PaymentsEntity | unknown> {
    return await this.paymentsEntity.update(id, updatePayment);
  }
}
