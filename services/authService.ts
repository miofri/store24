import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_KEY = process.env.JWT_SECRET_KEY as string;

export const authenticateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (req.user) {
			const token = jwt.sign(
				{
					email: req.user.email,
					userid: req.user.userid,
				},
				JWT_KEY,
				{ expiresIn: '7d' }
			);
			res.json({ token: token, user: req.user });
		}
	} catch (error) {
		next(error);
	}
};
