import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServicesRepository } from './services.repository';
import { ServicesEntity } from './database/entity/services.entity';
import { CreateServiceDTO } from './dto/createService.dto';
import { ServicesInterface } from './interface/services.interface';
import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { UpdateServiceDTO } from './dto/updateService.dto';
import { extractPublicId } from 'cloudinary-build-url';
const cloudinary = require('cloudinary').v2;

@Injectable()
export class ServicesService {
  constructor(
    private readonly servicesRepository: ServicesRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

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
  async addService(body: CreateServiceDTO): Promise<ServicesEntity | unknown> {
    const { name, description, price, working_time_id } = body;
    const fileUploaded: any = body.service_image;
    const result = await this.cloudinaryService.uploadFile(fileUploaded);
    const newService: ServicesInterface = {
      name: name,
      description: description,
      price: price,
      service_image: result.secure_url,
      working_time_id: working_time_id,
      post_type_id: 2,
    };
    await this.servicesRepository.addService(newService);
    return new HttpException('Service Added', HttpStatus.OK);
  }

  // 4. Delete
  async deleteService(id: number): Promise<ServicesEntity | unknown> {
    const checkService = await this.servicesRepository.getDetailService(id);
    const image = extractPublicId(checkService.service_image);
    await this.servicesRepository.deleteService(id);
    await cloudinary.api.delete_resources(image);
    return new HttpException('Service Deleted', HttpStatus.OK);
  }

  // 5. Update
  async updateService(
    id: number,
    body: UpdateServiceDTO,
  ): Promise<ServicesEntity | unknown> {
    const { name, description, price, working_time_id } = body;
    const findService = await this.servicesRepository.getDetailService(id);
    if (body.service_image) {
      const fileUploaded: any = body.service_image;
      const result = await this.cloudinaryService.uploadFile(fileUploaded);
      const newService: ServicesInterface = {
        name: !name ? findService.name : name,
        description: !description ? findService.description : description,
        price: !price ? findService.price : price,
        service_image: !fileUploaded
          ? findService.service_image
          : result.secure_url,
        working_time_id: !working_time_id
          ? Number(findService.working_time_id)
          : Number(working_time_id),
        post_type_id: 2,
      };
      const image = extractPublicId(findService.service_image);
      await cloudinary.api.delete_resources(image);
      await this.servicesRepository.updateService(id, newService);
      return new HttpException('Service Updated', HttpStatus.OK);
    } else {
      const newService: ServicesInterface = {
        name: !name ? findService.name : name,
        description: !description ? findService.description : description,
        price: !price ? findService.price : price,
        service_image: findService.service_image,
        working_time_id: !working_time_id
          ? Number(findService.working_time_id)
          : Number(working_time_id),
        post_type_id: 2,
      };
      await this.servicesRepository.updateService(id, newService);
      return new HttpException('Service Updated', HttpStatus.OK);
    }
  }
}
