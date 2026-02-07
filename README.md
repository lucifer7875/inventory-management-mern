# Inventory Management System - MERN Stack

A full-stack **Product Inventory Management System** built with the MERN stack (MongoDB, Express.js, React, Node.js). Features a class-based Express backend with Swagger documentation, comprehensive CRUD operations, advanced filtering, and clean architecture.

## 🚀 Features

### Backend (Express + TypeScript)

- ✅ **Class-based architecture** with clean separation of concerns
- ✅ **RESTful API** with comprehensive error handling
- ✅ **Swagger/OpenAPI 3.0** interactive documentation
- ✅ **MongoDB integration** with Mongoose ODM
- ✅ **Product CRUD operations** (Create, Read, Update, Delete)
- ✅ **Advanced filtering** by categories, search, and pagination
- ✅ **Data validation** using express-validator
- ✅ **Database seeder** for 100 sample products
- ✅ **Port conflict detection** with clear error messages
- ✅ **TypeScript** for type safety

### API Endpoints

- `GET /api/products` - Get all products (paginated, searchable, filterable)
- `POST /api/products` - Create new product
- `DELETE /api/products/:id` - Delete product by ID
- `GET /api/products/categories` - Get all categories
- `GET /api-docs` - Interactive Swagger documentation
- `GET /api-docs.json` - OpenAPI JSON specification

## 📁 Project Structure

```
inventory-management-mern/
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.ts              # Environment configuration
│   │   │   ├── mongodb.ts          # Database connection
│   │   │   └── swagger.config.ts   # Swagger/OpenAPI spec
│   │   ├── controllers/
│   │   │   └── product.controller.ts
│   │   ├── middlewares/
│   │   │   ├── error.middleware.ts
│   │   │   └── validate.middleware.ts
│   │   ├── models/
│   │   │   ├── Product.ts
│   │   │   └── Category.ts
│   │   ├── routes/
│   │   │   └── product.routes.ts
│   │   ├── seeders/
│   │   │   ├── category.seeder.ts
│   │   │   ├── product.seeder.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   └── product.service.ts
│   │   ├── utils/
│   │   │   └── AppError.ts
│   │   ├── validations/
│   │   │   └── product.validation.ts
│   │   └── index.ts                # App class entry point
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js 5.x** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Swagger UI Express** - API documentation
- **Express Validator** - Request validation
- **dotenv** - Environment variables
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd inventory-management-mern
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the `server` directory:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/inventory_db
   ```

4. **Seed the database** (Optional)

   ```bash
   npm run seed
   ```

   This will populate the database with 100 sample products across 8 categories.

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🎯 Usage

### Development

```bash
npm run dev
```

Server runs on http://localhost:5000

### Production

```bash
npm start
```

### Database Seeding

```bash
npm run seed
```

### Linting

```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
```

## 📚 API Documentation

Once the server is running, access the interactive Swagger documentation:

**Swagger UI:** http://localhost:5000/api-docs

Features:

- 🎨 Interactive "Try it out" functionality
- 📝 Complete request/response schemas
- 🔍 All query parameters documented
- ✨ Example values for testing

**OpenAPI JSON:** http://localhost:5000/api-docs.json

## 🗄️ Database Schema

### Product Model

```typescript
{
  name: String (required, unique)
  description: String
  quantity: Number (required, default: 0)
  categories: [ObjectId] (ref: Category)
  createdAt: Date
  updatedAt: Date
}
```

### Category Model

```typescript
{
  name: String(required, unique);
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔧 Available Scripts

| Script             | Description                              |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Start development server with hot reload |
| `npm run seed`     | Seed database with sample data           |
| `npm run lint`     | Check code for linting errors            |
| `npm run lint:fix` | Auto-fix linting errors                  |
| `npm start`        | Start production server                  |

## 🌟 Key Features Explained

### Class-Based Architecture

The server uses a clean, organized `App` class:

- `configureServer()` - Middleware setup
- `setupRoutes()` - Route configuration
- `testDatabaseConnection()` - DB health check
- `start()` - Server initialization with error handling

### Error Handling

- Custom `AppError` class for operational errors
- Centralized error middleware
- Mongoose validation error handling
- Duplicate key error handling
- Port conflict detection

### Pagination & Filtering

```
GET /api/products?page=1&limit=10&search=laptop&categories=electronics,furniture
```

- **page** - Page number (default: 1)
- **limit** - Items per page (default: 10)
- **search** - Search by product name
- **categories** - Filter by comma-separated category IDs

## 🔐 Environment Variables

| Variable      | Description               | Default                                |
| ------------- | ------------------------- | -------------------------------------- |
| `PORT`        | Server port               | 5000                                   |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/inventory_db |

## 🐛 Troubleshooting

### Port Already in Use

If you see "Port 5000 is already in use":

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Issues

- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify network connectivity

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Created as a demonstration of MERN stack development with best practices.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Built with ❤️ using the MERN Stack**
