import { Request, Response, NextFunction } from 'express';

import pool from '../db/db';
import bcrypt from 'bcrypt';
import { UserWithoutPassword } from '../routers/interfaces';

export interface AuthRequest extends Request {
	body: { email: string; password: string };
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
	const userWithoutPassword = {
		...found.rows[0],
	};

	req.user_data = {
		...userWithoutPassword,
		userid: userWithoutPassword.id,
	};
	req.user = {
		email: req.user_data!.email,
		userid: req.user_data!.userid,
	};

	next();
};

export default authMiddleware;
