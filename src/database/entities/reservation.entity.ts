import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Customers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: number;

  @Column()
  table_id: number;

  @Column()
  reservation_time: Date;

  @Column()
  number_of_guests: number;
}
