import { BookingsEntity } from 'src/modules/bookings/database/entity/bookings.entity';
import { CartsEntity } from 'src/modules/carts/database/entity/carts.entity';
import { OrdersEntity } from 'src/modules/orders/database/entity/orders.entity';
import { ProductCommentsEntity } from 'src/modules/productComments/database/entity/productComments.entity';
import { ServiceCommentsEntity } from 'src/modules/serviceComments/database/entity/serviceComments.entity';
import { UserRolesEntity } from 'src/modules/userRoles/database/entity/userRoles.entity';
import { UserStatusesEntity } from 'src/modules/userStatuses/database/entity/userStatuses.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  full_name: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'longtext', nullable: false })
  image_avatar: string;

  @Column({ type: 'int', nullable: false })
  role_id: number;

  @Column({ type: 'int', nullable: false })
  status_id: number;

  @Column({ type: 'text', nullable: true })
  reset_token: string;

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
  // User Roles (N) - (1) Users
  @ManyToOne(() => UserRolesEntity, (user_roles) => user_roles.users, {
    cascade: true, // Tùy chọn cascade update
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT', // Tùy chọn ondelete
  })
  @JoinColumn({ name: 'role_id' })
  user_roles: UserRolesEntity;

  // User Statuses (N) - (1) Users
  @ManyToOne(() => UserStatusesEntity, (user_statuses) => user_statuses.users, {
    cascade: true, // Tùy chọn cascade update
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT', // Tùy chọn ondelete
  })
  @JoinColumn({ name: 'status_id' })
  user_statuses: UserStatusesEntity;

  // Users (1) - (N) Product Comments
  @OneToMany(
    () => ProductCommentsEntity,
    (product_comments) => product_comments.users,
  )
  product_comments: ProductCommentsEntity[];

  // Users (1) - (N) Service Comments
  @OneToMany(
    () => ServiceCommentsEntity,
    (service_comments) => service_comments.users,
  )
  service_comments: ServiceCommentsEntity[];

  // Users (1) - (N) Carts
  @OneToMany(() => CartsEntity, (carts) => carts.users)
  carts: CartsEntity[];

  // Users (1) - (N) Orders
  @OneToMany(() => OrdersEntity, (orders) => orders.users)
  orders: OrdersEntity[];

  // Users (1) - (N) Bookings
  @OneToMany(() => BookingsEntity, (bookings) => bookings.users)
  bookings: BookingsEntity[];
}
