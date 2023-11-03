import { PostStatusesEntity } from 'src/modules/postStatuses/database/entity/postStatuses.entity';
import { PostTypesEntity } from 'src/modules/postTypes/database/entity/postTypes.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('pages')
export class PagesEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255, nullable: false })
  title: string;

  @Column({ type: 'longtext', nullable: false })
  content: string;

  @Column({ type: 'text', nullable: false })
  thumbnail_url: string;

  @Column({ length: 255, nullable: false })
  author: string;

  @Column({ type: 'int', nullable: false })
  status_id: number;

  @Column({ type: 'int', nullable: false })
  post_type_id: number;

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

  // Post Types (N) - (1) Pages
  @ManyToOne(() => PostTypesEntity, (post_types) => post_types.pages, {
    cascade: true, // Tùy chọn cascade update
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT', // Tùy chọn ondelete
  })
  @JoinColumn({
    name: 'post_type_id',
    foreignKeyConstraintName: 'FK.post_types.pages',
  })
  post_types: PostTypesEntity;

  // Post Statuses (N) - (1) Pages
  @ManyToOne(() => PostStatusesEntity, (post_statuses) => post_statuses.pages, {
    cascade: true, // Tùy chọn cascade update
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT', // Tùy chọn ondelete
  })
  @JoinColumn({
    name: 'status_id',
    foreignKeyConstraintName: 'FK.post_statuses.pages',
  })
  post_statuses: PostStatusesEntity;
}
