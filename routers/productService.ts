import { Request, Response, NextFunction } from 'express';
import * as queries from './queries';
import pool from '../db/db';
import { Product, ProductId } from './interfaces';

export const getAllProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const query = await pool.query(queries.selectProducts);
		res.status(200).json(query.rows);
	} catch (error) {
		next(error);
	}
};

export const getItemByNameOrSKU = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const term = req.query.q as string;
		if (!term) {
			return res.status(400).json({ message: 'Search term is required' });
		}
		const query = await pool.query(
			"SELECT * FROM products WHERE sku = $1 OR name ILIKE '%' || $2 || '%'",
			[term, term]
		);
		res.status(200).json(query.rows);
	} catch (error) {
		next(error);
	}
};

export const insertNewProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const newProd: Product = req.body;
		const query = await pool.query(queries.addNewProduct, [
			newProd.sku,
			newProd.name,
			newProd.category,
			newProd.price,
			newProd.inventory,
			newProd.description,
			newProd.section,
			newProd.images,
		]);
		res.status(201).json(query.rows[0]);
	} catch (error) {
		next(error);
	}
};

export const updateProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const patchProd: ProductId = req.body;
		const query = await pool.query(queries.patchProduct, [
			patchProd.sku,
			patchProd.name,
			patchProd.category,
			patchProd.price,
			patchProd.inventory,
			patchProd.description,
			patchProd.section,
			patchProd.images,
			patchProd.id,
		]);
		res.status(200).json(query.rows[0]);
	} catch (error) {
		next(error);
	}
};

export const deleteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const productToDelete: string = req.params.todelete;
		const query = await pool.query(queries.deleteProduct, [productToDelete]);
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};
