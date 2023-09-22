const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createAdministrator = async({ name='first last', email, password, adminToken }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [ administrators ] } = await db.query(`
        INSERT INTO administrators(name, email, password, "adminToken")
        VALUES($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name, email, hashedPassword, adminToken]);

        return administrators;
    } catch (err) {
        throw err;
    }
}

const getAdministrator = async({email, password}) => {
    if(!email || !password) {
        return;
    }
    try {
        const administrator = await getAdministratorByEmail(email);
        if(!administrator) return;
        const hashedPassword = administrator.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch) return;
        delete administrator.password;
        return administrator;
    } catch (err) {
        throw err;
    }
}

const getAllAdministrators = async() => {
    try {
        const { rows } = await db.query(`
        SELECT * 
        FROM administrators`, []);
        return rows;
    } catch (err) {
        throw err;
    }
}

const getAdministratorByEmail = async(email) => {
    try {
        const { rows: [ administrator ] } = await db.query(`
        SELECT * 
        FROM administrators
        WHERE email=$1;`, [ email ]);

        if(!administrator) {
            return;
        }
        return administrator;
    } catch (err) {
        throw err;
    }
}

const updateAdministratorById = async(id, fields = {}) => {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    if (setString.length === 0) {
        return;
    }
    try {
        const { rows: [administrators] } = await client.query(`
            UPDATE administrators
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));
        return administrators;
    } catch (error) {
        throw error;
    }
}

const deleteAdministratorById = async(id) => {
    try {
        const { rows: [ administrators ] } = await db.query(`
        DELETE FROM administrators
        WHERE id=$1
        RETURNING *;`, [ id ]);

        if(!administrators) {
            return;
        }
        return administrators;
    } catch (err) {
        throw err;
    }
}


module.exports = {
    createAdministrator,
    getAllAdministrators,
    getAdministrator,
    getAdministratorByEmail,
    updateAdministratorById,
    deleteAdministratorById,
};