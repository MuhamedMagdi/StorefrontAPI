import { Router } from 'express';
import { register, signIn } from '../controllers/auth.controller';
import { validUser } from '../validators/user.validator';

const authRouter = Router();

authRouter.post('/register', validUser, register);
authRouter.post('/sign-in', signIn);

export default authRouter;
