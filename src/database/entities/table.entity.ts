import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Customers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column()
  capacity: number;
}
