import { it } from "node:test";

const supertest = require('supertest');
const app = require('../../routes/restaurant.ts');
const restaurant = require('../../models/restaurant.ts');

describe('Restaurant controller test', () => {
    it('Should return all restaurants', async () => {
        const restaurantTest = new restaurant({
            name: 'test',
            description: 'test',
            address: 'test',
            phone: 'test',
            email: 'test',
            category: 'test',
            owner: 'test'
        })
        await restaurantTest.save();
        const res = await supertest(app).get('/restaurant');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('restaurants');
    }
    )
    it('Should return restaurant by id', async () => {
        const restaurantTest = new restaurant({
            name: 'test',
            description: 'test',
            address: 'test',
            phone: 'test',
            email: 'test',
            category: 'test',
            owner: 'test'
        })
        await restaurantTest.save();
        const res = await supertest(app).get('/restaurant/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('restaurant');
    }
    )
    it('Should return restaurant by name', async () => {
        const restaurantTest = new restaurant({
            name: 'test',
            description: 'test',
            address: 'test',
            phone: 'test',
            email: 'test',
            category: 'test',
            owner: 'test'
        })
        await restaurantTest.save();
        const res = await supertest(app).get('/restaurant/name/test');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('restaurant');
    }
    )
    it('Should create restaurant', async () => {
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
    it('Should update restaurant', async () => {
        const restaurantTest = new restaurant({
            name: 'test',
            description: 'test',
            address: 'test',
            phone: 'test',
            email: 'test',
            category: 'test',
            owner: 'test'
        })
        await restaurantTest.save();
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
    it('Should delete restaurant', async () => {
        const restaurantTest = new restaurant({
            name: 'test',
            description: 'test',
            address: 'test',
            phone: 'test',
            email: 'test',
            category: 'test',
            owner: 'test'
        })
        await restaurantTest.save();
        const res = await supertest(app).delete('/restaurant/1');
        expect(res.statusCode).toEqual(200);
        
    }
    )
}
)

