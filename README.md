# Inventory Management API

This project is a RESTful API for managing inventory, built using TypeScript, Express, and PostgreSQL with TypeORM. It allows users to add, update, delete, and view products in the inventory while providing optional features like filtering, event logging, and pagination.

## Features
- **Add New Products**: Add new products with unique names.
- **Update Product Quantity**: Update the quantity of existing products.
- **Delete Products**: Delete products, but only if their quantity is zero.
- **Retrieve Products**: Fetch all products or filter them by category or quantity range.
- **Event Logging**: Track when products are added, updated, or deleted.
- **Pagination**: Retrieve paginated lists of products.

### Optional Features:
1. **Filter Products**: By category or by quantity range.
2. **Event Logging**: Tracks product add, update, delete events.
3. **Pagination**: Handles large datasets.

## Prerequisites
Before running the project, ensure you have:
- Node.js installed
- PostgreSQL installed and running

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/inventory-management-api.git
   ```

2. Navigate to the project directory:
   ```bash
   cd inventory-management-api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up your environment variables in a `.env` file:
   ```
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=your_user
   POSTGRES_PASSWORD=your_password
   POSTGRES_DB=inventory_db
   ```

5. Create the database schema:
   ```bash
   npm run typeorm migration:run
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. The API will be available at `http://localhost:3000`.

## Endpoints

### 1. **Add Product**
   - **POST** `/api/products`
   - Request Body:
     ```json
     {
       "name": "Product Name",
       "quantity": 10,
       "category": "Category Name"
     }
     ```

### 2. **Update Product Quantity**
   - **PUT** `/api/products/:id`
   - Request Body:
     ```json
     {
       "quantity": 5
     }
     ```

### 3. **Delete Product**
   - **DELETE** `/api/products/:id`

### 4. **Retrieve Products**
   - **GET** `/api/products`
   - Optional Query Parameters:
     - `category`
     - `minQuantity`
     - `maxQuantity`
     - `page`
     - `limit`

### 5. **Retrieve Single Product by ID**
   - **GET** `/api/products/:id`

### Optional Features
- Filter products by category or quantity range with query parameters.
- Paginate results using `page` and `limit` parameters.
- Logs for all product actions are recorded and stored in the database.

## Technologies Used
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Other**: dotenv for environment configuration

## License
This project is licensed under the MIT License.
