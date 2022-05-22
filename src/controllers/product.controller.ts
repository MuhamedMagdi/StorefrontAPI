import { Request, Response } from 'express';
import {
    PRODUCT,
    getAll,
    getById,
    createProduct,
    getTopFive,
    increaseFrequency,
} from '../models/product.model';

const index = async (req: Request, res: Response) => {
    try {
        const products: PRODUCT[] = await getAll();
        return res.send(products);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product: PRODUCT = await getById(Number(id));
        if (!product) {
            return res.status(404).send({ msg: 'Product not found' });
        }
        const valid = await increaseFrequency(Number(product.id));
        if (!valid) {
            return res
                .status(500)
                .send({ msg: "can't increase the frequency of the product" });
        }
        return res.send(product);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const { name, price } = req.body;
        const product: PRODUCT = await createProduct({
            name,
            price,
        });
        if (!product) {
            return res.status(404).send({ msg: 'Product not found' });
        }
        return res.send(product);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const topFive = async (req: Request, res: Response) => {
    try {
        const topFiveProducts: PRODUCT[] = await getTopFive();
        return res.send(topFiveProducts);
    } catch (error) {
        return res.status(500).send(error);
    }
};

export { index, show, create, topFive };
