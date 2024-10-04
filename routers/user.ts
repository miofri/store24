import { Request, Response, NextFunction, Router } from 'express';
import pool from '../db/db';
import * as queries from './queries';
import bcrypt from 'bcrypt';
import { User, UserId, ChangeEmail, ChangePassword } from './interfaces';
import {
	deleteUser,
	getAllUsers,
	getUserById,
	insertNewUser,
	updateEmail,
	updatePasword,
	updateUser,
} from './userService';

const usersRouter = Router();

// will be a protected route later

usersRouter.get('/', getAllUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/signup', insertNewUser);
usersRouter.patch('/update-user-data', updateUser);
usersRouter.patch('/update-email', updateEmail);
usersRouter.patch('/update-password', updatePasword);
usersRouter.delete('/:id', deleteUser);

export default usersRouter;