import Product from '../models/Product';
import Category from '../models/Category';

const productNames = [
    'Laptop', 'Desktop Computer', 'Wireless Mouse', 'Mechanical Keyboard', 'USB-C Hub',
    'Monitor 27"', 'Webcam HD', 'Headphones', 'Smartphone', 'Tablet',
    'Office Chair', 'Standing Desk', 'Desk Lamp', 'Bookshelf', 'Filing Cabinet',
    'T-Shirt', 'Jeans', 'Sneakers', 'Jacket', 'Backpack',
    'Novel Book', 'Cookbook', 'Magazine', 'Notebook', 'Pen Set',
    'Rice 5kg', 'Pasta', 'Coffee Beans', 'Tea Box', 'Snack Pack',
    'Action Figure', 'Board Game', 'Puzzle', 'Building Blocks', 'Remote Car',
    'Car Battery', 'Motor Oil', 'Tire Set', 'Car Charger', 'Phone Holder',
    'Face Cream', 'Shampoo', 'Lipstick', 'Perfume', 'Nail Polish',
    'Printer', 'Scanner', 'Router', 'External SSD', 'Power Bank',
    'Sofa', 'Coffee Table', 'Dining Table', 'Bed Frame', 'Wardrobe',
    'Dress Shirt', 'Skirt', 'Sweater', 'Socks Pack', 'Belt',
    'Science Book', 'History Book', 'Dictionary', 'Comic Book', 'Art Book',
    'Cereal', 'Canned Soup', 'Juice Box', 'Chocolate Bar', 'Chips',
    'Doll', 'Toy Train', 'Stuffed Animal', 'Kite', 'Yo-Yo',
    'Windshield Wiper', 'Air Freshener', 'Floor Mat', 'Steering Cover', 'Jump Starter',
    'Body Lotion', 'Face Mask', 'Hair Dryer', 'Makeup Kit', 'Sunscreen',
    'Gaming Console', 'Controller', 'VR Headset', 'Smart Watch', 'Fitness Tracker',
    'Microwave', 'Blender', 'Toaster', 'Coffee Maker', 'Air Fryer',
    'Running Shoes', 'Yoga Mat', 'Dumbbells', 'Resistance Bands', 'Water Bottle',
    'Camera DSLR', 'Tripod', 'Memory Card', 'Camera Bag', 'Lens Cleaner'
];

const descriptions = [
    'High-quality product with excellent features',
    'Premium grade with long-lasting durability',
    'Best seller in its category',
    'Affordable and reliable choice',
    'Professional grade equipment',
    'Perfect for everyday use',
    'Innovative design and functionality',
    'Eco-friendly and sustainable',
    'Compact and portable solution',
    'Industry-leading performance'
];

const seedProducts = async () => {
    try {
        // Get all categories
        const categories = await Category.find();

        if (categories.length === 0) {
            console.log('No categories found. Please seed categories first.');
            return;
        }

        // Clear existing products (optional)
        await Product.deleteMany({});
        console.log('Cleared existing products');

        const products = [];

        for (let i = 0; i < 100; i++) {
            const randomCategories = categories
                .sort(() => 0.5 - Math.random())
                .slice(0, Math.floor(Math.random() * 3) + 1)
                .map(cat => cat._id);

            products.push({
                name: `${productNames[i % productNames.length]} ${i + 1}`,
                description: descriptions[Math.floor(Math.random() * descriptions.length)],
                quantity: Math.floor(Math.random() * 500) + 1,
                categories: randomCategories,
            });
        }

        // Insert all products
        await Product.insertMany(products);
        console.log(`✅ Successfully seeded ${products.length} products to MongoDB`);
    } catch (error) {
        console.error('❌ Error seeding products:', error);
    }
};

export default seedProducts;
