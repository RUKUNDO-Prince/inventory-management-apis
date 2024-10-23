import express from 'express';
import productRoutes from './routes/productRoutes';
import { errorHandler } from './middleware/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const app = express();

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

// Routes
app.use('/api', productRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
