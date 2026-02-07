import express from 'express';
import cors from 'cors';
import connectMongoDB from './config/mongodb';
import { env } from './config/env';
import productRoutes from './routes/product.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

// Shared route for categories
app.get('/api/categories', (req, res, next) => {
    next();
});

app.use(errorHandler);

const startServer = async () => {
    try {
        // --- Database Setup ---
        await connectMongoDB();
        // ----------------------

        app.listen(env.PORT, () => {
            console.log(`Server is running on port ${env.PORT}`);
        });
    } catch (error) {
        console.error('Server failed to start:', error);
        process.exit(1);
    }
};

startServer();
