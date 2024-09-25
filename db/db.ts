import Pool from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool.Pool({
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT!),
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

export default pool;
