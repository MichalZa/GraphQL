import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import 'reflect-metadata';
import { useExpressServer } from 'routing-controllers';
import { buildSchema } from 'type-graphql';

export default async (): Promise<express.Application> => {

    const app = express();

    const schema = await buildSchema({
        resolvers: [__dirname + '/../resolvers/*.js'],
    });

    app.use(
        '/graphql',
        graphqlHTTP({
          schema,
          graphiql: true,
        }),
      );

    return useExpressServer(app, {
        routePrefix: '/api/v1',
        controllers: [__dirname + '/../controllers/*.js'],
    });
};
