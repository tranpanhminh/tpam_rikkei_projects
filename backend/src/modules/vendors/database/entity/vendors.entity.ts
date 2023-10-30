import { ProductsEntity } from 'src/modules/products/database/entity/products.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  OneToMany,
} from 'typeorm';

@Entity('vendors')
export class VendorsEntity {
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
  // Vendors (1) - (N) Products
  @OneToMany(() => ProductsEntity, (products) => products.vendors)
  products: ProductsEntity[];
}
