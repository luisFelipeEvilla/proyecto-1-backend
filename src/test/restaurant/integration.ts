import supertest from "supertest";
import express from "express";
const app = express();


const restaurantRoutes = require('../../routes/restaurant');
app.use('/restaurant', restaurantRoutes);

describe('Restaurant Integration test', () => {
    it('GET/ should return all restaurants', async () => {
        const res = await supertest(app).get('/restaurant');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('restaurants');
    }
    )
    it('GET/:id should return restaurant by id', async () => {
        const res = await supertest(app).get('/restaurant/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('restaurant');
    }
    )
    it('GET/name/:name should return restaurant by name', async () => {
        const res = await supertest(app).get('/restaurant/name/test');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('restaurant');
    }
    )
    it('POST/ should create restaurant', async () => {
        const res = await supertest(app).post('/restaurant')
            .send({
                name: 'test',
                description: 'test',
                address: 'test',
                phone: 'test',
                email: 'test',
                category: 'test',
                owner: 'test'
            });
        expect(res.statusCode).toEqual(200);
        
    }
    )
    it('PUT/:id should update restaurant', async () => {
        const res = await supertest(app).put('/restaurant/1')
            .send({
                name: 'test',
                description: 'test',
                address: 'test',
                phone: 'test',
                email: 'test',
                category: 'test',
                owner: 'test'
            });
        expect(res.statusCode).toEqual(200);
        
    }
    )
    it('DELETE/:id should delete restaurant', async () => {
        const res = await supertest(app).delete('/restaurant/1');
        expect(res.statusCode).toEqual(200);
        
    }
    )
}
)
