import { Router } from 'express';
import {
    create,
    index,
    show,
    topFive,
} from '../controllers/product.controller';
import { verifyToken } from '../utilities/token.utilities';
import { validProduct } from '../validators/product.validator';
import { validId } from '../validators/general.validator';

const productRouter = Router();

productRouter.get('/', index);
productRouter.get('/top-five', topFive);
productRouter.get('/:id', validId, show);
productRouter.post('/', verifyToken, validProduct, create);

export default productRouter;
