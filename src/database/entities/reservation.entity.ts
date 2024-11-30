import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tables } from './table.entity';
import { Customers } from './customer.entity';

@Entity()
export class Reservations {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tables, (table) => table.reservations, {
    eager: true,
  })
  table: Tables;
  table_id: string;

  @ManyToOne(() => Customers, (customer) => customer.reservations, {
    eager: true,
  })
  customer: Customers;

  customer_id: string;

  @Column({ type: 'timestamp' })
  reservation_time: Date;

  @Column()
  number_of_guests: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
