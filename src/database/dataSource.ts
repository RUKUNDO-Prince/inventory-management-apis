import { DataSource } from 'typeorm';
import { Product } from '../entity/Product';
import { Log } from '../entity/Log';
import 'dotenv/config';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    // host: process.env.DB_HOST,
    // port: Number(process.env.DB_PORT),
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,  // Ensure this is correctly loaded from .env
    // database: process.env.DB_NAME,
    // synchronize: true,
    logging: false,
    entities: [Product, Log],
    url: process.env.POSTGRES_URL,
});
