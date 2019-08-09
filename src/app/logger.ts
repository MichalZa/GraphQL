import * as nconf from 'nconf';
import { Container } from 'typedi';
import * as winston from 'winston';

export default () => {
    const config = nconf.get('winston');

    const logger: winston.Logger = winston.createLogger({
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({ filename: config.filename }),
        ],
        level: config.level,
      });

    Container.set('logger', logger);
};
