import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm';

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
}
