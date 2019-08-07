import { get } from 'nconf';
import { createConnection, Connection } from 'typeorm';

export default (): Promise<Connection> => {
    const config = get('database');

    return createConnection({
        type: config.type,
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        charset: config.charset,
        entities: [__dirname + '/../entity/*.js'],
    });
};
