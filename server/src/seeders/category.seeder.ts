import Category from '../models/Category';

const seedCategories = async () => {
    const categories = [
        { name: 'Electronics' },
        { name: 'Furniture' },
        { name: 'Clothing' },
        { name: 'Books' },
        { name: 'Groceries' },
        { name: 'Toys' },
        { name: 'Automotive' },
        { name: 'Beauty' },
    ];

    try {
        for (const category of categories) {
            await Category.findOneAndUpdate(
                { name: category.name },
                { name: category.name },
                { upsert: true, new: true }
            );
        }
        console.log('Categories seeded to MongoDB successfully');
    } catch (error) {
        console.error('Error seeding categories:', error);
    }
};

export default seedCategories;
