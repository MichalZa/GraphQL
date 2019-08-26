import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import 'reflect-metadata';
import { useContainer as routeUseContainer, useExpressServer } from 'routing-controllers';
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

    app.use(bodyParser.json());

    const schema = await buildSchema({
        resolvers: [__dirname + '/../resolvers/*.js'],
        container: Container,
        authChecker: ({ root, args, context, info }, roles) => {
          const user: User = context.user;

          if (user && !roles.length) {
            return true;
        }
          if (user && roles.find(role => user.role.indexOf(role) !== -1)) {
            return true;
        }

          return false;
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

    routeUseContainer(Container);

    return useExpressServer(app, {
      routePrefix: 'api',
      controllers: [__dirname + '/../controller/*.js'],
    });
};
