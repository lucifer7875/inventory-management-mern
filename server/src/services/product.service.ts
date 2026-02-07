import { PaginationResult } from '../utils/pagination';
import Product from '../models/Product';
import Category from '../models/Category';

class ProductService {
    async getAllProducts(
        page: number,
        limit: number,
        search: string,
        categoryIds: string[],
        sortBy: string = 'createdAt',
        sortOrder: string = 'desc'
    ) {
        const query: any = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        if (categoryIds.length > 0) {
            query.categories = { $in: categoryIds };
        }

        // Validate sortBy field (whitelist)
        const allowedSortFields = ['name', 'quantity', 'createdAt'];
        const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';

        // Build sort object
        const sortDirection = sortOrder === 'asc' ? 1 : -1;
        const sortObject: any = { [validSortBy]: sortDirection };

        const totalItems = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalItems / limit);
        const skip = (page - 1) * limit;

        const products = await Product.find(query)
            .populate('categories', 'id name') // Mongoose uses _id, but we'll map if needed
            .sort(sortObject)
            .skip(skip)
            .limit(limit);

        // Map _id to id for client compatibility
        const mappedProducts = products.map(p => {
            const obj: any = p.toObject();
            return {
                ...obj,
                id: (p._id as any).toString(),
                categories: (obj.categories as any[]).map((c: any) => ({
                    id: (c._id || c).toString(),
                    name: c.name || 'Unknown'
                }))
            };
        });

        return {
            data: mappedProducts,
            pagination: {
                totalItems,
                totalPages,
                currentPage: page,
                limit,
            },
        };
    }

    async createProduct(data: {
        name: string;
        description: string;
        quantity: number;
        categoryIds: string[];
    }) {
        const product = await Product.create({
            name: data.name,
            description: data.description,
            quantity: data.quantity,
            categories: data.categoryIds,
        });

        return this.getProductById((product._id as any).toString());
    }

    async getProductById(id: string) {
        const product = await Product.findById(id).populate('categories', 'id name');
        if (!product) return null;

        const productObj: any = product.toObject();
        return {
            ...productObj,
            id: (product._id as any).toString(),
            categories: (productObj.categories as any[]).map((c: any) => ({
                id: (c._id || c).toString(),
                name: c.name || 'Unknown'
            }))
        };
    }

    async deleteProduct(id: string) {
        const result = await Product.findByIdAndDelete(id);
        return !!result;
    }

    async getCategories() {
        const categories = await Category.find();
        return categories.map(c => ({
            id: (c._id as any).toString(),
            name: c.name
        }));
    }
}

export default new ProductService();
