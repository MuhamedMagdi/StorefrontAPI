import { Request, Response, NextFunction } from 'express';
import { getByUserName, USER } from '../models/user.model';

const validUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userName, firstName, lastName, password } = req.body;
    const user: USER = await getByUserName(userName);
    if (user) {
        return res
            .status(400)
            .send({ msg: 'User with this userName already exists' });
    }
    if (!firstName) {
        return res.status(400).send({ msg: 'You should provide first name' });
    }
    if (!lastName) {
        return res.status(400).send({ msg: 'You should provide last name' });
    }
    if (!password) {
        return res.status(400).send({ msg: 'You should provide password' });
    }
    next();
};

export { validUser };
