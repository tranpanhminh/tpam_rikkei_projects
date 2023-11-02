import { PagesEntity } from 'src/modules/pages/database/entity/pages.entity';
import { PostsEntity } from 'src/modules/posts/database/entity/posts.entity';
import { ProductCommentsEntity } from 'src/modules/productComments/database/entity/productComments.entity';
import { ProductsEntity } from 'src/modules/products/database/entity/products.entity';
import { ServiceCommentsEntity } from 'src/modules/serviceComments/database/entity/serviceComments.entity';
import { ServicesEntity } from 'src/modules/services/database/entity/services.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  OneToMany,
} from 'typeorm';

@Entity('post_types')
export class PostTypesEntity {
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

  // Relationship
  // Post Types (1) - (N) Products
  @OneToMany(() => ProductsEntity, (products) => products.post_types)
  products: ProductsEntity[];

  // Post Types (1) - (N) Product Comments
  @OneToMany(
    () => ProductCommentsEntity,
    (product_comments) => product_comments.post_types,
  )
  product_comments: ProductCommentsEntity[];

  // Post Types (1) - (N) Service Comments
  @OneToMany(
    () => ServiceCommentsEntity,
    (service_comments) => service_comments.post_types,
  )
  service_comments: ServiceCommentsEntity[];

  // Post Types (1) - (N) Services
  @OneToMany(() => ServicesEntity, (services) => services.post_types)
  services: ServicesEntity[];

  // Post Types (1) - (N) Posts
  @OneToMany(() => PostsEntity, (posts) => posts.post_types)
  posts: PostsEntity[];

  // Post Types (1) - (N) Pages
  @OneToMany(() => PagesEntity, (pages) => pages.post_types)
  pages: PagesEntity[];
}
