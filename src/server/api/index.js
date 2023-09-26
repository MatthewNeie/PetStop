const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'neverTell' } = process.env

const volleyball = require('volleyball')
apiRouter.use(volleyball)

// GET /api/health
apiRouter.get('/health', (req, res, next) => {
  res.send('OK');
});

// TO BE COMPLETED - set `req.user` if possible, using token sent in the request header
apiRouter.use(async (req, res, next) => {
  const auth = req.header('Authorization');
  const prefix = "Bearer "

  if (!auth) { 
    next();
  } 
  else if (auth.startsWith(prefix)) {
  
    const token = auth.slice(prefix.length);
    
    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      
      const id = parsedToken && parsedToken.id
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  } 
  else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with 'Bearer'`
    });
  }
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const administratorsRouter = require('./administrators');
apiRouter.use('/administrators', administratorsRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);

const cartRouter = require('./cart');
apiRouter.use('/cart', cartRouter);

const reviewRouter = require('./reviews');
apiRouter.use('/reviews', reviewRouter);


apiRouter.use((err, req, res, next) => {
    res.status(500).send(err)
  })

module.exports = apiRouter;