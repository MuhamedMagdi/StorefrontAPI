import app from '../app';
import supertest from 'supertest';
import { USER } from '../models/user.model';
import { PRODUCT } from '../models/product.model';
import {
    createTestOrder,
    createTestProduct,
    createTestUser,
} from './utilities/test.utilities';
import { ORDER } from '../models/order.model';

describe('Testing the api', () => {
    const server = supertest(app);
    let testUser: { user: USER; token: string };

    beforeAll(async () => {
        testUser = await createTestUser();
    });

    describe('Testing auth routes', () => {
        it('should register a user', async () => {
            const res = await server.post(`/api/auth/register`).send({
                username: 'testUser',
                firstName: 'test',
                lastName: 'test',
                password: 'test',
            });
            expect(res.status).toEqual(200);
            expect(res.body.username).toEqual('testUser');
        });

        it('should return a token', async () => {
            const res = await server.post('/api/auth/sign-in').send({
                username: 'testUser',
                password: 'test',
            });
            expect(res.status).toEqual(200);
            expect(res.body.token).toBeDefined();
        });
    });

    describe('Testing user routes', () => {
        it('should return all users', async () => {
            const res = await server
                .get('/api/users')
                .set('Authorization', `Bearer ${testUser.token}`);
            expect(res.status).toEqual(200);
            expect(res.body.length).toBeGreaterThan(0);
        });

        it('should return user data', async () => {
            const res = await server
                .get(`/api/users/${testUser.user.id}`)
                .set('Authorization', `Bearer ${testUser.token}`);
            expect(res.status).toEqual(200);
            expect(res.body.username).toEqual(testUser.user.username);
        });

        it('should return user orders', async () => {
            const res = await server
                .get(`/api/users/${testUser.user.id}/orders`)
                .set('Authorization', `Bearer ${testUser.token}`);
            expect(res.status).toEqual(200);
        });

        it('should create a user', async () => {
            const res = await server
                .post(`/api/users`)
                .set('Authorization', `Bearer ${testUser.token}`)
                .send({
                    username: 'test',
                    firstName: 'test',
                    lastName: 'test',
                    password: 'test',
                });
            expect(res.status).toEqual(200);
            expect(res.body.username).toEqual('test');
        });
    });

    describe('Testing product routes', () => {
        let testProduct: PRODUCT;

        beforeAll(async () => {
            testProduct = await createTestProduct();
        });

        it('should return all products', async () => {
            const res = await server.get('/api/products');
            expect(res.status).toEqual(200);
            expect(res.body.length).toBeGreaterThan(0);
        });

        it('should return product data', async () => {
            const res = await server.get(`/api/products/${testProduct.id}`);
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual(testProduct.name);
        });

        it('should return top five products based on frequency', async () => {
            const res = await server.get(`/api/products/top-five`);
            expect(res.status).toEqual(200);
        });

        it('should create a product', async () => {
            const res = await server
                .post(`/api/products`)
                .set('Authorization', `Bearer ${testUser.token}`)
                .send({
                    name: 'test product',
                    price: 10,
                });
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual('test product');
        });
    });

    describe('Testing order routes', () => {
        let testOrder: ORDER;

        beforeAll(async () => {
            testOrder = await createTestOrder(
                testUser.user.id as unknown as number
            );
        });

        it('should return all orders', async () => {
            const res = await server
                .get('/api/orders')
                .set('Authorization', `Bearer ${testUser.token}`);
            expect(res.status).toEqual(200);
            expect(res.body.length).toBeGreaterThan(0);
        });

        it('should return product data', async () => {
            const res = await server
                .get(`/api/orders/${testOrder.id}`)
                .set('Authorization', `Bearer ${testUser.token}`);
            expect(res.status).toEqual(200);
            expect(res.body.user_id).toEqual(testOrder.user_id);
        });

        it('should create an order', async () => {
            const res = await server
                .post(`/api/orders`)
                .set('Authorization', `Bearer ${testUser.token}`)
                .send({
                    status: 'active',
                    user_id: testUser.user.id,
                });
            expect(res.status).toEqual(200);
            expect(Number(res.body.user_id)).toEqual(Number(testUser.user.id));
        });

        it('should add product to an order', async () => {
            const res = await server
                .post(`/api/orders/${testOrder.id}/products`)
                .set('Authorization', `Bearer ${testUser.token}`)
                .send({
                    quantity: 1,
                    product_id: 1,
                });
            expect(res.status).toEqual(200);
            expect(res.body.quantity).toEqual(1);
        });

        it('should return products on an order', async () => {
            const res = await server
                .get(`/api/orders/${testOrder.id}/products`)
                .set('Authorization', `Bearer ${testUser.token}`);
            expect(res.status).toEqual(200);
            expect(res.body.length).toBeGreaterThan(0);
        });
    });
});
