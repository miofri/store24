import { Router } from 'express';
import { authenticateUser } from '../services/authService';
import auth_middleware from '../services/authMiddleware';

const authRouter = Router();

authRouter.post('/login', auth_middleware, authenticateUser);

export default authRouter;
