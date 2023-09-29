const express = require('express')
const ordersRouter = express.Router();

const { requireUser } = require('./utils')
const {
    createOrder,
    getAllOrders,
    getOrderById,
    deleteOrderById
} = require('../db');

ordersRouter.get('/', async( req, res, next) => {
    try {
        const orders = await getAllOrders();

        res.send(orders);
    } catch ({name, message}) {
        next({name, message})
    }
});

ordersRouter.get('/:orderId', requireUser, async( req, res, next) => {
    try {
        const {orderId} = req.params;
        const order = await getOrderById(orderId)
        res.send(order);
    } catch ({name, message}) {
        next({name, message})
    }
});

ordersRouter.get('/date/:date', requireUser, async( req, res, next) => {
    try {
        const {orderId} = req.params;
        const order = await getOrderById(orderId)
        res.send(order.date);
    } catch ({name, message}) {
        next({name, message})
    }
});

ordersRouter.get('/user/:userId', requireUser, async( req, res, next) => {
    try {
        const {orderId} = req.params;
        const order = await getOrderById(orderId)
        res.send(order.userId);
    } catch ({name, message}) {
        next({name, message})
    }
});

ordersRouter.get('/trackingnumber/:trackingNumber', requireUser, async( req, res, next) => {
    try {
        const {orderId} = req.params;
        const order = await getOrderById(orderId)
        res.send(order.trackingNumber);
    } catch ({name, message}) {
        next({name, message})
    }
});

ordersRouter.post('/neworder', requireUser, async(req, res, next) => {
    
    const { name, date, createdAt, productId, userId, trackingNumber } = req.body;

    try {
        const _order = await getOrderById(id);

        if(_order) {
            next({
                name: 'OrderExistsError',
                message: 'An order with that id already exists'
            });
        }

        const order = await createOrder({
            name, date, createdAt, productId, userId, trackingNumber
        });

        res.send(order);

    } catch({name, message}) {
        next({name, message})
    }
})

productsRouter.patch('/:orderId', async (req, res, next) => {
    try {
      const {date, createdAt, productId, userId, trackingNumber} = req.body
      const {orderId} = req.params;
      const updateOrder = await getOrderById(orderId);
      console.log(updateOrder)
      if(!updateOrder) {
        next({
          name: 'OrderNotFound',
          message: `No order found by ID ${orderId}`
        })}
        // else {
        // if(!await canEditProduct(req.params.productId, req.user.id)) {
        //   res.status(403);
        //   next({name: "Unauthorized", message: "You cannot edit this product!"});
        // } 
        else {
          const updatedOrder = await updateProductById(orderId, {
            date, createdAt, productId, userId, trackingNumber
          })
          res.send(updatedOrder);
        }
      } catch (error) {
        console.log(error)
      next(error);
    }
  });

ordersRouter.delete('/:orderId', requireUser, async (req, res, next) => {
    try {
      const {orderId} = req.params;
      const getOrderId = await getOrderById(orderId);
      if(!getOrderId) {
        next({
          name: 'OrderNotFound',
          message: `No order by ID ${orderId}`
        })
      } else {
        const deleteOrder = await deleteOrderById(orderId)
        res.send(deleteOrder);
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = ordersRouter;