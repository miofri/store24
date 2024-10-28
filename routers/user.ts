import { Router } from 'express';
import {
	deleteUser,
	getAllUsers,
	getUserById,
	insertNewUser,
	updateEmail,
	updatePasword,
	updateUser,
} from '../services/userService';
import headerCheckMiddlware from '../services/headerCheckMiddleware';
import adminCheckMiddlware from '../services/adminCheckMiddleware';

const usersRouter = Router();

usersRouter.post('/signup', insertNewUser);

usersRouter.use(headerCheckMiddlware);
usersRouter.get('/:id', getUserById); // account owner only/admin
usersRouter.patch('/update-user-data', updateUser); // account owner only/admin
usersRouter.patch('/update-email', updateEmail); // account owner only/admin
usersRouter.patch('/update-password', updatePasword); // account owner only/admin
usersRouter.delete('/:id', deleteUser); // account owner only/admin

usersRouter.use(adminCheckMiddlware);
usersRouter.get('/', getAllUsers); // admin only later

export default usersRouter;
