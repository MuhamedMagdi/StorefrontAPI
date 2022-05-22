import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getById, USER } from '../models/user.model';
import config from '../config';

const signToken = async (user: USER): Promise<string> => {
    delete user.password;
    return jwt.sign(user, config.app.jwtSecret, { expiresIn: '1h' });
};

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({ msg: 'You should provide a token' });
        }
        token = token.split(' ')[1];
        const decodeToken = await jwt.verify(token, config.app.jwtSecret);
        const { id } = decodeToken as { id: number };
        const user: USER = await getById(id);
        if (!user) {
            return res.status(404).send({ msg: 'User not found' });
        }
        delete user.password;
        res.locals.user = user;
        next();
    } catch {
        return res.status(401).send({ msg: 'Not a Valid token' });
    }
};

export { signToken, verifyToken };
