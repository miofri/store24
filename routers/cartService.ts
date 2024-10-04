import { Request, Response, NextFunction } from 'express';
import * as queries from './queries';
import pool from '../db/db';
import { AddToCart } from './interfaces';

export const getCartByUserId = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { userid } = req.params;
		const query = await pool.query(queries.getCartByUserId, [userid]);
		res.json(query.rows);
	} catch (error) {
		next(error);
	}
};

export const addToCart = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { user_id, product_id }: AddToCart = req.body;
		const cartExistCheck = await pool.query(
			'SELECT * FROM cart WHERE user_id = $1',
			[user_id]
		);
		let cartId: number;

		if (cartExistCheck.rowCount === 0) {
			const addCart = await pool.query(
				'INSERT INTO cart (user_id) VALUES ($1) RETURNING id',
				[user_id]
			);
			cartId = addCart.rows[0].id;
		} else {
			cartId = cartExistCheck.rows[0].id;
		}
		const checkIfCartItemExist = await pool.query(
			'SELECT * FROM cartitems WHERE cart_id = $1 AND product_id = $2',
			[cartId, product_id]
		);

		if (checkIfCartItemExist.rows.length > 0) {
			const updateCartItem = await pool.query(
				'UPDATE cartitems SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *',
				[1, cartId, product_id]
			);
			res.json(updateCartItem.rows[0]);
		} else {
			const insertCartItem = await pool.query(
				'INSERT INTO cartitems(cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
				[cartId, product_id, 1]
			);
			res.json(insertCartItem.rows[0]);
		}
	} catch (error) {
		next(error);
	}
};

export const reduceFromCart = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { user_id, product_id }: AddToCart = req.body;
		pool.query('BEGIN    ');
		const cartExistCheck = await pool.query(
			'SELECT * FROM cart WHERE user_id = $1',
			[user_id]
		);
		let cartId: number;
		if (cartExistCheck.rowCount === 0) {
			const addCart = await pool.query(
				'INSERT INTO cart (user_id) VALUES ($1) RETURNING id',
				[user_id]
			);
			cartId = addCart.rows[0].id;
		} else {
			cartId = cartExistCheck.rows[0].id;
		}
		const checkIfCartItemExist = await pool.query(
			'SELECT * FROM cartitems WHERE cart_id = $1 AND product_id = $2',
			[cartId, product_id]
		);
		if (checkIfCartItemExist.rows.length > 0) {
			if (checkIfCartItemExist.rows[0].quantity === 1) {
				const deleteCartItem = await pool.query(
					'DELETE FROM cartitems WHERE cart_id = $1 AND product_id =$2',
					[cartId, product_id]
				);
				res.sendStatus(404);
			}
			const updateCartItem = await pool.query(queries.updateCartItem, [
				1,
				cartId,
				product_id,
			]);
			res.json(updateCartItem.rows[0]);
		} else {
			res.json({ message: 'item does not exist in cart' });
		}
	} catch (error) {
		next(error);
	}
};

export const clearCart = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { user_id } = req.params;
		const findCartId = await pool.query(
			'SELECT * FROM cart WHERE user_id = $1',
			[user_id]
		);
		if (findCartId.rows.length === 0) {
			return res
				.status(400)
				.json({ message: 'Cart is already empty or does not exist.' });
		}
		const deleteQuery = await pool.query(
			'DELETE FROM cartitems WHERE cart_id = $1',
			[findCartId.rows[0].id]
		);
		res.status(200).json({ message: 'Cart cleared successfully' });
	} catch (error) {
		next(error);
	}
};

export const removeItemFromCart = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { user_id, product_id } = req.body;
		const findCartId = await pool.query(
			'SELECT * FROM cart WHERE user_id = $1',
			[user_id]
		);
		if (findCartId.rows.length === 0) {
			res.status(404).json({ error: 'Item does not exist' });
		}
		const deleteItemFromCart = await pool.query(
			'DELETE FROM cartitems WHERE cart_id = $1 AND product_id = $2',
			[findCartId.rows[0].id, product_id]
		);
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};
