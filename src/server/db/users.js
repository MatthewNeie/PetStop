const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async({ name='first last', email, password, token }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [ users ] } = await db.query(`
        INSERT INTO users(name, email, password)
        VALUES($1, $2, $3)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name, email, hashedPassword, token]);

        return user;
    } catch (err) {
        throw err;
    }
}

const getAllUsers = async() => {
    try {
        const { rows: [ users ] } = await db.query(`
        SELECT * 
        FROM users`, []);

        if(!users) {
            console.error("No Users")
            return;
        }
        return users;
    } catch (err) {
        throw err;
    }
}

const getUserByEmail = async(email) => {
    try {
        const { rows: [ users ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [ email ]);

        if(!users) {
            return;
        }
        return users;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserByEmail
};