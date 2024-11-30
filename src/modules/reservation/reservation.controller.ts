import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  Put,
  Param,
  Get,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { zodToOpenAPI, ZodValidationPipe } from 'nestjs-zod2'; // A Zod validation pipe library for NestJS
import { ReservationsService } from './reservation.service';
import {
  CreateReservationDto,
  CreateReservationDtoSchema,
} from './dto/create-reservation.dto';
import { ReservationResponse } from './response/create-reservation.response';
import {
  UpdateReservationDto,
  UpdateReservationDtoSchema,
} from './dto/update-reservation.dto';

@Controller('api/reservations')
@ApiTags('Reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationsService) {}

  @Post('/')
  @ApiResponse({})
  @UsePipes(new ZodValidationPipe(CreateReservationDtoSchema))
  @ApiBody({ schema: zodToOpenAPI(CreateReservationDtoSchema) })
  async create(@Body() createReservationDto: CreateReservationDto) {
    try {
      const reservation =
        await this.reservationService.create(createReservationDto);
      return new ReservationResponse({
        id: reservation.id,
        reservation_time: reservation.reservation_time,
        number_of_guests: reservation.number_of_guests,
        table: reservation.table,
        customer: reservation.customer,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  @Put('/:id')
  @ApiResponse({})
  @ApiBody({ schema: zodToOpenAPI(UpdateReservationDtoSchema) })
  @UsePipes(new ZodValidationPipe(UpdateReservationDtoSchema))
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    try {
      const reservation = await this.reservationService.update(
        id,
        updateReservationDto,
      );
      return {
        status: 'success',
        message: 'Reservation updated successfully.',
        reservation,
        table: reservation.table,
        customer: reservation.customer,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'List of customers retrieved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async getList() {
    try {
      const reservations = await this.reservationService.findAll();
      return { status: 'success', data: reservations };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
