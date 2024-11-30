import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reservations } from './reservation.entity';

@Entity()
export class Tables {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', unique: true, nullable: false })
  number: number;

  @Column({ type: 'int', nullable: false })
  capacity: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    default: 'available',
  })
  status: string;

  @OneToMany(() => Reservations, (reservation) => reservation.table, {
    cascade: true,
  })
  reservations: Reservations[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
