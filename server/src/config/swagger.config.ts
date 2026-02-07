import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Inventory Management API',
            version: '1.0.0',
            description: 'A comprehensive API for managing inventory products and categories',
            contact: {
                name: 'API Support',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                Product: {
                    type: 'object',
                    required: ['name', 'quantity'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Product ID',
                            example: '507f1f77bcf86cd799439011',
                        },
                        name: {
                            type: 'string',
                            description: 'Product name',
                            example: 'Laptop',
                        },
                        description: {
                            type: 'string',
                            description: 'Product description',
                            example: 'High-performance laptop for professionals',
                        },
                        quantity: {
                            type: 'number',
                            description: 'Available quantity',
                            example: 50,
                        },
                        categories: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                            description: 'Array of category IDs',
                            example: ['507f1f77bcf86cd799439012'],
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update timestamp',
                        },
                    },
                },
                Category: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Category ID',
                            example: '507f1f77bcf86cd799439012',
                        },
                        name: {
                            type: 'string',
                            description: 'Category name',
                            example: 'Electronics',
                        },
                    },
                },
                ProductInput: {
                    type: 'object',
                    required: ['name', 'quantity'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Product name',
                            example: 'Laptop',
                        },
                        description: {
                            type: 'string',
                            description: 'Product description',
                            example: 'High-performance laptop for professionals',
                        },
                        quantity: {
                            type: 'number',
                            description: 'Available quantity',
                            example: 50,
                        },
                        categories: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                            description: 'Array of category IDs',
                            example: ['507f1f77bcf86cd799439012'],
                        },
                    },
                },
                PaginatedProducts: {
                    type: 'object',
                    properties: {
                        products: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Product',
                            },
                        },
                        total: {
                            type: 'number',
                            description: 'Total number of products',
                            example: 100,
                        },
                        page: {
                            type: 'number',
                            description: 'Current page number',
                            example: 1,
                        },
                        totalPages: {
                            type: 'number',
                            description: 'Total number of pages',
                            example: 10,
                        },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Error message',
                            example: 'An error occurred',
                        },
                    },
                },
            },
        },
    },
    apis: [
        './src/routes/*.ts',
        './src/routes/**/*.ts',
    ],
};

export const swaggerSpec = swaggerJsdoc(options);
