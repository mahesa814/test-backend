import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tables } from 'src/database/entities/table.entity';
import { TableController } from './table.controller';
import { ReservationsService } from '../reservation/reservation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tables])],
  controllers: [TableController],
  providers: [TableService, TypeOrmModule],
  exports: [TableService],
})
export class TableModule {}
