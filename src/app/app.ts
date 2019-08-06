import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';

export default async (): Promise<express.Application> => {

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
