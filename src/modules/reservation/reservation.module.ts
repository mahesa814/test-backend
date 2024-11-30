import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { Reservations } from 'src/database/entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './reservation.service';
import { TableService } from '../table/table.service';
import { CustomerService } from '../customer/customer.service';
import { TableModule } from '../table/table.module';
import { Customers } from 'src/database/entities/customer.entity';
import { Tables } from 'src/database/entities/table.entity';
import { EmailService } from '../email/email.service';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservations, Tables, Customers]),
    EmailModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationsService],
})
export class ReservationModule {}
