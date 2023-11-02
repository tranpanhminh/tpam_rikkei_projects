import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceCommentsEntity } from './database/entity/serviceComments.entity';
import { ServiceCommentsRepository } from 'src/modules/serviceComments/serviceComments.repository';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class ServiceCommentsService {
  constructor(
    private readonly serviceCommentsRepository: ServiceCommentsRepository,
    private readonly usersRepository: UsersRepository,
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

  // // // 3. Add
  // async addServiceComment(
  //   id: number,
  //   userId: number,
  //   body: CreateServiceCommentDTO
  // ): Promise<ServiceCommentsEntity | unknown> {
  //   const { comment, rating } = body;
  //   const findUser = await this.usersRepository.getDetailUser(userId);

  //   const newServiceComment: ServiceCommentsInterface = {
  //     comment: comment,
  //     rating: findUser.role_id == 1 || findUser.role_id == 2 ? 5 : rating,
  //     user_id: userId,
  //     post_id: id,
  //     post_type_id: 1,
  //   };
  //   await this.serviceCommentsRepository.addServiceComment(newServiceComment);
  //   return new HttpException("Product Comment Added", HttpStatus.OK);
  // }

  // // 4. Delete
  // async deleteServiceComment(
  //   id: number
  // ): Promise<ServiceCommentsEntity | unknown> {
  //   const checkServiceComment =
  //     await this.serviceCommentsRepository.getDetailServiceComment(id);
  //   if (checkServiceComment) {
  //     await this.serviceCommentsRepository.deleteServiceComment(id);
  //     return new HttpException("Product Comment Deleted", HttpStatus.OK);
  //   }
  // }

  // // 5. Get All Comments By Product
  // async getAllCommentsByProduct(
  //   id: number
  // ): Promise<ServiceCommentsEntity | unknown> {
  //   const result = await this.serviceCommentsRepository.getAllCommentsByProduct(
  //     id
  //   );
  //   return result;
  // }
}
