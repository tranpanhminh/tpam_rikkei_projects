import { ProductsEntity } from 'src/modules/products/database/entity/products.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('product_images')
export class ProductImagesEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  product_id: number;

  @Column({ nullable: false })
  image_url: string;

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

  // Products (1) - (N) Product Images
  @ManyToOne(() => ProductsEntity, (products) => products.product_images, {
    cascade: true, // Tùy chọn cascade update
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE', // Tùy chọn ondelete
  })
  @JoinColumn({
    name: 'product_id',
    foreignKeyConstraintName: 'FK.products.product_images',
  })
  products: ProductsEntity;
}
