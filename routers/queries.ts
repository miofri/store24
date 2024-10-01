const selectProducts = 'select * from products';
const addNewProduct =
	'INSERT INTO products (sku, name, category, price, inventory, description, section, images) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
const patchProduct =
	'UPDATE products SET sku = $1, name = $2, category = $3, price = $4, inventory = $5, description = $6, section = $7, images = $8 WHERE id = $9 RETURNING *';
const deleteProduct = 'DELETE FROM products WHERE id = $1';

const getCartByUserId = `SELECT cart.user_id, cartitems.id, cartitems.product_id, cartitems.cart_id, products.name, products.price FROM cart LEFT JOIN cartitems ON cartitems.cart_id = cart.id LEFT JOIN products ON cartitems.product_id = products.id WHERE cart.user_id = $1`;

export {
	selectProducts,
	addNewProduct,
	patchProduct,
	deleteProduct,
	getCartByUserId,
};
