import { Request, Response } from 'express';
import Container from 'typedi';
import { ErrorHandler } from '../common/error/ErrorHandler';

export const errorHandlerMiddleware = (error: any, req: Request, res: Response, next: any) => {

    const errorHandler = Container.get(ErrorHandler);

    errorHandler.handle(error);

    const errorMessage: string = `${error.constructor.name}: ${error.message}`;

    res.json({
        status: 'error',
        message: errorMessage,
    });
};
