import { Request, Response, NextFunction, Router } from 'express';
import pool from '../db/db';
import * as queries from './queries';
import { AddToCart } from './interfaces';
import {
	addToCart,
	clearCart,
	getCartByUserId,
	reduceFromCart,
	removeItemFromCart,
} from './cartService';

const cartRouter = Router();

cartRouter.get('/:userid', getCartByUserId);
cartRouter.post('/add-to-cart', addToCart);
cartRouter.post('/reduce-from-cart', reduceFromCart);
cartRouter.delete('/clearcart/:user_id', clearCart);
cartRouter.delete('/remove-item', removeItemFromCart);

export default cartRouter;
