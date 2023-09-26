const express = require('express')
const administratorsRouter = express.Router();

const {
    createAdministrator,
    getAdministratorById,
    getAllAdministrators,
    getAdministratorByEmail,
    deleteAdministratorById
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
        const administrator = await getAdministratorById({email, password});
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

administratorsRouter.delete('/:administratorId', async (req, res, next) => {
    try {
      const {administratorId} = req.params;
      const getAdministratorId = await getAdministratorById(administratorId);
      if(!getAdministratorId) {
        next({
          name: 'Administrator NotFound',
          message: `No user by ID ${administratorId}`
        })
      } else {
        const deleteAdministrator = await deleteAdministratorById(administratorId)
        res.send(deleteAdministrator);
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = administratorsRouter;