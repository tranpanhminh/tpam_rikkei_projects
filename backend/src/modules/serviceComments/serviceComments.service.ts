import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceCommentsEntity } from './database/entity/serviceComments.entity';
import { ServiceCommentsRepository } from 'src/modules/serviceComments/serviceComments.repository';
import { UsersRepository } from '../users/users.repository';
import { ServiceCommentsInterface } from './interface/serviceComments.interface';
import { CreateServiceCommentDTO } from './dto/createServiceComment.dto';
import { MyGateway } from '../gateway/gateway';

@Injectable()
export class ServiceCommentsService {
  constructor(
    private readonly serviceCommentsRepository: ServiceCommentsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly myGateway: MyGateway,
  ) {}

  // 1. Get All
  async getAllServiceComments() {
    const result = await this.serviceCommentsRepository.getAllServiceComments();
    return result;
  }

  // 2. Get Detail
  async getDetailServiceComment(
    id: number,
  ): Promise<ServiceCommentsEntity | unknown> {
    const detailServiceComment: ServiceCommentsEntity | unknown =
      await this.serviceCommentsRepository.getDetailServiceComment(id);
    if (detailServiceComment) {
      return detailServiceComment;
    }
  }

  // // 3. Add
  async addServiceComment(
    id: number,
    userId: number,
    body: CreateServiceCommentDTO,
  ): Promise<ServiceCommentsEntity | unknown> {
    const { comment, rating } = body;
    const findUser = await this.usersRepository.getDetailUser(userId);

    const newServiceComment: ServiceCommentsInterface = {
      comment: comment,
      rating: findUser.role_id == 1 || findUser.role_id == 2 ? 5 : rating,
      user_id: userId,
      post_id: id,
      post_type_id: 2,
    };
    await this.serviceCommentsRepository.addServiceComment(newServiceComment);
    // this.myGateway.handleNewComment();
    return new HttpException('Service Comment Added', HttpStatus.OK);
  }

  // 4. Delete
  async deleteServiceComment(
    id: number,
  ): Promise<ServiceCommentsEntity | unknown> {
    const checkServiceComment =
      await this.serviceCommentsRepository.getDetailServiceComment(id);
    if (checkServiceComment) {
      await this.serviceCommentsRepository.deleteServiceComment(id);
      return new HttpException('Service Comment Deleted', HttpStatus.OK);
    }
  }

  // 5. Get All Comments By Product
  async getAllCommentsByService(
    id: number,
  ): Promise<ServiceCommentsEntity | unknown> {
    const result =
      await this.serviceCommentsRepository.getAllCommentsByService(id);
    return result;
  }
}
