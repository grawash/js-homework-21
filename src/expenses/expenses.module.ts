import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { DeviceMiddleware } from 'src/middlewares/device.middleware';
import { PermissionMiddleware } from 'src/middlewares/permission.middleware';
import { TimeRestrictionMiddleware } from 'src/middlewares/time-restriction.middleware';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DeviceMiddleware, PermissionMiddleware, TimeRestrictionMiddleware)
      .forRoutes(ExpensesController)
  }
}
