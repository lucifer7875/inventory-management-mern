import { Request, Response, NextFunction } from 'express';
import productService from '../services/product.service';

class ProductController {
    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = (req.query.search as string) || '';
            const categories = req.query.categories
                ? (req.query.categories as string).split(',')
                : [];

            const result = await productService.getAllProducts(
                page,
                limit,
                search,
                categories
            );
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const result = await productService.deleteProduct(id);
            if (!result) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

    async getCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await productService.getCategories();
            res.json(categories);
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController();
