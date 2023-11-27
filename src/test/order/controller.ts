import { orderQueryType } from './../../controllers/order';
import { it } from "node:test";

const supertest = require('supertest');
const app = require('../../routes/order.ts');
const order = require('../../models/order.ts');


describe('Order controller test', () => {
    it('Should return orders by query', async () => {
        const orderTest = new order({
            products: [],
            created_by: '1',
            send_by: '1',
            status: '1',
            restaurant: '1',
            date: new Date()
        })
        await orderTest.save();
        const res = await supertest(app).get('/order');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('orders');
    }
    )
    it('Should return order by id', async () => {
       const orderTest = new order({
            products: [],
            created_by: '1',
            send_by: '1',
            status: '1',
            restaurant: '1',
            date: new Date()
        })
        await orderTest.save();
        const res = await supertest(app).get('/order/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('order');
    }
    )
    it('Should create order', async () => {
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
    it('Should update order', async () => {
        const orderTest = new order({
            products: [],
            created_by: '1',
            send_by: '1',
            status: '1',
            restaurant: '1',
            date: new Date()
        })
        await orderTest.save();
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
    it('Should delete order', async () => {
        const orderTest = new order({
            products: [],
            created_by: '1',
            send_by: '1',
            status: '1',
            restaurant: '1',
            date: new Date()
        })
        await orderTest.save();
        const res = await supertest(app).delete('/order/1')
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
    it('Should return order by userid', async () => {
        const orderTest = new order({
            products: [],
            created_by: '1',
            send_by: '1',
            status: '1',
            restaurant: '1',
            date: new Date()
        })
        await orderTest.save();
        const res = await supertest(app).get('/order/user/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('orders');
    }
    )
    it('Should return order by restaurantid', async () => {
        const orderTest = new order({
            products: [],
            created_by: '1',
            send_by: '1',
            status: '1',
            restaurant: '1',
            date: new Date()
        })
        await orderTest.save();
        const res = await supertest(app).get('/order/restaurant/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('orders');
    }
    )
    it('Should return order by status', async () => {
        const orderTest = new order({
            products: [],
            created_by: '1',
            send_by: '1',
            status: '1',
            restaurant: '1',
            date: new Date()
        })
        await orderTest.save();
        const res = await supertest(app).get('/order/status/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('orders');
    }
    )
    it('Should return order by date', async () => {
        const orderTest = new order({
            products: [],
            created_by: '1',
            send_by: '1',
            status: '1',
            restaurant: '1',
            date: new Date()
        })
        await orderTest.save();
        const res = await supertest(app).get('/order/date/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('orders');
    }
    )
})




