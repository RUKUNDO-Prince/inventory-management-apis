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
