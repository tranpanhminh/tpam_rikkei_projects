/* eslint-disable prettier/prettier */
import { UsersEntity } from 'src/modules/users/database/entity/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  OneToMany,
} from 'typeorm';

@Entity('user_roles')
export class UserRolesEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

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

  // User Roles (1) - (N) Users
  @OneToMany(() => UsersEntity, (users) => users.user_roles)
  users: UsersEntity[];
}
