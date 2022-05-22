import client from '../database/client';

export type ORDER = {
    id?: number;
    status: string;
    user_id: number;
};

export type ORDER_PRODUCT = {
    id?: number;
    quantity: number;
    order_id: number;
    product_id: number;
};

export type PRODUCT_ORDER = {
    order_id: number;
    status: string;
    user_id: number;
    product_id: number;
    product_name: string;
    product_price: number;
    quantity: number;
};

const getAll = async (): Promise<ORDER[]> => {
    const sql = `SELECT * FROM orders`;
    const result = await client.query(sql);
    return result.rows;
};

const getById = async (id: number): Promise<ORDER> => {
    const sql = `SELECT * FROM orders WHERE id = $1`;
    const result = await client.query(sql, [id]);
    return result.rows[0];
};

const createOrder = async (order: ORDER): Promise<ORDER> => {
    const sql = `INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *`;
    const result = await client.query(sql, [order.status, order.user_id]);
    return result.rows[0];
};

const createProduct = async (
    order_product: ORDER_PRODUCT
): Promise<ORDER_PRODUCT> => {
    const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *`;
    const result = await client.query(sql, [
        order_product.quantity,
        order_product.order_id,
        order_product.product_id,
    ]);
    return result.rows[0];
};

const getProductsByOrderId = async (
    id: number,
    user_id: number
): Promise<PRODUCT_ORDER[]> => {
    const sql = `SELECT order_id, status, product_id, name AS product_name, price AS product_price, quantity FROM orders JOIN order_products ON orders.id=order_products.order_id JOIN products ON order_products.product_id=products.id WHERE order_id=$1 AND user_id=$2`;
    const result = await client.query(sql, [id, user_id]);
    return result.rows;
};

export { getAll, getById, createOrder, createProduct, getProductsByOrderId };
