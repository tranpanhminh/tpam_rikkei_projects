import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServicesRepository } from './services.repository';
import { ServicesEntity } from './database/entity/services.entity';

@Injectable()
export class ServicesService {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  // 1. Get All
  async getAllServices() {
    const result = await this.servicesRepository.getAllServices();
    return result;
  }

  // 2. Get Detail
  async getDetailService(id: number): Promise<ServicesEntity | unknown> {
    const detailService: ServicesEntity | unknown =
      await this.servicesRepository.getDetailService(id);
    if (detailService) {
      return detailService;
    }
  }

  // 3. Add
  // async addService(body: CreateServiceDTO): Promise<ServicesEntity | unknown> {
  //   const { name, code, discount_rate, min_bill } = body;
  //   const newService = {
  //     name: name,
  //     code: code,
  //     discount_rate: discount_rate,
  //     min_bill: min_bill,
  //   };
  //   await this.servicesRepository.addService(newService);
  //   return new HttpException("Service Added", HttpStatus.OK);
  // }

  // 4. Delete
  // async deleteService(id: number): Promise<ServicesEntity | unknown> {
  //   const checkService = await this.servicesRepository.getDetailService(id);
  //   if (checkService) {
  //     await this.servicesRepository.deleteService(id);
  //     return new HttpException("Service Deleted", HttpStatus.OK);
  //   }
  // }

  // 5. Update
  // async updateService(
  //   id: number,
  //   body: UpdateServiceDTO
  // ): Promise<ServicesEntity | unknown> {
  //   const { name, code, discount_rate, min_bill } = body;
  //   const checkService: ServicesEntity =
  //     await this.servicesRepository.getDetailService(id);
  //   if (checkService) {
  //     const updateService = {
  //       name: !name ? checkService.name : name,
  //       code: !code ? checkService.code : code,
  //       discount_rate: !discount_rate
  //         ? checkService.discount_rate
  //         : discount_rate,
  //       min_bill: !min_bill ? checkService.min_bill : min_bill,
  //     };
  //     await this.servicesRepository.updateService(id, updateService);
  //     return new HttpException("Service Updated", HttpStatus.OK);
  //   }
  // }
}
