import { hash } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { UserCreateDto, UserDto } from 'src/app/dto/users.dto';
import UsersRepository from './users.repository';

@Injectable()
export default class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  get(id: number): Promise<UserDto> {
    return this.usersRepository.findOne(
      { id },
      {
        select: ['id', 'name', 'login', 'createdAt'],
        relations: ['roles', 'organization'],
      },
    );
  }

  async create(user: UserCreateDto): Promise<UserDto> {
    const password = await hash(user.password, 10);
    return this.usersRepository.createOne({ ...user, password });
  }

  findAllWithOrg(): Promise<Omit<UserDto, 'roles'>[]> {
    return this.usersRepository.find({
      select: ['id', 'name', 'login', 'createdAt'],
      relations: ['organization'],
    });
  }

  async delete(id: number): Promise<{ id: number }> {
    await this.usersRepository.softDelete(id);
    return { id };
  }
}
