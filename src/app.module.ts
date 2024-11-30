import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReservationModule } from './modules/reservation/reservation.module';

import { TableModule } from './modules/table/table.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppDataSource from './config/typeorm.config';
import { InterceptorProvider } from './common/interceptors/interceptor.provider';
import { CustomerModule } from './modules/customer/customer.module';
import { ReservationsService } from './modules/reservation/reservation.service';
import { CustomerService } from './modules/customer/customer.service';
import { TableService } from './modules/table/table.service';
import { EmailService } from './modules/email/email.service';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(AppDataSource.options),
    ReservationModule,
    CustomerModule,
    TableModule,
    EmailModule,
  ],
  providers: [...InterceptorProvider, EmailService],
})
export class AppModule {}
