const selectAllUsers = 'SELECT * FROM users';
const selectUserById = 'SELECT * FROM users WHERE id = $1';
const selectUserByEmail = 'SELECT * FROM users WHERE email = $1';

const deleteUser = 'DELETE FROM users WHERE id = $1';

const addNewUser =
	'INSERT INTO users (first_name, last_name, email, password, home_address, postcode, city, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

const updateEmail = 'UPDATE users SET email = $1 WHERE id = $2 RETURNING *';
const updatePassword =
	'UPDATE users SET password = $1 WHERE id = $2 RETURNING *';
const updateUser =
	'UPDATE users SET first_name = $1, last_name = $2, home_address = $3, city = $4, country = $5 WHERE id = $6 RETURNING *';

export {
	addNewUser,
	updateUser,
	selectAllUsers,
	selectUserById,
	selectUserByEmail,
	updateEmail,
	updatePassword,
	deleteUser,
};
