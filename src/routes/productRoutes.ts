import { Router } from 'express';
import { addProduct, updateProductQuantity, deleteProduct, getProducts, getProductById } from '../controllers/productController';
import { getLogs } from '../controllers/logController';

const router = Router();

// Product routes
router.post('/products', addProduct as any);
router.put('/products/:id', updateProductQuantity as any);
router.delete('/products/:id', deleteProduct as any);
router.get('/products', getProducts as any);
router.get('/products/:id', getProductById as any);

// Log routes
router.get('/logs', getLogs as any);

export default router;
