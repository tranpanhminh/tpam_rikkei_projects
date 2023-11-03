import { BookingStatusesEntity } from 'src/modules/bookingStatuses/database/entity/bookingStatuses.entity';
import { ServicesEntity } from 'src/modules/services/database/entity/services.entity';
import { UsersEntity } from 'src/modules/users/database/entity/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('bookings')
export class BookingsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', nullable: false })
  user_id: number;

  @Column({ type: 'int', nullable: true })
  service_id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false })
  phone: string;

  @Column({ length: 255, nullable: false })
  service_name: string;

  @Column({ type: 'text', nullable: false })
  service_description: string;

  @Column({ type: 'float', nullable: false })
  service_price: number;

  @Column({ type: 'text', nullable: false })
  service_image: string;

  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Timestamp;

  @Column({ type: 'text', nullable: false })
  booking_date: string;

  @Column({ length: 255, nullable: false })
  calendar: string;

  @Column({ type: 'int', nullable: false })
  status_id: number;

  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Timestamp;

  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Timestamp;

  // Relationship
  // Booking Statuses (N) - (1) Bookings
  @ManyToOne(
    () => BookingStatusesEntity,
    (booking_statuses) => booking_statuses.bookings,
    {
      cascade: true, // Tùy chọn cascade update
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT', // Tùy chọn ondelete
    },
  )
  @JoinColumn({
    name: 'status_id',
    foreignKeyConstraintName: 'FK.booking_statuses.bookings',
  })
  booking_statuses: BookingStatusesEntity;

  // Users (N) - (1) Bookings
  @ManyToOne(() => UsersEntity, (users) => users.bookings, {
    cascade: true, // Tùy chọn cascade update
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT', // Tùy chọn ondelete
  })
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'FK.users.bookings',
  })
  users: UsersEntity;

  // Services (N) - (1) Bookings
  @ManyToOne(() => ServicesEntity, (services) => services.bookings, {
    cascade: true, // Tùy chọn cascade update
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL', // Tùy chọn ondelete
  })
  @JoinColumn({
    name: 'service_id',
    foreignKeyConstraintName: 'FK.services.bookings',
  })
  services: ServicesEntity;
}
