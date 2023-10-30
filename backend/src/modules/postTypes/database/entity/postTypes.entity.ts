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
  // Post Types (1) - (1) Products
  @OneToMany(() => ProductsEntity, (products) => products.post_types)
  products: ProductsEntity[];
}
