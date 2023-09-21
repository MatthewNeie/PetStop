const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createAdministrator = async({ name='first last', email, password, token }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [ administrator ] } = await db.query(`
        INSERT INTO administrator(name, email, password, token)
        VALUES($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name, email, hashedPassword, token]);

        return administrator;
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

const getAdministratorByEmail = async(email) => {
    try {
        const { rows: [ administrator ] } = await db.query(`
        SELECT * 
        FROM administrator
        WHERE email=$1;`, [ email ]);

        if(!administrator) {
            return;
        }
        return administrator;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createAdministrator,
    getAdministrator,
    getAdministratorByEmail
};