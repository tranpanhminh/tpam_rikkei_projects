import { ProductCommentsEntity } from 'src/modules/productComments/database/entity/productComments.entity';
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

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  image_avatar: string;

  @Column({ nullable: false })
  role_id: number;

  @Column({ nullable: false })
  status_id: number;

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
}
