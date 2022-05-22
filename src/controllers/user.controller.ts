import { Request, Response } from 'express';
import {
    USER,
    getAll,
    getById,
    createUser,
    getUserOrders,
    USER_ORDERS,
} from '../models/user.model';
import bcrypt from 'bcrypt';
import config from '../config';

const index = async (req: Request, res: Response) => {
    try {
        const users: USER[] = await getAll();
        return res.send(users);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user: USER = await getById(Number(id));
        if (!user) {
            return res.status(404).send({ msg: 'User not found' });
        }
        return res.send(user);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const { username, firstName, lastName } = req.body;
        let { password } = req.body;
        password = await bcrypt.hash(
            password + config.app.bcryptPaper,
            config.app.bcryptRounds
        );
        const user: USER = await createUser({
            username,
            firstName,
            lastName,
            password,
        });
        if (!user) {
            return res.status(404).send({ msg: 'User not found' });
        }
        delete user.password;
        return res.send(user);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const userOrders = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userOrders: USER_ORDERS[] = await getUserOrders(Number(id));
        if (!userOrders) {
            return res.status(404).send({ msg: 'User not found' });
        }
        return res.send(userOrders);
    } catch (error) {
        return res.status(500).send(error);
    }
};

export { index, show, create, userOrders };
