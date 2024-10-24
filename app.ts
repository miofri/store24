import express, { Request } from 'express';
const app = express();
import cors from 'cors';
import morgan from 'morgan';
import productsRouter from './routers/product.ts';
//const path = require('path');
import dotenv from 'dotenv';
import usersRouter from './routers/user.ts';
import cartRouter from './routers/cart.ts';
import orderRouter from './routers/orders.ts';
import authRouter from './routers/auth.ts';

dotenv.config();
morgan.token('body', (req: Request) => {
	return JSON.stringify(req.body);
});

app.use(express.json());
app.use(cors());
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.use('/api/auth', authRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);

app.get('/', (req: any, res: { sendStatus: (arg0: number) => void }) => {
	res.sendStatus(200);
});

export default app;
