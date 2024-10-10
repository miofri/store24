import { Router } from 'express';

import {
	addToCart,
	clearCart,
	getCartByUserId,
	reduceFromCart,
	removeItemFromCart,
} from '../services/cartService';
import headerCheckMiddlware from '../services/headerCheckMiddleware';

const cartRouter = Router();

cartRouter.get('/:userid', getCartByUserId); // for later: accessible only for admin & own self
cartRouter.use(headerCheckMiddlware);
cartRouter.post('/add-to-cart', addToCart);
cartRouter.post('/reduce-from-cart', reduceFromCart);
cartRouter.delete('/clearcart/:user_id', clearCart);
cartRouter.delete('/remove-item', removeItemFromCart);

export default cartRouter;
