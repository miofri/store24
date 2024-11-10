import { Router } from 'express';
import {
	deleteUser,
	getAllUsers,
	getUserById,
	insertNewUser,
	updateEmail,
	updatePasword,
	updateUserData,
} from '../services/userService';
import headerCheckMiddlware from '../services/headerCheckMiddleware';
import adminCheckMiddlware from '../services/adminCheckMiddleware';
import isAdminOrUserMiddleware from '../services/isAdminOrUserMiddleware';

const usersRouter = Router();

usersRouter.post('/signup', insertNewUser);

usersRouter.use(headerCheckMiddlware);
usersRouter.get('/:userid', isAdminOrUserMiddleware, getUserById);
usersRouter.patch('/update-user-data', isAdminOrUserMiddleware, updateUserData);
usersRouter.patch('/update-email', isAdminOrUserMiddleware, updateEmail);
usersRouter.patch('/update-password', isAdminOrUserMiddleware, updatePasword);
usersRouter.delete('/:id', isAdminOrUserMiddleware, deleteUser);

//admin only
usersRouter.use(adminCheckMiddlware);
usersRouter.get('/', getAllUsers); // admin only later

export default usersRouter;
