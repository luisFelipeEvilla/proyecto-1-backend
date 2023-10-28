import 'dotenv/config.js';
import express from 'express';
import { PORT } from './config';
import { createConnection } from './db/index';
import auth from './routes/auth';

createConnection();
const app = express();

app.use(express.json());
app.use('/auth', auth);

app.listen(PORT, () => {
    console.log('Server is listening on port 3000');
});

