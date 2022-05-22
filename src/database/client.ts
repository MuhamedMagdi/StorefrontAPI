import { Pool } from 'pg';
import config from '../config';

const client = new Pool({
    database: config.database.database,
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
});

export default client;
