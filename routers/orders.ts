import { Request, Response, NextFunction, Router } from 'express';
import pool from '../db/db';
import * as queries from './queries';

const orderRouter = Router();

orderRouter.get('/', async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
});
orderRouter.post('/', async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
});
orderRouter.patch('/', async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
});
orderRouter.delete('/', async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
});

export default orderRouter;
