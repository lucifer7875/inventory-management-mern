import { body } from 'express-validator';

export const productValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Product name is required')
        .isLength({ min: 3 })
        .withMessage('Product name must be at least 3 characters long'),
    body('quantity')
        .isInt({ min: 0 })
        .withMessage('Quantity must be a non-negative integer'),
    body('categoryIds')
        .isArray({ min: 1 })
        .withMessage('At least one category must be selected'),
];
