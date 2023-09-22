const express = require('express')
const productsRouter = express.Router();

const {
    createProduct,
    getAllProducts,
    getProductByName
} = require('../db');

const jwt = require('jsonwebtoken')

productsRouter.get('/', async( req, res, next) => {
    try {
        const products = await getAllProducts();

        res.send(products);
    } catch ({name, message}) {
        next({name, message})
    }
});

productsRouter.post('/newproduct', async(req, res, next) => {
    const { name, description, price, quantity, productType, inStock, isPopular, imgUrl } = req.body;
    if(!name) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an email and password'
        });
    }
    try {
        const product = await getProduct({ name, description, price, quantity, productType, inStock, isPopular, imgUrl });
        
            res.send({ name, description, price, quantity, productType, inStock, isPopular, imgUrl });
    } catch(err) {
        next(err);
    }
});

usersRouter.post('/register', async(req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const _user = await getUserByEmail(email);

        if(_user) {
            next({
                name: 'UserExistsError',
                message: 'A user with that email already exists'
            });
        }

        const user = await createUser({
            name,
            email,
            password
        });

        const token = jwt.sign({
            id: user.id,
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

module.exports = usersRouter;