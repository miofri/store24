import { Router } from 'express';
import { createOrder, getOrderByUserId } from '../services/orderService';
import headerCheckMiddlware from '../services/headerCheckMiddleware';

const orderRouter = Router();

orderRouter.use(headerCheckMiddlware);
orderRouter.get('/all-orders/:user_id', getOrderByUserId);
orderRouter.post('/create-order', createOrder);

export default orderRouter;
