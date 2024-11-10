import { Request, Response, NextFunction } from 'express';
import * as queries from '../queries/userQuery';
import pool from '../db/db';
import bcrypt from 'bcrypt';
import {
	ChangeEmail,
	ChangePassword,
	User,
	UserId,
} from '../routers/interfaces';

const saltRounds = 10;

export const insertNewUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const newUser: User = req.body;
	const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
	try {
		const emailCheckQuery = await pool.query(queries.selectUserByEmail, [
			newUser.email,
		]);
		if (emailCheckQuery.rows.length > 0) {
			return res.status(400).json({ error: 'Email is already in use' });
		}
		const query = await pool.query(queries.addNewUser, [
			newUser.first_name,
			newUser.last_name,
			newUser.email,
			hashedPassword,
			newUser.home_address,
			newUser.postcode,
			newUser.city,
			newUser.country,
		]);
		res.status(201).json(query.rows[0]);
	} catch (error) {
		next(error);
	}
};

export const getAllUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const query = await pool.query(queries.selectAllUsers);
		res.json(query.rows);
	} catch (error) {
		next(error);
	}
};

export const getUserById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId: string = req.params.userid;
		const query = await pool.query(queries.selectUserById, [userId]);
		res.json(query.rows[0]);
	} catch (error) {
		next(error);
	}
};

export const updateUserData = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user: UserId = req.body;
		const query = await pool.query(queries.updateUser, [
			user.first_name,
			user.last_name,
			user.home_address,
			user.city,
			user.country,
			user.userid,
		]);
		res.json(query.rows[0]);
	} catch (error) {
		next(error);
	}
};

export const updateEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user: ChangeEmail = req.body;
		const query = await pool.query(queries.updateEmail, [
			user.email,
			user.userid,
		]);
		res.status(200).json(query.rows[0]);
	} catch (error) {
		next(error);
	}
};

export const updatePasword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user: ChangePassword = req.body;
		const hashedPassword = await bcrypt.hash(user.password, saltRounds);
		const query = await pool.query(queries.updatePassword, [
			hashedPassword,
			user.userid,
		]);
		res.status(200).json(query.rows[0]);
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const idToDelete: string = req.params.id;
		const query = await pool.query(queries.deleteUser, [idToDelete]);
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};
