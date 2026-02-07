import { Router } from 'express';
import productController from '../controllers/product.controller';
import { productValidation } from '../validations/product.validation';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a paginated list of products with optional search, category filters, and sorting
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter products by name or description
 *       - in: query
 *         name: categories
 *         schema:
 *           type: string
 *         description: Comma-separated list of category IDs to filter products
 *         example: "507f1f77bcf86cd799439012,507f1f77bcf86cd799439013"
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, quantity, createdAt]
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order (ascending or descending)
 *     responses:
 *       200:
 *         description: Successful response with paginated products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedProducts'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Add a new product to the inventory
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', productValidation, validate, productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Remove a product from the inventory by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product deleted successfully"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', productController.deleteProduct);

/**
 * @swagger
 * /api/products/categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all available product categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Successful response with categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/categories', productController.getCategories);

export default router;
