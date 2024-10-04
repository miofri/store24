import { Router } from 'express';
import { createOrder, getOrderByUserId } from '../services/orderService';

const orderRouter = Router();

orderRouter.get('/all-orders/:user_id', getOrderByUserId);
orderRouter.post('/create-order', createOrder);

export default orderRouter;
