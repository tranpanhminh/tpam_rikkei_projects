import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from "typeorm";

@Entity("product_images")
export class ProductImagesEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: false })
  product_id: number;

  @Column({ nullable: false })
  image_url: string;

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
}
