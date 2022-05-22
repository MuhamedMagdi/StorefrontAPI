import { ORDER, ORDER_PRODUCT, PRODUCT_ORDER } from '../../models/order.model';
import {
    getAll,
    getById,
    createOrder,
    createProduct,
    getProductsByOrderId,
} from '../../models/order.model';

describe('Order model', () => {
    const testOrder: ORDER = {
        status: 'active',
        user_id: 1
    };

    let testOrderProduct: ORDER_PRODUCT = {
        product_id: 1,
        quantity: 10,
        order_id: 0
    };

    let testOrderId: number;

    it('should create an order', async () => {
        const order: ORDER = await createOrder(testOrder);
        testOrderId = order.id as number;
        testOrderProduct.order_id = testOrderId;
        expect(Number(order.user_id)).toEqual(testOrder.user_id);
    });

    it('should get an order with id', async () => {
        const order: ORDER = await getById(testOrderId);
        expect(Number(order.user_id)).toEqual(testOrder.user_id);
    });

    it('should get all orders', async () => {
        const orders: ORDER[] = await getAll();
        expect(orders.length).toBeGreaterThan(0);
    });

    it('should add a product to an order', async () => {
        const productOrder: ORDER_PRODUCT = await createProduct(testOrderProduct);
        expect(productOrder.quantity).toEqual(testOrderProduct.quantity);
    });

    it('should get products by order id', async () => {
        const product: PRODUCT_ORDER[] = await getProductsByOrderId(testOrderId, testOrder.user_id);
        expect(product.length).toBeGreaterThan(0);
    });
});
