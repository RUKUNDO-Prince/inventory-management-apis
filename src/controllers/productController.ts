import { Request, Response } from 'express';
import { AppDataSource } from '../database/dataSource';
import { Product } from '../entity/Product';
import { Log } from '../entity/Log';

// Add new product
export const addProduct = async (req: Request, res: Response) => {
    const { name, quantity, category } = req.body;

    try {
        const productRepo = AppDataSource.getRepository(Product);
        const existingProduct = await productRepo.findOneBy({ name });

        if (existingProduct) {
            return res.status(400).json({ message: 'Product name must be unique' });
        }

        const newProduct = productRepo.create({ name, quantity, category });
        await productRepo.save(newProduct);

        await logAction('ADD', newProduct.id);

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update product quantity
export const updateProductQuantity = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        const productRepo = AppDataSource.getRepository(Product);
        const product = await productRepo.findOneBy({ id: Number(id) });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (quantity < 0) {
            return res.status(400).json({ message: 'Quantity cannot be negative' });
        }

        product.quantity = quantity;
        await productRepo.save(product);

        await logAction('UPDATE', product.id);

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const productRepo = AppDataSource.getRepository(Product);
        const product = await productRepo.findOneBy({ id: Number(id) });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.quantity > 0) {
            return res.status(400).json({ message: 'Product with quantity > 0 cannot be deleted' });
        }

        await productRepo.delete(id);

        await logAction('DELETE', Number(id));

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all products (with filtering and pagination)
export const getProducts = async (req: Request, res: Response) => {
    const { category, minQuantity, maxQuantity, page = 1, limit = 10 } = req.query;

    try {
        const productRepo = AppDataSource.getRepository(Product);
        const query = productRepo.createQueryBuilder('product');

        if (category) {
            query.andWhere('product.category = :category', { category });
        }

        if (minQuantity) {
            query.andWhere('product.quantity >= :minQuantity', { minQuantity: Number(minQuantity) });
        }

        if (maxQuantity) {
            query.andWhere('product.quantity <= :maxQuantity', { maxQuantity: Number(maxQuantity) });
        }

        const [products, total] = await query
            .skip((Number(page) - 1) * Number(limit))
            .take(Number(limit))
            .getManyAndCount();

        res.status(200).json({
            products,
            total,
            page: Number(page),
            limit: Number(limit),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const productRepo = AppDataSource.getRepository(Product);
        const product = await productRepo.findOneBy({ id: Number(id) });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Helper function to log actions
const logAction = async (action: string, productId: number) => {
    const logRepo = AppDataSource.getRepository(Log);
    const newLog = logRepo.create({ action, productId });
    await logRepo.save(newLog);
};
