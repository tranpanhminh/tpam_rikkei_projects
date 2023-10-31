import { OrdersEntity } from 'src/modules/orders/database/entity/orders.entity';
import { ProductsEntity } from 'src/modules/products/database/entity/products.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('order_items')
export class OrderItemsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', nullable: true })
  order_id: number;

  @Column({ type: 'int', nullable: true })
  product_id: number;

  @Column({ length: 255, nullable: false })
  product_name: string;

  @Column({ type: 'longtext', nullable: false })
  product_description: string;

  @Column({ type: 'longtext', nullable: false })
  product_thumbnail: string;

  @Column({ type: 'float', nullable: false })
  quantity: number;

  @Column({ type: 'float', nullable: false })
  price: number;

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

  // Orders (N) - (1) - Orders
  @ManyToOne(() => OrdersEntity, (orders) => orders.order_items, {
    cascade: true, // Tùy chọn cascade update
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE', // Tùy chọn ondelete
  })
  @JoinColumn({
    name: 'order_id',
    foreignKeyConstraintName: 'FK.order_items.orders',
  })
  orders: OrdersEntity;

  // Products (N) - (1) - Orders
  @ManyToOne(() => ProductsEntity, (products) => products.order_items, {
    cascade: true, // Tùy chọn cascade update
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL', // Tùy chọn ondelete
  })
  @JoinColumn({
    name: 'product_id',
    foreignKeyConstraintName: 'FK.order_items.products',
  })
  products: ProductsEntity;
}
