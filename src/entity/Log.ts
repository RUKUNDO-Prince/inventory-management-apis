import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    private _id!: number;

    @Column()
    private _action!: string;

    @Column()
    private _productId!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    private _timestamp!: Date;

    // Getters and Setters

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get action(): string {
        return this._action;
    }

    set action(value: string) {
        this._action = value;
    }

    get productId(): number {
        return this._productId;
    }

    set productId(value: number) {
        this._productId = value;
    }

    get timestamp(): Date {
        return this._timestamp;
    }

    set timestamp(value: Date) {
        this._timestamp = value;
    }
}
