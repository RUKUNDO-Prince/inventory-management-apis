import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './database/dataSource';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => console.log('Database connection error:', error));
