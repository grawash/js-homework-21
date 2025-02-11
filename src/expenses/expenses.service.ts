import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ExpensesService {
  constructor(private readonly usersService: UsersService){}
  private expenses = [
    {
      id: 1,
      category: "entertainment",
      price: 30,
      userId: 1,
      createdAt: new Date("2024-02-01T10:00:00Z")
    }
  ]
  create(userId: number, createExpenseDto: CreateExpenseDto) {
    const user = this.usersService.findOne(userId)
    const lastId = this.expenses[this.expenses.length-1]?.id || 0;

    const newExpense = {
      ...createExpenseDto,
      id: lastId+1,
      userId: userId,
      createdAt: new Date(),
    }
    this.expenses.push(newExpense);
    return newExpense;
  }

  findAll() {
    return this.expenses;
  }

  findOne(id: number) {
    const expense = this.expenses.find((exp) => exp.id === id);
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
