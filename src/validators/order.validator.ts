import { Request, Response, NextFunction } from 'express';

const validOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, status } = req.body;
    if (!status) {
        return res.status(400).send({ msg: 'You should provide a status' });
    }
    if (!user_id) {
        return res.status(400).send({ msg: 'You should provide a user id' });
    }
    next();
};

const validProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { quantity, product_id } = req.body;
    if (!product_id) {
        return res.status(400).send({ msg: 'You should provide a product id' });
    }
    if (!quantity) {
        return res.status(400).send({ msg: 'You should provide a quantity' });
    }
    next();
};

export { validOrder, validProduct };
