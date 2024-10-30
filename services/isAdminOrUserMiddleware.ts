import { Request, Response, NextFunction } from 'express';

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

const isAdminOrUserMiddleware = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	if (
		req.user?.email &&
		(req.user.email === req.body.email ||
			ADMIN_EMAILS.includes(req.user?.email))
	) {
		return next();
	}
	return res.status(403).json({ message: "You're not supposed to be here!" });
};

export default isAdminOrUserMiddleware;
