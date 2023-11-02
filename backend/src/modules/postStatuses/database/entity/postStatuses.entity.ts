import { PagesEntity } from 'src/modules/pages/database/entity/pages.entity';
import { PostsEntity } from 'src/modules/posts/database/entity/posts.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  OneToMany,
} from 'typeorm';

@Entity('post_statuses')
export class PostStatusesEntity {
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

  // Post Types (1) - (N) Posts
  @OneToMany(() => PostsEntity, (posts) => posts.post_types)
  posts: PostsEntity[];

  // Post Types (1) - (N) Pages
  @OneToMany(() => PagesEntity, (pages) => pages.post_types)
  pages: PagesEntity[];
}
