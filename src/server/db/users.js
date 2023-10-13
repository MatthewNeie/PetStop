const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async({ email, password, firstName, lastName, address, isAdministrator }) => {

    console.log("password", password)
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [ user ] } = await db.query(`
        INSERT INTO users(email, password, "firstName", "lastName", address, "isAdministrator")
        VALUES($1, $2, $3, $4, $5, $6)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [email, hashedPassword, firstName, lastName, address, isAdministrator]);

        return user;
    } catch (err) {
        throw err;
    }
}

const getAllUserAdmins = async() => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE "isAdministrator"=$1;`, [true]);

        if(!user) {
            console.error("No Admins")
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

const getAllUsers = async() => {
    try {
        const { rows: users } = await db.query(`
        SELECT * 
        FROM users`);

        if(!users) {
            console.error("No Users")
            return;
        }
        console.log(users);
        return users;
    } catch (err) {
        throw err;
    }
}

const getUserById = async(id) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE id=$1;`, [ id ]);

        if(!user) {
            console.error("No Users");
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}


const getUserByEmail = async(email) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [ email ]);

        if(!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

const getUserByPassword = async(password) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE password=$1;`, [ password ]);

        if(!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

const updateUserById = async(id, fields = {}) => {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    if (setString.length === 0) {
        return;
    }
    try {
        const { rows: [user] } = await client.query(`
            UPDATE users
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));
        return user;
    } catch (error) {
        throw error;
    }
}

const deleteUserById = async(id) => {
    try {
        const { rows: [ user ] } = await db.query(`
        DELETE FROM users
        WHERE id=$1
        RETURNING *;`, [ id ]);

        if(!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getAllUserAdmins,
    getUserById,
    getUserByEmail,
    getUserByPassword,
    updateUserById,
    deleteUserById,
};