declare namespace Express {
	export interface Request {
		user?: { email: string; userid: string };
		user_data?: {
			userid: string;
			first_name: string;
			last_name: string;
			email: string;
			home_address: string;
			postcode: number;
			city: string;
			country: string;
		};
	}
}
