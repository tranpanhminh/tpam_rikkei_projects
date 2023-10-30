import { PostTypesEntity } from 'src/modules/postTypes/database/entity/postTypes.entity';
import { VendorsEntity } from 'src/modules/vendors/database/entity/vendors.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('products')
export class ProductsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  quantity_stock: number;

  @Column({ nullable: false })
  thumbnail_url: number;

  @Column({ nullable: true })
  vendor_id: number;

  @Column({ nullable: false })
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

  // Post Types (1) - (1) Products
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
}
