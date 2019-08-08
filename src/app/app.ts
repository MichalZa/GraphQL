import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { useContainer } from 'typeorm';
import { authMiddleware } from '../middleware/AuthMiddleware';
import { errorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware';
import config from './config';
import database from './database';

export default async (): Promise<express.Application> => {

    useContainer(Container);

    config();

    // const errorHandler = diContainer.get(ErrorHandler);

    process.on('unhandledRejection', (error: any) => {
      throw error;
    });
    process.on('uncaughtException', (error: any) => {
      console.log('i have that');
    });

    await database();

    const app = express();

    const schema = await buildSchema({
        resolvers: [__dirname + '/../resolvers/*.js'],
        container: Container,
        authChecker: ({ root, args, context, info }, roles) => {
          const user = context.currentUser;

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
