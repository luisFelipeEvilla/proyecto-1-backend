import 'dotenv/config.js';
import express from 'express';
import { PORT } from './config';
import { createConnection } from './db/index';
import auth from './routes/auth';
import user from './routes/user';
import restaurant from './routes/restaurant';
import product from './routes/product';
import order from './routes/order';
import authenticationMiddleware from './middlewares/authentication';
import authorizationMiddleware from './middlewares/authorization';

createConnection();
const app = express();

app.use(express.json());
app.use('/auth', auth);
app.use('/user', authenticationMiddleware, authorizationMiddleware, user);
app.use('/restaurant', authenticationMiddleware, restaurant);
app.use('/product', authenticationMiddleware, product);
app.use('/order', authenticationMiddleware, order);

app.listen(PORT, () => {
    console.log('Server is listening on port 3000');
});

