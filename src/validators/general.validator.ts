import { Request, Response, NextFunction } from 'express';

const validId = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
        return res.status(400).send({ msg: 'You should provide a valid id' });
    }
    next();
};

export { validId };
