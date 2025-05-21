const cartExistCheck = 'SELECT * FROM cart WHERE user_id = $1';
const checkIfCartItemExist =
	'SELECT * FROM cartitems WHERE cart_id = $1 AND product_id = $2';
const getCartByUserId = `SELECT cart.user_id, cartitems.id, cartitems.product_id, cartitems.cart_id, products.name, products.price FROM cart LEFT JOIN cartitems ON cartitems.cart_id = cart.id LEFT JOIN products ON cartitems.product_id = products.id WHERE cart.user_id = $1`;

const addToCart = 'INSERT INTO cart (user_id) VALUES ($1) RETURNING id';
const insertCartItem =
	'INSERT INTO cartitems(cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
const insertNewCart = 'INSERT INTO cart (user_id) VALUES ($1) RETURNING id';

const clearCart = 'DELETE FROM cartitems WHERE cart_id = $1';
const deleteCartItem =
	'DELETE FROM cartitems WHERE cart_id = $1 AND product_id =$2';

const addItemQuantity =
	'UPDATE cartitems SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *';
const reduceItemQuantity =
	'UPDATE cartitems SET quantity = quantity - $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *';

export {
	getCartByUserId,
	reduceItemQuantity,
	cartExistCheck,
	addToCart,
	checkIfCartItemExist,
	insertCartItem,
	insertNewCart,
	deleteCartItem,
	clearCart,
	addItemQuantity,
};
