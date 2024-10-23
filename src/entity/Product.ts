import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import { IsNotEmpty, Min } from "class-validator";

@Entity()
@Unique(["name"])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @Min(0)
  quantity: number;

  @Column()
  @IsNotEmpty()
  category: string;
}
