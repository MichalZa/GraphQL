import AppError from './AppError';

export default class AuthError extends AppError {

    constructor(message: string) {
        super(message);
        Error.captureStackTrace(this);
        this.isOperational = true;
    }
}
