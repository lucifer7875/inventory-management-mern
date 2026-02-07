import mongoose from 'mongoose';
import { env } from './env';
import seedCategories from '../seeders/category.seeder';

const connectMongoDB = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI);
        console.log('MongoDB connection has been established successfully.');
        await seedCategories();
    } catch (error) {
        console.error('Unable to connect to MongoDB:', error);
        process.exit(1);
    }
};

export default connectMongoDB;
