
export default class AppError extends Error {

    public isOperational: boolean;
    public httpStatusCode: number;

    constructor(message: string, isOperational: boolean = true) {
        super(message);
        Error.captureStackTrace(this);
        this.isOperational = isOperational;
    }
}
