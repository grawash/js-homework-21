import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  private users = [
    {
      id: 1,
      name: 'Joe',
      email: 'joe@example.com',
      subscriptionDate: new Date('2025-02-01T10:00:00Z'),
    },
  ];

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userModel.findOne({email: createUserDto.email})
    if(userExists) throw new BadRequestException("user already exists")
    const newUser = {
      ...createUserDto,
      subscriptionDate: new Date(),
    };
    const user = this.userModel.create(newUser)
    return user;
  }

  async findAll() {
    const users = await this.userModel.find();
    return users
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("invalid id provided")
    const user = await this.userModel.findById(id)
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) throw new BadRequestException("invalid id provided")
    const userIndex = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true});
    return {message: "user updated", data: userIndex};
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("invalid id provided")
    const userIndex = await this.userModel.findByIdAndDelete(id);
    return {message: "User deleted successfully!"};
  }
}
