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

//PATCH ADD?

ordersRouter.delete('/:orderId', requireUser, async (req, res, next) => {
    try {
      const {orderId} = req.params;
      const getOrderId = await getOrderById(orderId);
      if(!getOrderId) {
        next({
          name: 'Order NotFound',
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