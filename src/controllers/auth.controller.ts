import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import config from '../config';
import { USER, getByUserName, createUser } from '../models/user.model';
import { signToken } from '../utilities/token.utilities';

const register = async (req: Request, res: Response) => {
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
        delete user.password;
        return res.send(user);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const signIn = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user: USER = await getByUserName(username);
        if (user) {
            const equal = await bcrypt.compare(
                password + config.app.bcryptPaper,
                user.password as string
            );
            if (equal) {
                const token = await signToken(user);
                return res.send({ token: token });
            }
        }
        return res
            .status(401)
            .send({ msg: 'Username of password might not be correct' });
    } catch (error) {
        return res.status(500).send(error);
    }
};

export { register, signIn };
