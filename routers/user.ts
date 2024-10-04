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
