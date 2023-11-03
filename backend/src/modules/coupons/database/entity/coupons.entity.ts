import { OrdersEntity } from 'src/modules/orders/database/entity/orders.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  OneToMany,
} from 'typeorm';

@Entity('coupons')
export class CouponsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false })
  code: string;

  @Column({ type: 'float', nullable: false })
  discount_rate: number;

  @Column({ type: 'float', nullable: false })
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

  // // Cancel Reasons (1) - (N) Orders
  // @OneToMany(() => OrdersEntity, (orders) => orders.coupons)
  // orders: OrdersEntity[];
}
