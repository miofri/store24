import { Router } from 'express';
import {
	deleteProduct,
	getAllProducts,
	getItemByNameOrSKU,
	insertNewProduct,
	updateProduct,
} from '../services/productService';
import headerCheckMiddlware from '../services/headerCheckMiddleware';
import adminCheckMiddlware from '../services/adminCheckMiddleware';

const productsRouter = Router();

productsRouter.get('/', getAllProducts);
productsRouter.get('/search', getItemByNameOrSKU);

//admin only
productsRouter.use(headerCheckMiddlware);
productsRouter.use(adminCheckMiddlware);
productsRouter.post('/', insertNewProduct);
productsRouter.patch('/', updateProduct);
productsRouter.delete('/:todelete', deleteProduct);

export default productsRouter;
