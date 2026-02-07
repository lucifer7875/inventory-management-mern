import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import connectMongoDB from './config/mongodb';
import { env } from './config/env';
import productRoutes from './routes/product.routes';
import { errorHandler } from './middlewares/error.middleware';
import { swaggerSpec } from './config/swagger.config';

dotenv.config();

class App {
    private readonly app: Application = express();
    private readonly port: number | string;

    constructor() {
        this.port = env.PORT;
        this.configureServer();
        this.setupRoutes();
    }

    private configureServer(): void {
        // CORS configuration
        this.app.use(cors());

        // Body parsers
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // Trust proxy for production
        this.app.set('trust proxy', 1);
    }

    private setupRoutes(): void {
        // Root endpoint
        this.app.get('/', (req, res) => {
            res.json({
                message: 'Inventory Management API',
                docs: '/api-docs',
                version: '1.0.0',
            });
        });

        // Swagger Documentation
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
            explorer: true,
            customCss: '.swagger-ui .topbar { display: none }',
            customSiteTitle: 'Inventory Management API Docs',
        }));

        this.app.get('/api-docs.json', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(swaggerSpec);
        });

        // API Routes
        this.app.use('/api/products', productRoutes);

        // Shared route for categories
        this.app.get('/api/categories', (req, res, next) => {
            next();
        });

        // Centralized error handler (MUST be after all routes)
        this.app.use(errorHandler);
    }

    private async testDatabaseConnection(): Promise<void> {
        try {
            await connectMongoDB();
            console.log('✅ Connected to MongoDB successfully.');
        } catch (error) {
            console.error('❌ Unable to connect to MongoDB:', error);
            process.exit(1);
        }
    }

    public async start(): Promise<void> {
        try {
            // Test database connection
            await this.testDatabaseConnection();

            // Start server
            const server = this.app.listen(this.port, () => {
                console.log(`🚀 Server is running on port ${this.port}`);
                console.log(`📚 Swagger docs available at http://localhost:${this.port}/api-docs`);
            });

            // Handle port already in use error
            server.on('error', (error: NodeJS.ErrnoException) => {
                if (error.code === 'EADDRINUSE') {
                    console.error(`\n❌ Error: Port ${this.port} is already in use!`);
                    console.error(`Please stop the other server or use a different port.\n`);
                    process.exit(1);
                } else {
                    console.error('Server error:', error);
                    process.exit(1);
                }
            });
        } catch (error) {
            console.error('Server failed to start:', error);
            process.exit(1);
        }
    }
}

// Start the application
(async () => {
    const server = new App();
    await server.start();
})();
