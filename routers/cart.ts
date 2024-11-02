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
cartRouter.get('/:userid', isAdminOrUserMiddleware, getCartByUserId);
cartRouter.post('/add-to-cart/:userid', isAdminOrUserMiddleware, addToCart);
cartRouter.post(
	'/reduce-from-cart/:userid',
	isAdminOrUserMiddleware,
	reduceFromCart
);
cartRouter.delete('/clearcart/:user_id', isAdminOrUserMiddleware, clearCart);
cartRouter.delete(
	'/remove-item/:userid',
	isAdminOrUserMiddleware,
	removeItemFromCart
);

export default cartRouter;
