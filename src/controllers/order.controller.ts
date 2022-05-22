import { Request, Response } from 'express';
import {
    ORDER,
    ORDER_PRODUCT,
    getAll,
    getById,
    createOrder,
    createProduct,
    getProductsByOrderId,
    PRODUCT_ORDER,
} from '../models/order.model';

const index = async (req: Request, res: Response) => {
    try {
        const orders: ORDER[] = await getAll();
        return res.send(orders);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order: ORDER = await getById(Number(id));
        if (!order) {
            return res.status(404).send({ msg: 'Order not found' });
        }
        return res.send(order);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;
        const user_id = res.locals.user.id;
        const order: ORDER = await createOrder({
            status,
            user_id,
        });
        if (!order) {
            return res.status(404).send({ msg: 'Order not found' });
        }
        return res.send(order);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const getProducts = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number;
        const user_id = res.locals.user.id;
        const orderProduct: PRODUCT_ORDER[] = await getProductsByOrderId(
            id,
            user_id
        );
        if (!orderProduct) {
            return res.status(400).send({
                msg: `Can't find an order with id = ${id}`,
            });
        }
        return res.send(orderProduct);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const addProduct = async (req: Request, res: Response) => {
    try {
        const order_id = req.params.id as unknown as number;
        const { quantity, product_id } = req.body;
        const user_id = res.locals.user.id;
        const order: ORDER = await getById(order_id);
        if (order.user_id != user_id) {
            return res.status(401).send({
                msg: "You can't add products to orders that you don't own",
            });
        }
        const orderProduct: ORDER_PRODUCT = await createProduct({
            quantity,
            order_id,
            product_id,
        });
        if (!orderProduct) {
            return res.status(400).send({
                msg: `Can't add product with id = ${product_id} to the order with id = ${order_id}`,
            });
        }
        return res.send(orderProduct);
    } catch (error) {
        return res.status(500).send(error);
    }
};

export { index, show, create, addProduct, getProducts };
