import { Request, Response, NextFunction } from 'express';
import { selectUserById } from '../queries/userQuery';
import pool from '../db/db';
import { UserWithoutPassword } from '../routers/interfaces';

const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',') || [];

interface Login {
	email: string;
	password: string;
}
export interface AuthRequest extends Request {
	user?: UserWithoutPassword;
	body: Login;
}

const isAdminOrUserMiddleware = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		console.log('params:', req.params);
		let potentialEmail: string;

		//check for routes with param :userid. checking if param's :userid's email matches with the one received from headercheck (jwtauth). also check if matches with admin's email

		if (Object.keys(req.params).length > 0) {
			const query = await pool.query(selectUserById, [req.params.userid]);
			potentialEmail = query.rows[0].email;
			if (
				!req.body.email &&
				(req.user?.email === potentialEmail ||
					ADMIN_EMAILS.includes(potentialEmail))
			) {
				return next();
			}
		}

		// for checking if email is passed through body instead - need to rethink this one
		if (
			req.user?.email &&
			(req.user.email === req.body.email ||
				ADMIN_EMAILS.includes(req.user?.email))
		) {
			return next();
		}
		return res.status(403).json({ message: "You're not supposed to be here!" });
	} catch (error) {
		next(error);
	}
};

export default isAdminOrUserMiddleware;
