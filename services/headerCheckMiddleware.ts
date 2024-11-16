import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

//header
//interface HeaderCheck extends Request {
//	user?: { email: string; userid: string };
//}

const headerCheckMiddlware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.headers['authorization']) {
		return res.status(401).json({ message: 'Token not found' });
	}
	const authToken = req.headers['authorization'] as string;
	const getToken = authToken.split(' ')[1];

	const jwtSecretKey = process.env.JWT_SECRET_KEY!;

	try {
		const decodedToken = jwt.verify(getToken, jwtSecretKey);
		console.log(decodedToken);

		if (typeof decodedToken === 'object' && decodedToken !== null) {
			const { email, userid } = decodedToken as JwtPayload & {
				email?: string;
				userid?: string;
			};
			console.log(email, userid);

			if (email && userid) {
				req.user = { email, userid };
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
