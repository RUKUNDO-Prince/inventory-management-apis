import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    action!: string;

    @Column()
    productId!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp!: Date;

    // You can keep the getters and setters if you want, but they're not necessary for TypeORM
}
