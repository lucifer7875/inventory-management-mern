import { Router } from 'express';
import productController from '../controllers/product.controller';
import { productValidation } from '../validations/product.validation';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

router.get('/', productController.getAllProducts);
router.post('/', productValidation, validate, productController.createProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/categories', productController.getCategories);

export default router;
