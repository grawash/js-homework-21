import { Injectable, HttpException, HttpStatus, Req } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProductsService {
  constructor(private readonly usersService: UsersService){}
  private products = [
    {
      id: 1,
      name: 'Laptop',
      price: 499,
      discounted: false,
      createdAt: new Date('2025-02-01T10:00:00Z'),
    },
    {
      id: 2,
      name: 'Iphone',
      price: 699,
      discounted: true,
      createdAt: new Date('2025-02-01T10:00:00Z'),
    }
  ];

  create(createProductDto: CreateProductDto) {
    const lastId = this.products[this.products.length - 1]?.id || 0;
    const newProduct = {
      ...createProductDto,
      id: lastId + 1,
      createdAt: new Date(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(userId: string) {
    const user = this.usersService.findOne(userId)
    const now = new Date();
    // const diffInDays = (now.getTime() - user.subscriptionDate.getTime())/ (1000 * 60 * 60 * 24)
    // if(diffInDays < 30){
    //   return this.products;
    // }
    return this.products.filter(el => el.discounted === true)
  }

  findOne(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updateProductDto,
    };
    return this.products[productIndex];
  }

  remove(id: number) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    const deletedProduct = this.products.splice(productIndex, 1);
    return deletedProduct[0];
  }
}
