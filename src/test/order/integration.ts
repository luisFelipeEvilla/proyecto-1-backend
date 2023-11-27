import supertest from 'supertest';
import express from 'express';

const app = express();

const orderRoutes = require('../../routes/order.ts');
app.use('/order', orderRoutes);

describe('Order Integration test', () => {
    it('GET/ should return orders', async () => {
        const res = await supertest(app).get('/order');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('orders');
    }
    )
    it('GET/:id should return order by id', async () => {
        const res = await supertest(app).get('/order/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('order');
    }
    )
    it('POST/ should create order', async () => {
        const res = await supertest(app).post('/order')
            .send({
                products: [],
                created_by: '1',
                send_by: '1',
                status: '1',
                restaurant: '1',
                date: new Date()
            });
        expect(res.statusCode).toEqual(200);
        
    }
    )
    it('PUT/:id should update order', async () => {
        const res = await supertest(app).put('/order/1')
            .send({
                products: [],
                created_by: '1',
                send_by: '1',
                status: '1',
                restaurant: '1',
                date: new Date()
            });
        expect(res.statusCode).toEqual(200);
        
    }
    )
    it('DELETE/:id should delete order', async () => {
        const res = await supertest(app).delete('/order/1');
        expect(res.statusCode).toEqual(200);
        
    }
    )
    it('GET/user/:id should return orders by user', async () => {
        const res = await supertest(app).get('/order/user/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('orders');
    }
    )
    it('GET/restaurant/:id should return orders by restaurant', async () => {
        const res = await supertest(app).get('/order/restaurant/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('orders');
    }
    )
    it('GET/status/:status should return orders by status', async () => {
        const res = await supertest(app).get('/order/status/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('orders');
    }
    )
    it('GET/date/:date should return orders by date', async () => {
        const res = await supertest(app).get('/order/date/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('orders');
    }
    )
}
)
