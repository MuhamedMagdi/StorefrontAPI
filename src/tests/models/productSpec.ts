import { PRODUCT } from '../../models/product.model';
import {
    getAll,
    getById,
    getTopFive,
    createProduct,
} from '../../models/product.model';

describe('Product model', () => {
    const testProduct: PRODUCT = {
        name: 'test',
        price: '10',
    };

    let testProductId: number;

    it('should create a product', async () => {
        const product: PRODUCT = await createProduct(testProduct);
        testProductId = product.id as number;
        expect(product.name).toEqual(testProduct.name);
    });

    it('should get a product with id', async () => {
        const product: PRODUCT = await getById(testProductId);
        expect(product.name).toEqual(testProduct.name);
    });

    it('should get all products', async () => {
        const products: PRODUCT[] = await getAll();
        expect(products.length).toBeGreaterThan(0);
    });

    it('should return top five products', async () => {
        const products: PRODUCT[] = await getTopFive();
        expect(products.length).toBeGreaterThan(0);
    });
});
