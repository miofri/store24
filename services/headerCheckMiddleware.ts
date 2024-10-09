import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

const headerCheckMiddlware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.headers['Authorization']) {
		return res.status(401).json({ message: 'Token not found' });
	}
	const authHeader = req.headers['Authorization'].split(' ')[1];
	try {
		const jwtVerify = jwt.verify(
			authHeader,
			process.env.JWT_SECRET_KEY as string
		);
	} catch (error) {
		next(error);
	}
};
