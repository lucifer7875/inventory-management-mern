import dotenv from 'dotenv';
import connectMongoDB from '../config/mongodb';
import seedCategories from './category.seeder';
import seedProducts from './product.seeder';

dotenv.config();

const runSeeders = async () => {
    try {
        console.log('🌱 Starting database seeding...\n');

        // Connect to MongoDB
        await connectMongoDB();

        // Seed categories first
        console.log('📦 Seeding categories...');
        await seedCategories();

        // Seed products
        console.log('\n📦 Seeding products...');
        await seedProducts();

        console.log('\n✅ Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error during seeding:', error);
        process.exit(1);
    }
};

runSeeders();
