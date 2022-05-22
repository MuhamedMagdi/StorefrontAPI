import config from '../../config';
import bcrypt from 'bcrypt';

import { USER } from '../../models/user.model';
import { createUser, getByUserName } from '../../models/user.model';
import { signToken } from '../../utilities/token.utilities';
import { createProduct, PRODUCT } from '../../models/product.model';
import { createOrder, ORDER } from '../../models/order.model';

const createTestUser = async (): Promise<{ user: USER; token: string }> => {
    const testUser: USER = {
        username: 'MohamedMagdi',
        firstName: 'Mohamed',
        lastName: 'Magdi',
        password: 'password',
    };
    testUser.password = await bcrypt.hash(
        (testUser.password as string) + config.app.bcryptPaper,
        config.app.bcryptRounds
    );
    let user = await getByUserName(testUser.username);
    if (!user) {
        user = await createUser(testUser);
    }
    const token = await signToken(user);
    return {
        user,
        token,
    };
};

const createTestProduct = async (): Promise<PRODUCT> => {
    let testProduct: PRODUCT = {
        name: 'shirt',
        price: '10',
    };
    testProduct = await createProduct(testProduct);
    return testProduct;
};

const createTestOrder = async (user_id: number): Promise<ORDER> => {
    let testOrder: ORDER = {
        status: 'active',
        user_id,
    };
    testOrder = await createOrder(testOrder);
    return testOrder;
};

export { createTestUser, createTestProduct, createTestOrder };
