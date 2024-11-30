import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservations } from 'src/database/entities/reservation.entity';
import { Repository } from 'typeorm';
import { TableService } from '../table/table.service';
import { CustomerService } from '../customer/customer.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Tables } from 'src/database/entities/table.entity';
import { Customers } from 'src/database/entities/customer.entity';
import { EmailService } from '../email/email.service';

@Injectable()
export class ReservationsService {
  private readonly openingTime = 9; // 9 AM
  private readonly closingTime = 21; // 9 PM

  constructor(
    @InjectRepository(Reservations)
    private readonly reservationRepository: Repository<Reservations>,

    @InjectRepository(Tables)
    private readonly tableRepository: Repository<Tables>,

    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,

    private readonly emailService: EmailService,
  ) {}

  async create(
    createReservationsDto: CreateReservationDto,
  ): Promise<Reservations> {
    const { customer_id, table_id, reservation_time, number_of_guests } =
      createReservationsDto;

    // Validate restaurant open hours
    const reservationHour = new Date(reservation_time).getUTCHours();

    if (
      reservationHour < this.openingTime ||
      reservationHour >= this.closingTime
    ) {
      throw new BadRequestException(
        'Reservations can only be made during open hours.',
      );
    }

    // Check if the table is already reserved for the same time slot
    const conflictingReservations = await this.reservationRepository
      .createQueryBuilder('reservations')
      .where('reservations.tableId = :table_id', { table_id })
      .andWhere('reservations.reservation_time = :reservation_time', {
        reservation_time: new Date(reservation_time),
      })
      .getMany();

    console.log('CONFLICT', conflictingReservations);

    if (conflictingReservations.length > 0) {
      throw new BadRequestException(
        'This table is already booked for the requested time slot.',
      );
    }

    // Now check for overlap, in case you're allowing reservations of the same table within a window.
    const overlappingReservations = await this.reservationRepository
      .createQueryBuilder('reservations')
      .where('reservations.tableId = :table_id', { table_id })
      .andWhere(
        'reservations.reservation_time <= :reservation_time AND ' +
          "reservations.reservation_time + INTERVAL '1 hour' > :reservation_time",
        {
          reservation_time: new Date(reservation_time),
        },
      )
      .getMany();

    if (overlappingReservations.length > 0) {
      throw new BadRequestException(
        'This table is already booked for the requested time slot.',
      );
    }

    // Fetch the table and customer data
    const table = await this.tableRepository.findOneBy({ id: table_id });
    const customer = await this.customerRepository.findOneBy({
      id: customer_id,
    });

    // Create reservation
    const reservation = this.reservationRepository.create({
      customer,
      reservation_time: new Date(reservation_time),
      table,
      number_of_guests: number_of_guests,
    });

    // Save reservation to database
    await this.reservationRepository.save(reservation);

    this.emailService.sendEmail(
      customer.email,
      'Reservation Success',
      `Email sent to ${customer.email} for reservation at ${reservation_time}`,
    );

    return reservation;
  }

  async update(
    id: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservations> {
    const { customer_id, table_id, reservation_time, number_of_guests } =
      updateReservationDto;
    const reservation = await this.reservationRepository.findOneBy({ id: id });
    if (!reservation) {
      throw new NotFoundException('Reservation not found.');
    }
    // Validate restaurant open hours
    const reservationHour = new Date(reservation_time).getHours();
    if (
      reservationHour < this.openingTime ||
      reservationHour >= this.closingTime
    ) {
      throw new BadRequestException(
        'Reservations can only be made during open hours.',
      );
    }
    // Check if the table is already booked
    const conflictingReservations = await this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.tableId = :tableId', { tableId: table_id })
      .andWhere('reservation.reservation_time = :reservation_time', {
        reservation_time,
      })
      .andWhere('reservation.id != :reservationId', { reservationId: id })
      .getMany();
    if (conflictingReservations.length > 0) {
      throw new BadRequestException(
        'This table is already booked for the requested time slot.',
      );
    }
    const table = await this.tableRepository.findOneBy({ id: table_id });
    const customer = await this.customerRepository.findOneBy({
      id: customer_id,
    });
    reservation.customer = customer;
    reservation.reservation_time = new Date(reservation_time);
    reservation.table = table;
    reservation.number_of_guests = number_of_guests;
    await this.reservationRepository.save(reservation);
    console.log(
      `Email sent to ${customer.email} for updated reservation at ${reservation_time}`,
    );
    return reservation;
  }
  async findAll(): Promise<Reservations[]> {
    return this.reservationRepository.find({ order: { created_at: 'DESC' } });
  }
}
