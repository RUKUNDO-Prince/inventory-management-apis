import { Router } from "express";
import { getRepository } from "typeorm";
import { Product } from "../entity/Product";

export const productRouter = Router();

// Add New Product
productRouter.post("/", async (req, res) => {
  const { name, quantity, category } = req.body;

  const productRepository = getRepository(Product);

  const existingProduct = await productRepository.findOne({ where: { name } });
  if (existingProduct) {
    return res.status(400).json({ message: "Product name already exists" });
  }

  try {
    const product = productRepository.create({ name, quantity, category });
    await productRepository.save(product);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
});

// Update Product Quantity
productRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity < 0) {
    return res.status(400).json({ message: "Quantity cannot be negative" });
  }

  const productRepository = getRepository(Product);
  const product = await productRepository.findOne(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.quantity = quantity;
  await productRepository.save(product);

  res.json(product);
});

// Delete Product
productRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const productRepository = getRepository(Product);
  const product = await productRepository.findOne(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.quantity > 0) {
    return res.status(400).json({ message: "Cannot delete product with quantity greater than 0" });
  }

  await productRepository.remove(product);
  res.json({ message: "Product deleted" });
});

// Retrieve Product List with Filters
productRouter.get("/", async (req, res) => {
  const { category, minQuantity, maxQuantity } = req.query;

  const productRepository = getRepository(Product);
  
  // Build query based on filters
  let query = productRepository.createQueryBuilder("product");

  if (category) {
    query = query.andWhere("product.category = :category", { category });
  }
  if (minQuantity) {
    query = query.andWhere("product.quantity >= :minQuantity", { minQuantity: Number(minQuantity) });
  }
  if (maxQuantity) {
    query = query.andWhere("product.quantity <= :maxQuantity", { maxQuantity: Number(maxQuantity) });
  }

  try {
    const products = await query.getMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
});


// Retrieve Single Product
productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const productRepository = getRepository(Product);
  const product = await productRepository.findOne(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});
