import { USER, USER_ORDERS } from '../../models/user.model';
import {
    getAll,
    getById,
    getByUserName,
    createUser,
    getUserOrders,
} from '../../models/user.model';
import { createTestOrder } from '../utilities/test.utilities';

describe('User model', () => {
    const testUser: USER = {
        username: 'fwd',
        firstName: 'fwd',
        lastName: 'fwd',
        password: 'fwd',
    };

    let testUserId: number;

    it('should create a user', async () => {
        const user = await createUser(testUser);
        testUserId = user.id as number;
        expect(user.username).toEqual(testUser.username);
    });

    it('should get a user with id', async () => {
        const user = await getById(testUserId);
        expect(user.username).toEqual(testUser.username);
    });

    it('should return a user with username', async () => {
        const user = await getByUserName(testUser.username);
        expect(user.username).toEqual(testUser.username);
    });

    it('should get all users', async () => {
        const users: USER[] = await getAll();
        expect(users.length).toBeGreaterThan(0);
    });

    it('should return user orders', async () => {
        await createTestOrder(testUserId);
        const userOrders: USER_ORDERS[] = await getUserOrders(testUserId);
        expect(userOrders.length).toBeGreaterThan(0);
    });
});
