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
├── client/                         # React frontend
│   ├── src/
│   │   ├── app/                    # Redux store
│   │   ├── features/               # Feature modules
│   │   ├── pages/                  # Page components
│   │   ├── services/               # API services
│   │   └── App.tsx
│   ├── .env
│   └── package.json
├── server/                         # Express backend
│   ├── src/
│   │   ├── config/                 # Configuration files
│   │   ├── controllers/            # Request handlers
│   │   ├── middlewares/            # Custom middleware
│   │   ├── models/                 # Mongoose models
│   │   ├── routes/                 # API routes
│   │   ├── seeders/                # Database seeders
│   │   ├── services/               # Business logic
│   │   ├── utils/                  # Utility functions
│   │   ├── validations/            # Input validation
│   │   └── index.ts                # App entry point
│   ├── .env
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend (Client)

- **React 19** - UI library with latest features
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **TanStack Table** - Powerful table component
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend (Server)

- **Node.js** - Runtime environment
- **Express.js 5.x** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Swagger UI Express** - API documentation
- **Express Validator** - Request validation
- **dotenv** - Environment variables
- **CORS** - Cross-origin resource sharing

---

## 📦 Installation & Setup

### Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd inventory-management-mern
   ```

2. **Setup Server**

   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the `server` directory:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/inventory_db
   ```

3. **Setup Client**

   ```bash
   cd ../client
   npm install
   ```

   Create a `.env` file in the `client` directory:

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Seed the database** (Optional)

   ```bash
   cd ../server
   npm run seed
   ```

   This will populate the database with 100 sample products across 8 categories.

5. **Start the application**

   Open two terminal windows:

   **Terminal 1 - Start Server:**

   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Start Client:**

   ```bash
   cd client
   npm run dev
   ```

   - **Server:** http://localhost:5000
   - **Client:** http://localhost:5173
   - **API Docs:** http://localhost:5000/api-docs

---

## 🖥️ Client Documentation

### Project Structure

```
client/
├── src/
│   ├── app/                    # Redux store configuration
│   ├── features/               # Feature-based modules
│   │   └── products/
│   │       ├── components/     # Product-specific components
│   │       ├── hooks/          # Custom React hooks
│   │       └── types/          # TypeScript interfaces
│   ├── pages/                  # Page components
│   ├── services/               # API service layer
│   ├── App.tsx                 # Root component
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles
├── .env                        # Environment variables
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── package.json
```

### Available Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start development server (port 5173) |
| `npm run build`   | Build for production                 |
| `npm run lint`    | Check code for linting errors        |
| `npm run preview` | Preview production build locally     |

### Environment Variables

| Variable            | Description          | Default                   |
| ------------------- | -------------------- | ------------------------- |
| `VITE_API_BASE_URL` | Backend API base URL | http://localhost:5000/api |

### Key Features

- ✅ **React 19** with latest features and optimizations
- ✅ **Redux Toolkit** for centralized state management
- ✅ **TanStack Table** for advanced data tables with sorting, filtering, and pagination
- ✅ **Tailwind CSS 4** for modern, responsive UI design
- ✅ **TypeScript** for type-safe development
- ✅ **Vite** for lightning-fast HMR and builds
- ✅ **Feature-based architecture** for scalable code organization

### Development Workflow

1. **Start the dev server:**

   ```bash
   npm run dev
   ```

2. **Access the application:**
   - Open http://localhost:5173 in your browser
   - The app will hot-reload on file changes

3. **Build for production:**
   ```bash
   npm run build
   ```
   Production files will be in the `dist/` directory

---

## 🔧 Server Documentation

### Project Structure

```
server/
├── src/
│   ├── config/
│   │   ├── env.ts              # Environment configuration
│   │   ├── mongodb.ts          # Database connection
│   │   └── swagger.config.ts   # Swagger/OpenAPI spec
│   ├── controllers/
│   │   └── product.controller.ts
│   ├── middlewares/
│   │   ├── error.middleware.ts
│   │   └── validate.middleware.ts
│   ├── models/
│   │   ├── Product.ts
│   │   └── Category.ts
│   ├── routes/
│   │   └── product.routes.ts
│   ├── seeders/
│   │   ├── category.seeder.ts
│   │   ├── product.seeder.ts
│   │   └── index.ts
│   ├── services/
│   │   └── product.service.ts
│   ├── utils/
│   │   └── AppError.ts
│   ├── validations/
│   │   └── product.validation.ts
│   └── index.ts                # App class entry point
├── .env
├── package.json
└── tsconfig.json
```

### Available Scripts

| Script             | Description                              |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Start development server with hot reload |
| `npm run seed`     | Seed database with sample data           |
| `npm run lint`     | Check code for linting errors            |
| `npm run lint:fix` | Auto-fix linting errors                  |
| `npm start`        | Start production server                  |

### Environment Variables

| Variable      | Description               | Default                                |
| ------------- | ------------------------- | -------------------------------------- |
| `PORT`        | Server port               | 5000                                   |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/inventory_db |

### Development Workflow

1. **Start the dev server:**

   ```bash
   npm run dev
   ```

2. **Access the API:**
   - API Base: http://localhost:5000/api
   - Swagger Docs: http://localhost:5000/api-docs

3. **Seed the database:**
   ```bash
   npm run seed
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
