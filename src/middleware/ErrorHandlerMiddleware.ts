import { Request, Response } from 'express';
import Container from 'typedi';
import AppError from '../common/error/type/AppError';
import { ErrorHandler } from '../common/error/ErrorHandler';

export const errorHandlerMiddleware = (error: any, req: Request, res: Response, next: any) => {
    const errorHandler = Container.get(ErrorHandler);

    errorHandler.handle(error);

    const errorMessage: string = `${error.constructor.name}: ${error.message}`;

    if (error instanceof AppError && error.httpStatusCode) {
        res.status(error.httpStatusCode);
    }

    res.json({
        status: 'error',
        message: errorMessage,
    });
};
