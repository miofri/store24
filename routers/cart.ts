import { Router } from 'express';

import {
	addToCart,
	clearCart,
	getCartByUserId,
	reduceFromCart,
	removeItemFromCart,
} from '../services/cartService';

const cartRouter = Router();

cartRouter.get('/:userid', getCartByUserId);
cartRouter.post('/add-to-cart', addToCart);
cartRouter.post('/reduce-from-cart', reduceFromCart);
cartRouter.delete('/clearcart/:user_id', clearCart);
cartRouter.delete('/remove-item', removeItemFromCart);

export default cartRouter;
