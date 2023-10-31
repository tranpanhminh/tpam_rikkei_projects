import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/users.repository';

@Injectable()
export class CheckUserExist implements PipeTransform {
  constructor(private readonly usersRepository: UsersRepository) {}

  async transform(value) {
    const getId = Number(value);

    const findUser = await this.usersRepository.getDetailUser(getId);
    if (!findUser) {
      throw new NotFoundException('User Id is not found');
    }

    return value;
  }
}
