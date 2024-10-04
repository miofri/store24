const selectProducts = 'SELECT * FROM products';
const selectProductByNameOrSKU =
	"SELECT * FROM products WHERE sku = $1 OR name ILIKE '%' || $2 || '%'";

const addNewProduct =
	'INSERT INTO products (sku, name, category, price, inventory, description, section, images) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

const patchProduct =
	'UPDATE products SET sku = $1, name = $2, category = $3, price = $4, inventory = $5, description = $6, section = $7, images = $8 WHERE id = $9 RETURNING *';

const deleteProduct = 'DELETE FROM products WHERE id = $1';

export {
	selectProducts,
	selectProductByNameOrSKU,
	addNewProduct,
	patchProduct,
	deleteProduct,
};
