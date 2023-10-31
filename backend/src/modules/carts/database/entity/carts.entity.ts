import { ProductsEntity } from "src/modules/products/database/entity/products.entity";
import { UsersEntity } from "src/modules/users/database/entity/users.entity";
import { Entity, PrimaryGeneratedColumn, Column, Timestamp, ManyToOne } from "typeorm";

@Entity("carts")
export class CartsEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  product_id: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  price: number;

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

  // Relationship
  // Carts (N) - (1) - Users
  @ManyToOne(() => UsersEntity, (users) => users.carts)
  users: UsersEntity;

  // Carts (N) - (1) - Products
  @ManyToOne(() => ProductsEntity, (products) => products.carts)
  products: ProductsEntity;
}
