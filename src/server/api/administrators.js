const express = require('express')
const administratorsRouter = express.Router();

const {
    createAdministrator,
    getAdministrator,
    getAllAdministrators,
    getAdministratorByEmail
} = require('../db');

const jwt = require('jsonwebtoken')

administratorsRouter.get('/', async( req, res, next) => {
    try {
        const administrators = await getAllAdministrators();

        res.send({
            administrators
        });
    } catch ({name, message}) {
        next({name, message})
    }
});

administratorsRouter.post('/login', async(req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an email and password'
        });
    }
    try {
        const administrator = await getAdministrator({email, password});
        if(administrator) {
            const token = jwt.sign({
                id: administrator.id,
                email
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({
                message: 'Login successful!',
                token
            });
        }
        else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'administratorsname or password is incorrect'
            });
        }
    } catch(err) {
        next(err);
    }
});

administratorsRouter.post('/register', async(req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const _administrator = await getAdministratorByEmail(email);

        if(_administrator) {
            next({
                name: 'UserExistsError',
                message: 'A user with that email already exists'
            });
        }

        const administrator = await createAdministrator({
            name,
            email,
            password
        });

        const token = jwt.sign({
            id: administrator.id,
            email
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: 'Sign up successful!',
            token
        });
    } catch({name, message}) {
        next({name, message})
    }
})

module.exports = administratorsRouter;