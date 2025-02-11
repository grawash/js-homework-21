import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SubscriptionGuard } from './subscription.guard';
import { IsAdmin, IsEditor, IsViewer } from './permission.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(IsEditor)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @UseGuards(SubscriptionGuard, IsViewer)
  findAll(@Req() request) {
    const userId: number = Number(request.headers['user-id']);
    return this.productsService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(IsViewer)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(IsEditor)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(IsAdmin)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
