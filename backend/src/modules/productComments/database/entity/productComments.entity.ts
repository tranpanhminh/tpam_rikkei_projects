import { PostTypesEntity } from "src/modules/postTypes/database/entity/postTypes.entity";
import { ProductsEntity } from "src/modules/products/database/entity/products.entity";
import { UsersEntity } from "src/modules/users/database/entity/users.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("product_comments")
export class ProductCommentsEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: false })
  comment: string;

  @Column({ nullable: false })
  rating: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  post_type_id: number;

  @Column({ nullable: false })
  post_id: number;

  @Column({
    nullable: false,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Timestamp;

  @Column({
    nullable: false,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Timestamp;

  // Products (1) - (N) Product Comments
  @ManyToOne(() => ProductsEntity, (products) => products.product_comments, {
    cascade: true, // Tùy chọn cascade update
    onUpdate: "CASCADE",
    onDelete: "CASCADE", // Tùy chọn ondelete
  })
  @JoinColumn({
    name: "post_id",
    foreignKeyConstraintName: "FK.products.product_comments",
  })
  products: ProductsEntity;

  // Users (1) - (N) Product Comments
  @ManyToOne(() => UsersEntity, (users) => users.product_comments, {
    cascade: true, // Tùy chọn cascade update
    onUpdate: "CASCADE",
    onDelete: "CASCADE", // Tùy chọn ondelete
  })
  @JoinColumn({
    name: "user_id",
    foreignKeyConstraintName: "FK.users.product_comments",
  })
  users: UsersEntity;

  // Post Type (1) - (N) Product Comments
  @ManyToOne(
    () => PostTypesEntity,
    (post_types) => post_types.product_comments,
    {
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT", // Tùy chọn ondelete
    }
  )
  @JoinColumn({
    name: "post_type_id",
    foreignKeyConstraintName: "FK.post_types.product_comments",
  })
  post_types: PostTypesEntity;
}
