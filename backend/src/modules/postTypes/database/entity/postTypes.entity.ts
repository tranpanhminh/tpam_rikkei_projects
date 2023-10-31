import { ProductCommentsEntity } from 'src/modules/productComments/database/entity/productComments.entity';
import { ProductsEntity } from 'src/modules/products/database/entity/products.entity';
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
    (product_comments) => product_comments.users,
  )
  product_comments: ProductCommentsEntity[];
}
