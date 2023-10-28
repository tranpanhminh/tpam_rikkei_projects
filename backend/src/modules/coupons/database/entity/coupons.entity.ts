import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm';

@Entity('coupons')
export class CouponsEntity {
  findOneById(parseValue: number) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false })
  code: string;

  @Column({ nullable: false })
  discount_rate: number;

  @Column({ nullable: false })
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
