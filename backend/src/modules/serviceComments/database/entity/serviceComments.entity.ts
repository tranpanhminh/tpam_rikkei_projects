import { PostTypesEntity } from 'src/modules/postTypes/database/entity/postTypes.entity';
import { ServicesEntity } from 'src/modules/services/database/entity/services.entity';
import { UsersEntity } from 'src/modules/users/database/entity/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('service_comments')
export class ServiceCommentsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'longtext', nullable: false })
  comment: string;

  @Column({ type: 'float', nullable: false })
  rating: number;

  @Column({ type: 'int', nullable: false })
  user_id: number;

  @Column({ type: 'int', nullable: false })
  post_type_id: number;

  @Column({ type: 'int', nullable: false })
  post_id: number;

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

  // Products (1) - (N) Product Comments
  @ManyToOne(() => ServicesEntity, (services) => services.service_comments, {
    cascade: true, // Tùy chọn cascade update
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE', // Tùy chọn ondelete
  })
  @JoinColumn({
    name: 'post_id',
    foreignKeyConstraintName: 'FK.services.service_comments',
  })
  services: ServicesEntity;

  // Users (1) - (N) Product Comments
  @ManyToOne(() => UsersEntity, (users) => users.service_comments, {
    cascade: true, // Tùy chọn cascade update
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE', // Tùy chọn ondelete
  })
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'FK.users.service_comments',
  })
  users: UsersEntity;

  // Post Type (1) - (N) Product Comments
  @ManyToOne(
    () => PostTypesEntity,
    (post_types) => post_types.service_comments,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT', // Tùy chọn ondelete
    },
  )
  @JoinColumn({
    name: 'post_type_id',
    foreignKeyConstraintName: 'FK.post_types.service_comments',
  })
  post_types: PostTypesEntity;
}
