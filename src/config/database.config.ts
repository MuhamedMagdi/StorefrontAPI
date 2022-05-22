import dotenv from 'dotenv';

dotenv.config();

const databaseConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT as unknown as number,
    database: process.env.PG_DATABASE,
};

if (process.env.ENV == 'test') {
    databaseConfig.database = process.env.PG_TEST_DATABASE;
}

export default databaseConfig;
