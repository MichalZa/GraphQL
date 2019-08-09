import { Inject, Service } from 'typedi';
import { Logger } from 'winston';
import AppError from './type/AppError';

@Service()
export class ErrorHandler {

    @Inject('logger')
    private readonly logger: Logger;

    public handle(error: any, isOperational: boolean = true): void {
        this.logger.error(JSON.stringify(error));
        if (this.verifyIfNeedToCrash(error, isOperational)) {
            // mail service should send email to tech. support here with problem desc
            this.crash();
        }
    }

    private verifyIfNeedToCrash(error: any, isOperational: boolean): boolean {
        return !isOperational || (error instanceof AppError && !error.isOperational);
    }

    private crash(): void {
        process.exit(1);
    }
}
