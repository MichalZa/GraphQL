import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { useContainer } from 'typeorm';
import config from './config';
import database from './database';

export default async (): Promise<express.Application> => {

    useContainer(Container);

    config();

    // const errorHandler = diContainer.get(ErrorHandler);

    process.on('unhandledRejection', (error: any) => {
        throw error;
    });
    // process.on('uncaughtException', (error: any) => {
    //     errorHandler.handle(error);
    // });

    await database();

    const app = express();

    const schema = await buildSchema({
        resolvers: [__dirname + '/../resolvers/*.js'],
        container: Container,
    });

    app.use(
        '/graphql',
        graphqlHTTP({
          schema,
          graphiql: true,
        }),
      );

    return app;
};
