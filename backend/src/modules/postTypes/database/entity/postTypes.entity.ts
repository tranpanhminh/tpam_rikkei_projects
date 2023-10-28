import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from "typeorm";

@Entity("post_types")
export class PostTypesEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

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
