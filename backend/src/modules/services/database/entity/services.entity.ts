import { BookingsEntity } from 'src/modules/bookings/database/entity/bookings.entity';
import { PostTypesEntity } from 'src/modules/postTypes/database/entity/postTypes.entity';
import { ServiceCommentsEntity } from 'src/modules/serviceComments/database/entity/serviceComments.entity';
import { WorkingTimeEntity } from 'src/modules/workingTime/database/entity/workingTime.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('services')
export class ServicesEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'text', nullable: false })
  service_image: string;

  @Column({ type: 'int', nullable: true })
  working_time_id: number;

  @Column({ type: 'int', nullable: false })
  post_type_id: number;

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
  // Services (1) - (N) Service Comments
  @OneToMany(
    () => ServiceCommentsEntity,
    (service_comments) => service_comments.services,
  )
  service_comments: ServiceCommentsEntity[];

  // Working Time (N) - (1) Services
  @ManyToOne(() => WorkingTimeEntity, (working_time) => working_time.services, {
    cascade: true, // Tùy chọn cascade update
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL', // Tùy chọn ondelete
  })
  @JoinColumn({
    name: 'working_time_id',
    foreignKeyConstraintName: 'FK.working_time.services',
  })
  working_time: WorkingTimeEntity;

  // Post Types (N) - (1) Products
  @ManyToOne(() => PostTypesEntity, (post_types) => post_types.services, {
    cascade: true, // Tùy chọn cascade update
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT', // Tùy chọn ondelete
  })
  @JoinColumn({
    name: 'post_type_id',
    foreignKeyConstraintName: 'FK.post_types.services',
  })
  post_types: PostTypesEntity;

  // Services (1) - (N) Bookings
  @OneToMany(() => BookingsEntity, (bookings) => bookings.services)
  bookings: BookingsEntity[];
}
