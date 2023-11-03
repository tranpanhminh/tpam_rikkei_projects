import { CartsEntity } from 'src/modules/carts/database/entity/carts.entity';
import { OrderItemsEntity } from 'src/modules/orderItems/database/entity/orderItems.entity';
import { PostTypesEntity } from 'src/modules/postTypes/database/entity/postTypes.entity';
import { ProductCommentsEntity } from 'src/modules/productComments/database/entity/productComments.entity';
import { ProductImagesEntity } from 'src/modules/productImages/database/entity/productImages.entity';
import { VendorsEntity } from 'src/modules/vendors/database/entity/vendors.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('products')
export class ProductsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ type: 'longtext', nullable: false })
  description: string;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  quantity_stock: number;

  @Column({ type: 'longtext', nullable: false })
  thumbnail_url: string;

  @Column({ type: 'int', nullable: true })
  vendor_id: number;

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

  // Relationship
  // Vendors (N) - (1) Products
  @ManyToOne(() => VendorsEntity, (vendors) => vendors.products, {
    cascade: true, // Tùy chọn cascade update
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL', // Tùy chọn ondelete
  })
  @JoinColumn({
    name: 'vendor_id',
    foreignKeyConstraintName: 'FK.vendors.products',
  })
  vendors: VendorsEntity;

  // Post Types (N) - (1) Products
  @ManyToOne(() => PostTypesEntity, (post_types) => post_types.products, {
    cascade: true, // Tùy chọn cascade update
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT', // Tùy chọn ondelete
  })
  @JoinColumn({
    name: 'post_type_id',
    foreignKeyConstraintName: 'FK.post_types.products',
  })
  post_types: PostTypesEntity;

  // Products (1) - (N) Product Images
  @OneToMany(
    () => ProductImagesEntity,
    (product_images) => product_images.products,
  )
  product_images: ProductImagesEntity[];

  // Products (1) - (N) Product Comments
  @OneToMany(
    () => ProductCommentsEntity,
    (product_comments) => product_comments.products,
  )
  product_comments: ProductCommentsEntity[];

  // Products (1) - (N) Carts
  @OneToMany(() => CartsEntity, (carts) => carts.products)
  carts: CartsEntity[];

  // Products (1) - (N) Order Items
  @OneToMany(() => OrderItemsEntity, (order_items) => order_items.products)
  order_items: OrderItemsEntity[];
}
