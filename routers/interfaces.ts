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
	user_id: string;
	status: 'pending' | 'shipped' | 'delivered' | 'canceled';
	total_amount: number;
}
export interface OrderItem {
	order_id?: number;
	product_id: number;
	quantity: number;
	price: number;
}
export interface Order extends BaseOrder {
	items: OrderItem[];
}
export interface OrderRow extends BaseOrder, OrderItem {
	id: number;
	created_at: string;
}

/*      */
/* Prod */
/*      */
export interface Product {
	sku: string;
	name: string;
	category: string;
	price: number;
	inventory: number;
	description: string;
	section: string;
	images: string[];
}
export interface ProductId extends Product {
	id: string;
}

/*      */
/* User */
/*      */
export interface User {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	home_address: string;
	postcode: number;
	city: string;
	country: string;
}
export interface UserId extends User {
	id: string;
}
export interface ChangePassword {
	id: string;
	password: string;
}
export interface ChangeEmail {
	id: string;
	email: string;
}
