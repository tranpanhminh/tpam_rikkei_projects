import { ServicesEntity } from 'src/modules/services/database/entity/services.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  OneToMany,
} from 'typeorm';

@Entity('working_time')
export class WorkingTimeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255, nullable: false })
  morning_time: string;

  @Column({ length: 255, nullable: false })
  afternoon_time: string;

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

  // Working Time (1) - (N) Services
  @OneToMany(() => ServicesEntity, (services) => services.post_types)
  services: ServicesEntity[];
}
