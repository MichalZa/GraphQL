import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { useContainer } from 'typeorm';
import { ErrorHandler } from '../common/error/ErrorHandler';
import { User } from '../entity/User';
import { authMiddleware } from '../middleware/AuthMiddleware';
import { errorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware';
import config from './config';
import database from './database';
import logger from './logger';

export default async (): Promise<express.Application> => {

    useContainer(Container);

    config();

    logger();

    const errorHandler = Container.get(ErrorHandler);

    process.on('unhandledRejection', (error: any) => {
      throw error;
    });
    process.on('uncaughtException', (error: any) => {
      errorHandler.handle(error);
    });

    await database().catch(err => errorHandler.handle(err, false));

    const app = express();

    const schema = await buildSchema({
        resolvers: [__dirname + '/../resolvers/*.js'],
        container: Container,
        authChecker: ({ root, args, context, info }, roles) => {
          const user: User = context.auth.user;

          if (!user) {
            return false;
          }

          return true;
        },
    });

    app.use(
        '/graphql',
        authMiddleware,
        graphqlHTTP({
          schema,
          graphiql: true,
        }),
        errorHandlerMiddleware,
      );

    return app;
};
