import { CancelReasonsEntity } from 'src/modules/cancelReasons/database/entity/cancelReasons.entity';
import { CouponsEntity } from 'src/modules/coupons/database/entity/coupons.entity';
import { OrderItemsEntity } from 'src/modules/orderItems/database/entity/orderItems.entity';
import { OrderStatusesEntity } from 'src/modules/orderStatuses/database/entity/orderStatuses.entity';
import { UsersEntity } from 'src/modules/users/database/entity/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('orders')
export class OrdersEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', nullable: false })
  user_id: number;

  @Column({ length: 255, nullable: false })
  customer_name: string;

  @Column({ length: 255, nullable: false })
  address: string;

  @Column({ length: 255, nullable: false })
  phone: string;

  @Column({ type: 'float', nullable: false })
  discount_rate: number;

  @Column({ type: 'float', nullable: false })
  discounted: number;

  @Column({ type: 'float', nullable: false })
  bill: number;

  @Column({ type: 'float', nullable: false })
  total_bill: number;

  @Column({ length: 255, nullable: false })
  cancellation_reason: string;

  @Column({ type: 'int', nullable: true })
  cancel_reason_id: number;

  @Column({ type: 'int', nullable: true })
  coupon_id: number;

  @Column({ type: 'int', nullable: false })
  status_id: number;

  @Column({ length: 255, nullable: false })
  email_paypal: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  order_date: Timestamp;

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

  // Orders (N) - (1) - Users
  @ManyToOne(() => UsersEntity, (users) => users.orders, {
    cascade: true, // Tùy chọn cascade update
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT', // Tùy chọn ondelete
  })
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'FK.users.orders',
  })
  users: UsersEntity;

  // Orders (N) - (1) - Order Status
  @ManyToOne(
    () => OrderStatusesEntity,
    (order_statuses) => order_statuses.orders,
    {
      cascade: true, // Tùy chọn cascade update
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT', // Tùy chọn ondelete
    },
  )
  @JoinColumn({
    name: 'status_id',
    foreignKeyConstraintName: 'FK.order_statuses.orders',
  })
  order_statuses: OrderStatusesEntity;

  // Orders (N) - (1) - Cancel Reasons
  @ManyToOne(
    () => CancelReasonsEntity,
    (cancel_reasons) => cancel_reasons.orders,
    {
      cascade: true, // Tùy chọn cascade update
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // Tùy chọn ondelete
    },
  )
  @JoinColumn({
    name: 'cancel_reason_id',
    foreignKeyConstraintName: 'FK.cancel_reasons.orders',
  })
  cancel_reasons: CancelReasonsEntity;

  // Orders (N) - (1) - Coupons
  @ManyToOne(() => CouponsEntity, (coupons) => coupons.orders, {
    cascade: true, // Tùy chọn cascade update
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL', // Tùy chọn ondelete
  })
  @JoinColumn({
    name: 'coupon_id',
    foreignKeyConstraintName: 'FK.coupons.orders',
  })
  coupons: CouponsEntity;

  // Orders (1) - (N) Order Items
  @OneToMany(() => OrderItemsEntity, (order_items) => order_items.orders)
  order_items: OrderItemsEntity[];
}
