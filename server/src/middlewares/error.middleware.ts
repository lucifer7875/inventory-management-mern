import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
            message: 'Product name must be unique',
            errors: err.errors.map((e: any) => e.message),
        });
    }

    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
};
