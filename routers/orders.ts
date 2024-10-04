import { Request, Response, NextFunction, Router } from 'express';
import pool from '../db/db';
import * as queries from './queries';
import { OrderRow, Order } from './interfaces';
import { createOrder, getOrderByUserId } from './orderService';

const orderRouter = Router();

orderRouter.get('/all-orders/:user_id', getOrderByUserId);
orderRouter.post('/create-order', createOrder);

export default orderRouter;
