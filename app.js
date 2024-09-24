const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const { pool } = require('./db/db');
//const path = require('path');
require('dotenv').config();
morgan.token('body', (req) => {
	return JSON.stringify(req.body);
});

app.use(express.json());
app.use(cors());
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.get('/products', async (req, res, next) => {
	try {
		const query = await pool.query('select * from products');
		res.json(query.rows);
	} catch (error) {
		next(error);
	}
});

app.get('/', (req, res) => {
	res.sendStatus(200);
});
module.exports = app;
