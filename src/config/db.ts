import { ConfigService } from '@nestjs/config';
import { KnexModuleOptions } from 'nest-knexjs';

export const getDbConfig = async (
    configService: ConfigService,
): Promise<KnexModuleOptions> => {
    const dbUser = configService.get('DB_USER');
    const dbPassword = configService.get('DB_PASSWORD');
    const dbHost = configService.get('DB_PORT');
    const dbName = configService.get('DB_NAME');

    return {
        config: {
            client: 'mysql',
            version: '5.7',
            useNullAsDefault: true,
            connection: {
                host: dbHost,
                user: dbUser,
                password: dbPassword,
                database: dbName,
            },
        },
    };
};

export const dbConfig = {
    client: 'mysql',
    version: '5.7',
    useNullAsDefault: true,
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'nest',
    },
};
