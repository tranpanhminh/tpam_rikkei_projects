import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm';

@Entity('coupons')
export class CouponsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false })
  code: string;

  @Column({ type: 'decimal', nullable: false })
  discount_rate: number;

  @Column({ type: 'decimal', nullable: false })
  min_bill: number;

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
