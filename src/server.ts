import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { Product } from "./entity/Product";
import { productRouter } from "./routes/productRoutes";

createConnection().then(async () => {
  const app = express();

  app.use(express.json());
  app.use("/api/products", productRouter);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => console.log(error));
