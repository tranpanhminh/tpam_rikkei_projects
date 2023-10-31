import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm';

@Entity('payments')
export class PaymentsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255, nullable: false })
  cardholder_name: string;

  @Column({ length: 255, nullable: false })
  card_number: string;

  @Column({ length: 255, nullable: false })
  expiry_date: string;

  @Column({ type: 'bigint', nullable: false })
  cvv: number;

  @Column({ type: 'float', nullable: false })
  balance: number;

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
