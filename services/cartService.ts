import { Request, Response, NextFunction } from 'express';
import * as queries from '../queries/cartQuery';
import pool from '../db/db';
import { AddToCart, HeaderCheck } from '../routers/interfaces';

export const getCartByUserId = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userid = req.user?.userid;
		console.log('cart', userid);

		const query = await pool.query(queries.getCartByUserId, [userid]);
		if (query.rows.length === 1 && query.rows[0].id === null) {
			return res.json({ message: 'cart not found' });
		}
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
		const userid = req.user?.userid;
		const { product_id }: AddToCart = req.body;
		const cartExistCheck = await pool.query(queries.cartExistCheck, [userid]);
		let cartId: number;

		if (cartExistCheck.rowCount === 0) {
			const addCart = await pool.query(queries.addToCart, [userid]);
			cartId = addCart.rows[0].id;
		} else {
			cartId = cartExistCheck.rows[0].id;
		}
		const checkIfCartItemExist = await pool.query(
			queries.checkIfCartItemExist,
			[cartId, product_id]
		);

		if (checkIfCartItemExist.rows.length > 0) {
			const updateCartItem = await pool.query(queries.updateCartItem, [
				1,
				cartId,
				product_id,
			]);
			res.json(updateCartItem.rows[0]);
		} else {
			const insertCartItem = await pool.query(queries.insertCartItem, [
				cartId,
				product_id,
				1,
			]);
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
		const userid = req.user?.userid;
		const { product_id }: AddToCart = req.body;
		pool.query('BEGIN    ');
		const cartExistCheck = await pool.query(queries.cartExistCheck, [userid]);
		let cartId: number;
		if (cartExistCheck.rowCount === 0) {
			const addCart = await pool.query(queries.insertNewCart, [userid]);
			cartId = addCart.rows[0].id;
		} else {
			cartId = cartExistCheck.rows[0].id;
		}
		const checkIfCartItemExist = await pool.query(
			queries.checkIfCartItemExist,
			[cartId, product_id]
		);
		if (checkIfCartItemExist.rows.length > 0) {
			if (checkIfCartItemExist.rows[0].quantity === 1) {
				const deleteCartItem = await pool.query(queries.deleteCartItem, [
					cartId,
					product_id,
				]);
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
		const userid = req.user?.userid;
		const findCartId = await pool.query(queries.cartExistCheck, [userid]);
		if (findCartId.rows.length === 0) {
			return res
				.status(400)
				.json({ message: 'Cart is already empty or does not exist.' });
		}
		const deleteQuery = await pool.query(queries.clearCart, [
			findCartId.rows[0].id,
		]);
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
		const userid = req.user?.userid;
		const { product_id } = req.body;
		const findCartId = await pool.query(queries.cartExistCheck, [userid]);
		if (findCartId.rows.length === 0) {
			res.status(404).json({ error: 'Item does not exist' });
		}
		const deleteItemFromCart = await pool.query(queries.deleteCartItem, [
			findCartId.rows[0].id,
			product_id,
		]);
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};
