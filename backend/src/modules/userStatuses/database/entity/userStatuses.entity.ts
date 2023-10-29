import { UsersEntity } from 'src/modules/users/database/entity/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  OneToMany,
} from 'typeorm';

@Entity('user_statuses')
export class UserStatusesEntity {
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

  // User Statuses (1) - (N) Users
  @OneToMany(() => UsersEntity, (users) => users.user_statuses)
  users: UsersEntity[];
}
