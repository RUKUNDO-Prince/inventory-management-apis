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

// Retrieve Product List and Single Product
productRouter.get("/", async (req, res) => {
  const productRepository = getRepository(Product);
  const products = await productRepository.find();
  res.json(products);
});

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const productRepository = getRepository(Product);
  const product = await productRepository.findOne(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});
