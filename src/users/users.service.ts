import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Joe',
      email: 'joe@example.com',
      subscriptionDate: new Date('2025-02-01T10:00:00Z'),
    },
  ];

  create(createUserDto: CreateUserDto) {
    const lastId = this.users[this.users.length - 1]?.id || 0;
    const newUser = {
      ...createUserDto,
      id: lastId + 1,
      subscriptionDate: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
    };
    return this.users[userIndex];
  }

  remove(id: number) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const deletedUser = this.users.splice(userIndex, 1);
    return deletedUser[0];
  }
}
