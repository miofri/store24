import { Request, Response, NextFunction, Router } from 'express';
import pool from '../db/db';
import * as queries from './queries';
import bcrypt from 'bcrypt';

const usersRouter = Router();
const saltRounds = 10;

interface User {
	first_name: String;
	last_name: String;
	email: String;
	password: String;
	home_address: String;
	postcode: Number;
	city: String;
	country: String;
}
interface UserId extends User {
	id: String;
}
interface ChangePassword {
	id: String;
	password: String;
}
interface ChangeEmail {
	id: String;
	email: String;
}
// will be a protected route later

usersRouter.get('/', async (req, res, next) => {
	try {
		const query = await pool.query('SELECT * FROM users');
		res.json(query.rows);
	} catch (error) {
		next(error);
	}
});
usersRouter.get('/:id', async (req, res, next) => {
	try {
		const userId: String = req.params.id;
		const query = await pool.query('SELECT * FROM users WHERE id = $1', [
			userId,
		]);
		res.json(query.rows[0]);
	} catch (error) {
		next(error);
	}
});

usersRouter.post('/signup', async (req, res, next) => {
	const newUser: User = req.body;
	const hashedPassword: String = await bcrypt.hash(
		newUser.password,
		saltRounds
	);
	try {
		const emailCheckQuery = await pool.query(
			'SELECT * FROM users WHERE email = $1',
			[newUser.email]
		);
		if (emailCheckQuery.rows.length > 0) {
			return res.status(400).json({ error: 'Email is already in use' });
		}
		const query = await pool.query(
			'INSERT INTO users (first_name, last_name, email, password, home_address, postcode, city, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
			[
				newUser.first_name,
				newUser.last_name,
				newUser.email,
				hashedPassword,
				newUser.home_address,
				newUser.postcode,
				newUser.city,
				newUser.country,
			]
		);
		res.status(201).json(query.rows[0]);
	} catch (error) {
		next(error);
	}
});

usersRouter.patch('/update-user-data', async (req, res, next) => {
	try {
		const user: UserId = req.body;
		const query = await pool.query(
			'UPDATE users SET first_name = $1, last_name = $2, home_address = $3, city = $4, country = $5 WHERE id = $6 RETURNING *',
			[
				user.first_name,
				user.last_name,
				user.home_address,
				user.city,
				user.country,
				user.id,
			]
		);
		res.json(query.rows[0]);
	} catch (error) {
		next(error);
	}
});

usersRouter.patch('/update-email', async (req, res, next) => {
	try {
		const user: ChangeEmail = req.body;
		const query = await pool.query(
			'UPDATE users SET email = $1 WHERE id = $2 RETURNING *',
			[user.email, user.id]
		);
		res.status(200).json(query.rows[0]);
	} catch (error) {
		next(error);
	}
});

usersRouter.patch('/update-password', async (req, res, next) => {
	try {
		const user: ChangePassword = req.body;
		const hashedPassword = await bcrypt.hash(user.password, saltRounds);
		const query = await pool.query(
			'UPDATE users SET password = $1 WHERE id = $2 RETURNING *',
			[hashedPassword, user.id]
		);
		res.status(200).json(query.rows[0]);
	} catch (error) {
		next(error);
	}
});

usersRouter.delete('/:id', async (req, res, next) => {
	try {
		const idToDelete: String = req.params.id;
		const query = await pool.query('DELETE FROM users WHERE id = $1', [
			idToDelete,
		]);
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

export default usersRouter;
