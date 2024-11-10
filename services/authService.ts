import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from './authMiddleware';

const JWT_KEY = process.env.JWT_SECRET_KEY as string;

export const authenticateUser = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = jwt.sign(
			{
				email: req.user?.email,
				userid: req.user?.userid,
			},
			JWT_KEY,
			{ expiresIn: '7d' }
		);
		res.json({ token: token, user: req.user });
	} catch (error) {
		next(error);
	}
};
