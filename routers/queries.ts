/*      */
/* Cart */
/*      */
const getCartByUserId = `SELECT cart.user_id, cartitems.id, cartitems.product_id, cartitems.cart_id, products.name, products.price FROM cart LEFT JOIN cartitems ON cartitems.cart_id = cart.id LEFT JOIN products ON cartitems.product_id = products.id WHERE cart.user_id = $1`;
const updateCartItem =
	'UPDATE cartitems SET quantity = quantity - $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *';
/*      */
/* Order */
/*      */
const getOrderByUserId =
	'SELECT orders.*, orderitems.* FROM orders LEFT JOIN orderitems ON orderitems.order_id = orders.id WHERE orders.user_id = $1';
const insertNewOrder =
	'INSERT INTO orders (user_id, status, total_amount) VALUES ($1, $2, $3) RETURNING *';
const insertNewOrderItem =
	'INSERT INTO orderitems (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)';

/*      */
/* Prod */
/*      */
const selectProducts = 'SELECT * FROM products';
const addNewProduct =
	'INSERT INTO products (sku, name, category, price, inventory, description, section, images) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
const patchProduct =
	'UPDATE products SET sku = $1, name = $2, category = $3, price = $4, inventory = $5, description = $6, section = $7, images = $8 WHERE id = $9 RETURNING *';
const deleteProduct = 'DELETE FROM products WHERE id = $1';

/*      */
/* User */
/*      */
const addNewUser =
	'INSERT INTO users (first_name, last_name, email, password, home_address, postcode, city, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
const updateUser =
	'UPDATE users SET first_name = $1, last_name = $2, home_address = $3, city = $4, country = $5 WHERE id = $6 RETURNING *';

export {
	selectProducts,
	addNewProduct,
	patchProduct,
	deleteProduct,
	getCartByUserId,
	getOrderByUserId,
	insertNewOrder,
	insertNewOrderItem,
	addNewUser,
	updateUser,
	updateCartItem,
};
