import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { logger } from './logger';

export async function startConnection(entities: any[]) {

    const config: ConnectionOptions = {
        type: "mssql",
        host: process.env.SQL_CONNECTION_HOST,
        database: process.env.SQL_CONNECTION_DATABASE,
        port: Number(process.env.SQL_CONNECTION_PORT),
        username: process.env.SQL_CONNECTION_USERNAME,
        password: process.env.SQL_CONNECTION_PASSWORD,
        options: {
            encrypt: true,
        },
        pool: {
            max: 100
        },
        synchronize: false,
        entities: entities
    };

    let connection: Connection;
    try {
        connection = await createConnection(config);
    }
    catch (err) {
        logger.error(`TypeORM connection error: ${err}`)
    }

    logger.info("TypeORM connected");
    process.on("exit", () => {
        connection.close();
    })
}


