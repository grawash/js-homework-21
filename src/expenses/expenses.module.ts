import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { DeviceMiddleware } from 'src/middlewares/device.middleware';
import { PermissionMiddleware } from 'src/middlewares/permission.middleware';
import { TimeRestrictionMiddleware } from 'src/middlewares/time-restriction.middleware';

@Module({
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
