const getOrderByUserId =
	'SELECT orders.*, orderitems.* FROM orders LEFT JOIN orderitems ON orderitems.order_id = orders.id WHERE orders.user_id = $1';

const insertNewOrder =
	'INSERT INTO orders (user_id, status, total_amount) VALUES ($1, $2, $3) RETURNING *';
const insertNewOrderItem =
	'INSERT INTO orderitems (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)';

export { getOrderByUserId, insertNewOrder, insertNewOrderItem };
