import {it} from 'node:test'
const supertest = require('supertest');
const app = require('../../routes/user.ts');
const user = require('../../models/user.ts');

describe('User controller test', () => {
    it('Should return all users', async () => {
        const userTest = new user({
            name: 'test',
            email: 'test',
            password: 'test',
            phone: 'test',
            address: 'test',
            role: 'client'
        })
        await userTest.save();
        const res = await supertest(app).get('/user');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('users');
    }
    )
    it('Should return user by id', async () => {
        const userTest = new user({
            name: 'test',
            email: 'test',
            password: 'test',
            phone: 'test',
            address: 'test',
            role: 'client'
        })
        await userTest.save();
        const res = await supertest(app).get('/user/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
    }
    )
    it('Should return user by email', async () => {
        const userTest = new user({
            name: 'test',
            email: 'test',
            password: 'test',
            phone: 'test',
            address: 'test',
            role: 'client'
        })
        await userTest.save();
        const res = await supertest(app).get('/user/email/test');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
    }
    )
    it('Should create user', async () => {
        const res = await supertest(app).post('/user')
            .send({
                name: 'test',
                email: 'test',
                password: 'test',
                phone: 'test',
                address: 'test',
                role: 'admin'
            });
        expect(res.statusCode).toEqual(200);
        
    }
    )
    it('Should update user', async () => {
        const userTest = new user({
            name: 'test',
            email: 'test',
            password: 'test',
            phone: 'test',
            address: 'test',
            role: 'admin'
        })
        await userTest.save();
        const res = await supertest(app).put('/user/1')
            .send({
                name: 'test',
                email: 'test',
                password: 'test',
                phone: 'test',
                address: 'test',
                role: 'admin'
            });
        expect(res.statusCode).toEqual(200);

    }
    )
    it('Should delete user', async () => {
        const userTest = new user({
            name: 'test',
            email: 'test',
            password: 'test',
            phone: 'test',
            address: 'test',
            role: 'client'
        })
        await userTest.save();
        const res = await supertest(app).delete('/user/1');
        expect(res.statusCode).toEqual(200);
        
    }
    )
    it('Should login user', async () => {
        const userTest = new user({
            name: 'test',
            email: 'test',
            password: 'test',
            phone: 'test',
            address: 'test',
            role: 'client'
        })
        await userTest.save();
        const res = await supertest(app).post('/user/login')
            .send({
                email: 'test',
                password: 'test'
            });
        expect(res.statusCode).toEqual(200);
        
    }
    )
    it('Should get 2fa code', async () => {
        const userTest = new user({
            name: 'test',
            email: 'test',
            password: 'test',
            phone: 'test',
            address: 'test',
            role: 'client'
        })
        await userTest.save();
        const res = await supertest(app).get('/user/2fa/1');
        expect(res.statusCode).toEqual(200);
        
    } 
    )

}
)
