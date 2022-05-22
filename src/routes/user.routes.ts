import { Router } from 'express';
import {
    index,
    show,
    create,
    userOrders,
} from '../controllers/user.controller';
import { verifyToken } from '../utilities/token.utilities';
import { validUser } from '../validators/user.validator';
import { validId } from '../validators/general.validator';

const userRouter = Router();

userRouter.get('/', verifyToken, index);
userRouter.get('/:id', verifyToken, validId, show);
userRouter.get('/:id/orders', verifyToken, validId, userOrders);
userRouter.post('/', verifyToken, validUser, create);

export default userRouter;
