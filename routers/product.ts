import { Request, Response, NextFunction, Router } from 'express';
import pool from '../db/db';
import * as queries from './queries';
import { Product, ProductId } from './interfaces';
import {
	deleteProduct,
	getAllProducts,
	getItemByNameOrSKU,
	insertNewProduct,
	updateProduct,
} from './productService';

const productsRouter = Router();

productsRouter.get('/', getAllProducts);
productsRouter.get('/search', getItemByNameOrSKU);
// all route below will be a protected route later
productsRouter.post('/', insertNewProduct);
productsRouter.patch('/', updateProduct);
productsRouter.delete('/:todelete', deleteProduct);

export default productsRouter;
