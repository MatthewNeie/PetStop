const express = require('express')
const productsRouter = express.Router();

const {
    createProduct,
    getProductById,
    getAllProducts,
    getProductByPetType,
    getProductByProductType,
    getProductByName,
    updateProductById,
    deleteProductById
} = require('../db');

productsRouter.get('/', async( req, res, next) => {
    try {
        const products = await getAllProducts();

        res.send(products);
    } catch (error) {
        console.log(error)
        next(error)
    }
});

productsRouter.get('/id/:productId', async( req, res, next) => {
    try {
        const {productId} = req.params
        const productById = await getProductById(productId);
        console.log(productById);
        res.send(productById);
    } catch (error) {
        console.log(error)
        next(error)
    }
});

productsRouter.get('/type/:petType', async( req, res, next) => {
  try {
      const {petType} = req.params
      const productByPetType = await getProductByPetType(petType);
      res.send(productByPetType);
  } catch (error) {
      console.log(error)
      next(error)
  }
});

productsRouter.get('/type/:productType', async( req, res, next) => {
    try {
        const {productType} = req.params
        const productByType = await getProductByProductType(productType);
        res.send(productByType);
    } catch (error) {
        console.log(error)
        next(error)
    }
});


productsRouter.post('/newproduct', async(req, res, next) => {
    const { name, description, price, quantity, petType, productType, inStock, isPopular, imgUrl } = req.body;

    try {
        
        // const _product = await getProductByName(name);

        // if(_product) {
        //     next({
        //         name: 'ProductExistsError',
        //         message: 'A product with that name already exists'
        //     });
        // }

        const product = await createProduct({
            name, description, price, quantity, petType, productType, inStock, isPopular, imgUrl
        });
        
    } catch(error) {
        console.log(error)
        next(error)
    }
})

// PATCH (needs changes?)

productsRouter.patch('/:productId', async (req, res, next) => {
    try {
      const {name, description, price, quantity, petType, productType, inStock, isPopular, imgUrl} = req.body
      const {productId} = req.params;
      const updateProduct = await getProductById(productId);
      console.log(updateProduct)
      if(!updateProduct) {
        next({
          name: 'ProductNotFound',
          message: `No product found by ID ${productId}`
        })}
        // else {
        // if(!await canEditProduct(req.params.productId, req.user.id)) {
        //   res.status(403);
        //   next({name: "Unauthorized", message: "You cannot edit this product!"});
        // } 
        else {
          const updatedProduct = await updateProductById(productId, {
            name, description, price, quantity, petType, productType, inStock, isPopular, imgUrl
          })
          res.send(updatedProduct);
        }
      } catch (error) {
        console.log(error)
      next(error);
    }
  });

productsRouter.delete('/:productId', async (req, res, next) => {
    try {
      const {productId} = req.params;
      const getProductId = await getProductById(productId);
      if(!getProductId) {
        next({
          name: 'Product NotFound',
          message: `No product by ID ${productId}`
        })
      } else {
        const deleteProduct = await deleteProductById(productId)
        res.send(deleteProduct);
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = productsRouter;