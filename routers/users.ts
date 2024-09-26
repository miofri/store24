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
	city: String;
	country: String;
}
interface UserId extends User {
	id: String;
}
interface ChangeEmailPassword {
	id: String;
	email: String;
	password: String;
}

// will be a protected route later

usersRouter.get('/', async (req, res, next) => {
	try {
		const query = await pool.query('SELECT * FROM users');
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
		const query = await pool.query(
			'INSERT INTO users (first_name, last_name, email, password, home_address, city, country) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
			[
				newUser.first_name,
				newUser.last_name,
				newUser.email,
				hashedPassword,
				newUser.home_address,
				newUser.city,
				newUser.country,
			]
		);
		res.status(201).json(query.rows[0]);
	} catch (error) {
		console.error('Error executing query:', error);
		res.status(500).json({
			message: 'Registration failed',
		});
	}
});

usersRouter.patch('/update-user-data', async (req, res, next) => {
	try {
		const user: UserId = req.body;
		const query = await pool.query(
			'UPDATE users SET first_name = $1, last_name = $2, home_address =$3, city = $4, country = $5 WHERE id = $6 RETURNING *',
			[
				user.first_name,
				user.last_name,
				user.home_address,
				user.city,
				user.country,
			]
		);
	} catch (error) {
		next(error);
	}
});

usersRouter.patch('/update-user-email-password', async (req, res, next) => {
	try {
		const user: ChangeEmailPassword = req.body;
		const hashedPassword = await bcrypt.hash(user.password, saltRounds);
		const query = await pool.query(
			'UPDATE users SET email = $1, password = $2, WHERE id = $3 RETURNING *',
			[user.email, hashedPassword, user.id]
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
