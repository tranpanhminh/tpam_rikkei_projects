import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm';

@Entity('payments')
export class PaymentsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255, nullable: false })
  cardholder_name: string;

  @Column({ nullable: false })
  card_number: string;

  @Column({ nullable: false })
  expiry_date: string;

  @Column({ nullable: false })
  cvv: number;

  @Column({ nullable: false })
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
