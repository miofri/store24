/*      */
/* Cart */
/*      */
export interface AddToCart {
	user_id: string;
	product_id: number;
}

/*      */
/* Order */
/*      */
export interface BaseOrder {
	user_id: String;
	status: 'pending' | 'shipped' | 'delivered' | 'canceled';
	total_amount: number;
}
export interface OrderItem {
	order_id?: Number;
	product_id: Number;
	quantity: Number;
	price: Number;
}
export interface Order extends BaseOrder {
	items: OrderItem[];
}
export interface OrderRow extends BaseOrder, OrderItem {
	id: Number;
	created_at: String;
}

/*      */
/* Prod */
/*      */
export interface Product {
	sku: String;
	name: String;
	category: String;
	price: Number;
	inventory: Number;
	description: String;
	section: String;
	images: String[];
}
export interface ProductId extends Product {
	id: string;
}

/*      */
/* User */
/*      */
export interface User {
	first_name: String;
	last_name: String;
	email: String;
	password: String;
	home_address: String;
	postcode: Number;
	city: String;
	country: String;
}
export interface UserId extends User {
	id: String;
}
export interface ChangePassword {
	id: String;
	password: String;
}
export interface ChangeEmail {
	id: String;
	email: String;
}
