import { Request, Response, NextFunction } from 'express';
import { selectUserById } from '../queries/userQuery';
import pool from '../db/db';

const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',') || [];

interface Login {
	email: string;
	password: string;
}
export interface AuthRequest extends Request {
	body: Login;
}

const isAdminOrUserMiddleware = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		console.log('isadminormuser', req.user_data);

		let potentialEmail: string;
		if (Object.keys(req.params).length > 0) {
			const query = await pool.query(selectUserById, [req.params.userid]);
			potentialEmail = query.rows[0].email;
			if (
				!req.body.email &&
				(req.user_data?.email === potentialEmail ||
					ADMIN_EMAILS.includes(potentialEmail))
			) {
				return next();
			}
		}

		// for checking if email is passed through body instead - need to rethink this one
		if (req.user?.email || ADMIN_EMAILS.includes(req.user!.email)) {
			return next();
		}
		return res.status(403).json({ message: "You're not supposed to be here!" });
	} catch (error) {
		next(error);
	}
};

export default isAdminOrUserMiddleware;
