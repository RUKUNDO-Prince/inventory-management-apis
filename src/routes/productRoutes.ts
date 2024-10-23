import { Router } from 'express';
import { addProduct, updateProductQuantity, deleteProduct, getProducts, getProductById } from '../controllers/productController';
import { getLogs } from '../controllers/logController';

const router = Router();

// Product routes
router.post('/products', addProduct);
router.put('/products/:id', updateProductQuantity);
router.delete('/products/:id', deleteProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);

// Log routes
router.get('/logs', getLogs);

export default router;
