import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from "typeorm";

@Entity("order_statuses")
export class OrderStatusesEntity {
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
