import client from '../database/client';

export type USER = {
    id?: number;
    username: string;
    firstName: string;
    lastName: string;
    password?: string;
};

export type USER_ORDERS = {
    user_id: number;
    userName: string;
    firstName: string;
    lastName: string;
    order_id: number;
    status: string;
};

const getAll = async (): Promise<USER[]> => {
    const sql = `SELECT id, userName, firstName, lastName FROM users`;
    const result = await client.query(sql);
    return result.rows;
};

const getById = async (id: number): Promise<USER> => {
    const sql = `SELECT id, userName, firstName, lastName FROM users WHERE id = $1`;
    const result = await client.query(sql, [id]);
    return result.rows[0];
};

const getByUserName = async (userName: string): Promise<USER> => {
    const sql = `SELECT * FROM users WHERE userName = $1`;
    const result = await client.query(sql, [userName]);
    return result.rows[0];
};

const createUser = async (user: USER): Promise<USER> => {
    const sql = `INSERT INTO users (userName, firstName, lastName, password) VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await client.query(sql, [
        user.username,
        user.firstName,
        user.lastName,
        user.password,
    ]);
    return result.rows[0];
};

const getUserOrders = async (id: number): Promise<USER_ORDERS[]> => {
    const sql =
        'SELECT orders.user_id, userName, firstName, lastName, orders.id AS order_id, status FROM users JOIN orders ON users.id = orders.user_id WHERE users.id = $1';
    const result = await client.query(sql, [id]);
    return result.rows;
};

export { getAll, getById, getByUserName, createUser, getUserOrders };
