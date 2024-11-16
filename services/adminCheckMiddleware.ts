import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

//interface HeaderCheck extends Request {
//	user?: { email: string; userid: string };
//}

const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',') || [];

const adminCheckMiddlware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.user) {
		return res.status(401).json({ message: 'User not authenticated' });
	}

	if (!ADMIN_EMAILS.includes(req.user.email)) {
		return res.status(403).json({ message: 'Access denied - Admins only' });
	}

	next();
};

export default adminCheckMiddlware;
