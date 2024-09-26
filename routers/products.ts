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
interface ProductId extends Product {
	id: string;
}

productsRouter.get('/', async (req, res, next) => {
	try {
		const query = await pool.query(queries.selectProducts);
		res.status(200).json(query.rows);
	} catch (error) {
		next(error);
	}
});

// all route below will be a protected route later

productsRouter.post('/', async (req, res, next) => {
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
});

productsRouter.patch('/', async (req, res, next) => {
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
});

productsRouter.delete('/:todelete', async (req, res, next) => {
	try {
		const productToDelete: string = req.params.todelete;
		const query = await pool.query(queries.deleteProduct, [productToDelete]);
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

export default productsRouter;
