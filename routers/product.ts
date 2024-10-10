import { Router } from 'express';
import {
	deleteProduct,
	getAllProducts,
	getItemByNameOrSKU,
	insertNewProduct,
	updateProduct,
} from '../services/productService';

const productsRouter = Router();

productsRouter.get('/', getAllProducts);
productsRouter.get('/search', getItemByNameOrSKU);
// all route below will be a protected ADMIN ONLY route later
productsRouter.post('/', insertNewProduct);
productsRouter.patch('/', updateProduct);
productsRouter.delete('/:todelete', deleteProduct);

export default productsRouter;
