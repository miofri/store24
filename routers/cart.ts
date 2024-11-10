import { Router } from 'express';

import {
	addToCart,
	clearCart,
	getCartByUserId,
	reduceFromCart,
	removeItemFromCart,
} from '../services/cartService';
import headerCheckMiddlware from '../services/headerCheckMiddleware';
import isAdminOrUserMiddleware from '../services/isAdminOrUserMiddleware';

const cartRouter = Router();

cartRouter.use(headerCheckMiddlware);
// isadminorusermiddleware has to be attached to each route bc params was empty when using top level .use
cartRouter.get('/', isAdminOrUserMiddleware, getCartByUserId);
cartRouter.post('/add-to-cart/', isAdminOrUserMiddleware, addToCart);
cartRouter.post('/reduce-from-cart/', isAdminOrUserMiddleware, reduceFromCart);
cartRouter.delete('/clearcart/', isAdminOrUserMiddleware, clearCart);
cartRouter.delete('/remove-item/', isAdminOrUserMiddleware, removeItemFromCart);

export default cartRouter;
