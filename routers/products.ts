import { Request, Response, NextFunction, Router } from 'express';
import pool from '../db/db';
import * as queries from './queries';

const productsRouter = Router();

interface Product {
	sku: String;
	name: String;
	category: String;
	price: Number;
	inventory: Number;
	description: String;
	section: String;
	images: String[];
}
productsRouter.get(
	'/',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const query = await pool.query(queries.selectProducts);
			res.json(query.rows);
		} catch (error) {
			next(error);
		}
	}
);

export default productsRouter;
