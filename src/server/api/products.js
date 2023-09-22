const express = require('express')
const productsRouter = express.Router();

const {
    createProduct,
    getProduct,
    getProductById,
    getAllProducts,
    getProductByName
} = require('../db');

productsRouter.get('/', async( req, res, next) => {
    try {
        const products = await getAllProducts();

        res.send(products);
    } catch ({name, message}) {
        next({name, message})
    }
});

productsRouter.get('/:productId', async( req, res, next) => {
    try {
        const productById = await getProductById(id);
        res.send(productById);
    } catch ({name, message}) {
        next({name, message})
    }
});


productsRouter.post('/newproduct', async(req, res, next) => {
    const { name, description, price, quantity, productType, inStock, isPopular, imgUrl } = req.body;

    try {
        const _product = await getProductByName(name);

        if(_product) {
            next({
                name: 'ProductExistsError',
                message: 'A user with that name already exists'
            });
        }

        const product = await createProduct({
            name, description, price, quantity, productType, inStock, isPopular, imgUrl
        });

        res.send(product);

    } catch({name, message}) {
        next({name, message})
    }
})

module.exports = productsRouter;