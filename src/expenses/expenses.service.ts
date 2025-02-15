import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { UsersService } from 'src/users/users.service';
import { Expense } from './shcema/expense.schema';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class ExpensesService {
  constructor(private readonly usersService: UsersService, @InjectModel(Expense.name) private expenseModel: Model<Expense>){}
  
  private expenses = [
    {
      id: 1,
      category: "entertainment",
      price: 30,
      user: 'a',
      createdAt: new Date("2024-02-01T10:00:00Z")
    }
  ]
  async create(userId: string, createExpenseDto: CreateExpenseDto) {
    const user = await this.usersService.findOne(userId)
    if(Object.keys(user).length < 1) throw new HttpException("user does not exist", HttpStatus.NOT_FOUND)
    console.log(user.id)
    const newExpense = {
      ...createExpenseDto,
      user: user.id,
      createdAt: new Date(),
    }
    const expense = this.expenseModel.create(newExpense);
    return newExpense;
  }

  async findAll() {
    const expenses = this.expenseModel.find()
    return expenses;
  }

  findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("invalid id provided")
    const expense = this.expenseModel.findById(id).populate('user');
    if(!expense){
      throw new HttpException('expense not found', HttpStatus.NOT_FOUND)
    }
    return expense;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expenseIndex = this.expenses.findIndex((exp) => exp.id === id);
    if (expenseIndex === -1) {
      throw new HttpException('expense not found', HttpStatus.NOT_FOUND)
    }
    this.expenses[expenseIndex] = {
      ...this.expenses[expenseIndex],
      category: updateExpenseDto.category || this.expenses[expenseIndex].category,
      price: updateExpenseDto.price || this.expenses[expenseIndex].price,
  }
    return this.expenses[expenseIndex];
  }

  remove(id: number) {
    const expenseIndex = this.expenses.findIndex((exp) => exp.id === id);
    if (expenseIndex === -1) {
      throw new HttpException('expense not found', HttpStatus.NOT_FOUND)
    }
    const deletedExpense = this.expenses.splice(expenseIndex, 1);
    return deletedExpense[0];
  }
}
