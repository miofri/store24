import { Router } from 'express';
import { createOrder, getOrderByUserId } from '../services/orderService';
import headerCheckMiddlware from '../services/headerCheckMiddleware';
import isAdminOrUserMiddleware from '../services/isAdminOrUserMiddleware';

const orderRouter = Router();

orderRouter.use(headerCheckMiddlware);
orderRouter.get('/orders/', isAdminOrUserMiddleware, getOrderByUserId);
orderRouter.post('/create-order/:userid', isAdminOrUserMiddleware, createOrder);

//need to create a route for fetching all orders for admin dash

export default orderRouter;
