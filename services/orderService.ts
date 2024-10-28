import { Request, Response, NextFunction } from 'express';
import * as queries from '../queries/orderQuery';
import pool from '../db/db';
import { Order, OrderRow } from '../routers/interfaces';

export const getOrderByUserId = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { user_id } = req.params;
		const query = await pool.query(queries.getOrderByUserId, [user_id]);
		// building into an arr of obj for easier access in frontend
		const orders = {};
		query.rows.forEach((row: OrderRow) => {
			const order_id = row.order_id!.toString();
			if (!orders[order_id]) {
				orders[order_id] = {
					order_id: row.order_id,
					status: row.status,
					total_amount: row.total_amount,
					created_at: row.created_at,
					items: [],
				};
			}
			orders[order_id].items.push({
				order_item_id: row.id,
				product_id: row.product_id,
				quantity: row.quantity,
				price: row.price,
			});
		});
		const result = Object.values(orders);
		res.json(result);
	} catch (error) {
		next(error);
	}
};

export const createOrder = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const client = await pool.connect();
	try {
		const order: Order = req.body;

		await client.query('BEGIN');
		const insertOrderQuery = await pool.query<OrderRow>(
			queries.insertNewOrder,
			[order.user_id, order.status, order.total_amount]
		);
		const order_id: number = insertOrderQuery.rows[0].id;
		order.items.forEach(async (item) => {
			const insertOrderItemQuery = await pool.query<Order>(
				queries.insertNewOrderItem,
				[order_id, item.product_id, item.quantity, item.price]
			);
		});
		await client.query('COMMIT');
		res.sendStatus(201);
	} catch (error) {
		await client.query('ROLLBACK');
		console.error('Error creating order:', error);
		res.status(500).json({ error: 'Failed to create order' });
	} finally {
		client.release();
	}
};

//need to create a route for fetching all orders for admin dash

// maybe it makes more sense if order is not updateable after being made
// e.g. to ease delivery. and no deleting order so that there is history or order.
