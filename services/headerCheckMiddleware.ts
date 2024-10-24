import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface HeaderCheck extends Request {
	user?: { email: string; id: string };
}

const headerCheckMiddlware = async (
	req: HeaderCheck,
	res: Response,
	next: NextFunction
) => {
	if (!req.headers['authorization']) {
		return res.status(401).json({ message: 'Token not found' });
	}
	const getToken = req.headers['authorization'] as string;
	console.log(getToken);

	const jwtSecretKey = process.env.JWT_SECRET_KEY!;

	try {
		const decodedToken = jwt.verify(getToken, jwtSecretKey);
		console.log(decodedToken);

		if (typeof decodedToken === 'object' && decodedToken !== null) {
			const { email, id } = decodedToken as JwtPayload & {
				email?: string;
				id?: string;
			};
			if (email && id) {
				req.user = { email, id };
				next();
			} else {
				return res.status(403).json({ message: 'Invalid token payload' });
			}
		} else {
			return res.status(403).json({ message: 'Invalid token format' });
		}
	} catch (error) {
		return res.status(403).json({ message: 'Invalid token' });
	}
};
export default headerCheckMiddlware;
