import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @Column()
  productId: number;

  @Column()
  details: string;

  @CreateDateColumn()
  timestamp: Date;
}
