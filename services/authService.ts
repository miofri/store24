import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_KEY = process.env.JWT_SECRET_KEY as string;

export const authenticateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = jwt.sign(
			{
				email: req.user_data?.email,
				userid: req.user_data?.userid,
			},
			JWT_KEY,
			{ expiresIn: '7d' }
		);
		res.json({ token: token, user: req.user });
	} catch (error) {
		next(error);
	}
};
