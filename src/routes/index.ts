import { Router } from 'express';
import userRouter from './user.routes';
import authRouter from './auth.routes';
import productRouter from './product.routes';
import orderRouter from './order.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/auth', authRouter);
routes.use('/products', productRouter);
routes.use('/orders', orderRouter);

export default routes;
