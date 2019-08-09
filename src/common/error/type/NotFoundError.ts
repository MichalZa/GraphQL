import AppError from './AppError';

export default class NotFoundError extends AppError {

    constructor(message: string) {
        super(message);
        Error.captureStackTrace(this);
        this.isOperational = true;
        this.httpStatusCode = 404;
    }
}
