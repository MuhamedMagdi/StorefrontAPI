import { Request, Response, NextFunction } from 'express';

const validProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, price } = req.body;
    if (!name) {
        return res.status(400).send({ msg: 'You should provide a name' });
    }
    if (!price) {
        return res.status(400).send({ msg: 'You should provide a price' });
    }
    next();
};

export { validProduct };
