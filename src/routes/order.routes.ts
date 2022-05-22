import { Router } from 'express';
import {
    create,
    index,
    show,
    addProduct,
    getProducts,
} from '../controllers/order.controller';
import { verifyToken } from '../utilities/token.utilities';
import { validOrder, validProduct } from '../validators/order.validator';
import { validId } from '../validators/general.validator';

const orderRouter = Router();

orderRouter.get('/', verifyToken, index);
orderRouter.get('/:id', verifyToken, validId, show);
orderRouter.post('/', verifyToken, validOrder, create);
orderRouter.get('/:id/products', verifyToken, validId, getProducts);
orderRouter.post(
    '/:id/products',
    verifyToken,
    validId,
    validProduct,
    addProduct
);

export default orderRouter;
