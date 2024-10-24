import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @Column()
    quantity!: number;

    @Column()
    category!: string;

    constructor(name: string, quantity: number, category: string) {
        if (!name || name.trim() === '') {
            throw new Error('Name cannot be empty');
        }
        if (quantity < 0) {
            throw new Error('Quantity cannot be negative');
        }
        if (!category || category.trim() === '') {
            throw new Error('Category cannot be empty');
        }

        this.name = name.trim();
        this.quantity = quantity;
        this.category = category.trim();
    }
}