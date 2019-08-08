import { Request, Response } from 'express';

export const errorHandlerMiddleware = (error: any, req: Request, res: Response, next: any) => {

    // use error handler here to distinguish if exit is required

    res.json({
        status: 'error',
        message: error.message,
    });
};
