import { Request, Response, NextFunction } from 'express';

import pool from '../db/db';
import bcrypt from 'bcrypt';
import { UserWithoutPassword } from '../routers/interfaces';

interface Login {
	email: string;
	password: string;
}
export interface AuthRequest extends Request {
	user?: UserWithoutPassword;
	body: Login;
}

const authMiddleware = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	if (!req.body.email || !req.body.password) {
		return res
			.status(401)
			.json({ message: 'Login failed - missing credentials' });
	}
	const email = req.body.email.toLowerCase();
	const password = req.body.password;
	const found = await pool.query('SELECT * FROM users WHERE email = $1', [
		email,
	]);
	if (found.rows.length === 0) {
		return res.status(404).json({ message: 'User not found' });
	}
	const passwordHash = found.rows[0].password;
	const passwordMatch = await bcrypt.compare(password, passwordHash);
	if (!passwordMatch) {
		return res
			.status(401)
			.json({ message: 'Login failed - wrong credentials' });
	}
	const userWithoutPassword: UserWithoutPassword = {
		...found.rows[0],
	};
	req.user = userWithoutPassword;
	next();
};

export default authMiddleware;
