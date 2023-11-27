import supertest from "supertest";
import express from "express";
const app = express();


const productRoutes = require('../../src/routes/product.ts');
app.use('/product', productRoutes);

describe('Product Integration test', () => {
    it('GET/ should return all products', async () => {
        const res = await supertest(app).get('/product');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('products');
    }
    )
    it('GET/:id should return product by id', async () => {
        const res = await supertest(app).get('/product/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('product');
    }
    )
    it('GET/name/:name should return product by name', async () => {
        const res = await supertest(app).get('/product/name/test');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('product');
    }
    )
    it('POST/ should create product', async () => {
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
    it('PUT/:id should update product', async () => {
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
    it('DELETE/:id should delete product', async () => {
        const res = await supertest(app).delete('/product/1');
        expect(res.statusCode).toEqual(200);
        
    }
    )
}
)

