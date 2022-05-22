import client from '../database/client';

export type PRODUCT = {
    id?: number;
    name: string;
    price: string;
    frequency?: number;
};

const getAll = async (): Promise<PRODUCT[]> => {
    const sql = `SELECT * FROM products`;
    const result = await client.query(sql);
    return result.rows;
};

const getById = async (id: number): Promise<PRODUCT> => {
    const sql = `SELECT * FROM products WHERE id = $1`;
    const result = await client.query(sql, [id]);
    return result.rows[0];
};

const getTopFive = async (): Promise<PRODUCT[]> => {
    const sql = `SELECT * FROM products ORDER By frequency DESC LIMIT 5`;
    const result = await client.query(sql);
    return result.rows;
};

const createProduct = async (product: PRODUCT): Promise<PRODUCT> => {
    const sql = `INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *`;
    const result = await client.query(sql, [product.name, product.price]);
    return result.rows[0];
};

const increaseFrequency = async (id: number): Promise<boolean> => {
    const sql = `UPDATE products SET frequency = frequency + 1 WHERE id = $1`;
    const result = await client.query(sql, [id]);
    return result.rowCount > 0;
};

export { getAll, getById, getTopFive, createProduct, increaseFrequency };
