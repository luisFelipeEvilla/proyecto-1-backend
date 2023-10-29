import 'dotenv/config.js';
import express from 'express';
import { PORT } from './config';
import { createConnection } from './db/index';
import auth from './routes/auth';
import user from './routes/user';
import restaurant from './routes/restaurant';
import product from './routes/product';
import order from './routes/order';

createConnection();
const app = express();

app.use(express.json());
app.use('/auth', auth);
app.use('/user', user);
app.use('/restaurant', restaurant);
app.use('/product', product);
app.use('/order', order);

app.listen(PORT, () => {
    console.log('Server is listening on port 3000');
});

