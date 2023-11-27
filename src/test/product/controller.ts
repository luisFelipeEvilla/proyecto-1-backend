import {it} from 'node:test';
const supertest = require('supertest');
const app = require('../../routes/product.ts');
const product = require('../../models/product.ts');

describe('Product controller test', () => {
    it('Should return all products', async () => {
        const productTest = new product({
            name: 'test',
            price: 1,
            description: 'test',
            restaurant: '1',
            category: '1'
        })
        await productTest.save();
        const res = await supertest(app).get('/product');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('products');
    }
    )
    it('Should return product by id', async () => {
        const productTest = new product({
            name: 'test',
            price: 1,
            description: 'test',
            restaurant: '1',
            category: '1'
        })
        await productTest.save();
        const res = await supertest(app).get('/product/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('product');
    }
    )
    it('Should return product by id', async () => {
        const productTest = new product({
            name: 'test',
            price: 1,
            description: 'test',
            restaurant: '1',
            category: '1'
        })
        await productTest.save();
        const res = await supertest(app).get('/product/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('product');
    }
    )
    it('Should return product by name', async () => {
        const productTest = new product({
            name: 'test',
            price: 1,
            description: 'test',
            restaurant: '1',
            category: '1'
        })
        await productTest.save();
        const res = await supertest(app).get('/product/name/test');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('product');
    }
    )
    it('Should create product', async () => {
        const res = await supertest(app).post('/product')
            .send({
                name: 'test',
                price: 1,
                description: 'test',
                restaurant: '1',
                category: '1'
            });
        expect(res.statusCode).toEqual(200);
        
    }
    )
    it('Should update product', async () => {
        const productTest = new product({
            name: 'test',
            price: 1,
            description: 'test',
            restaurant: '1',
            category: '1'
        })
        await productTest.save();
        const res = await supertest(app).put('/product/1')
            .send({
                name: 'test',
                price: 1,
                description: 'test',
                restaurant: '1',
                category: '1'
            });
        expect(res.statusCode).toEqual(200);
        
    }
    )
    it('Should delete product', async () => {
        const productTest = new product({
            name: 'test',
            price: 1,
            description: 'test',
            restaurant: '1',
            category: '1'
        })
        await productTest.save();
        const res = await supertest(app).delete('/product/1');
        expect(res.statusCode).toEqual(200);
        
    }
    )
}
)

