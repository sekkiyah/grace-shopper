const express = require('express');
const orderHistoryRouter = express.Router();
const { requireUser, requireAdmin } = require('./utils');
const {
  deleteOrderHistoriesByUserId,
  updateOrderHistory,
  buildUserOrderHistoryObject,
  buildAllOrderHistoriesObject,
  getOrderHistoryById,
  deleteOrderHistoryById,
  getOrderHistoryByUserId,
} = require('../db/tables/order_history');
const { submitUserCartByUserId } = require('../db/tables/user_cart');

//GET /api/order_history
orderHistoryRouter.get(
  '/',
  /**requireAdmin, */ async (req, res, next) => {
    try {
      const allOrderHistories = await buildAllOrderHistoriesObject();

      res.send(allOrderHistories);
    } catch (error) {
      res.send({
        name: 'Order Histories Error',
        message: `API Unable to get all Order Histories`,
      });
      next(error);
    }
  }
);

//GET /api/order_history/:userId
orderHistoryRouter.get('/:userId', requireUser, async (req, res, next) => {
  const { userId } = req.params;
  try {
    const response = await buildUserOrderHistoryObject(userId);
    res.send(response);
  } catch (error) {
    res.send({
      name: 'Order Histories Error',
      message: `API Unable to get this users Order History`,
    });
    next(error);
  }
});

//POST /api/order_history
orderHistoryRouter.post('/', async (req, res, next) => {
  const { userId } = req.body;

  try {
    const orderHistory = await submitUserCartByUserId(userId);
    res.send(orderHistory);
  } catch (error) {
    res.send({
      name: 'Order History Error',
      message: `API Unable to add user cart to Order History`,
    });
    next(error);
  }
});

//PATCH /api/order_history/:orderHistoryId
orderHistoryRouter.patch(
  '/:orderHistoryId',
  /*requireAdmin,*/ async (req, res, next) => {
    const { orderHistoryId } = req.params;

    try {
      const order = await getOrderHistoryById(orderHistoryId);
      if (!order) {
        res.status(404).send({
          name: 'Order Number Not Found',
          message: 'Order Number was not found in the database',
          error: 'OrderNotFoundError',
        });
      } else {
        const updatedOrder = {};
        updatedOrder.id = orderHistoryId;
        for (key in req.body) {
          updatedOrder[key] = req.body[key];
        }
        const result = await updateOrderHistory(updatedOrder);
        res.send(result);
      }
    } catch (error) {
      res.send({
        name: 'Order Histories Error',
        message: `API Unable to update Order History`,
      });
      next(error);
    }
  }
);

//DELETE /api/order_history/:orderHistoryId
orderHistoryRouter.delete(
  '/:orderHistoryId',
  /**requireAdmin, */ async (req, res, next) => {
    const { orderHistoryId } = req.params;

    try {
      const response = await getOrderHistoryById(orderHistoryId);
      await deleteOrderHistoryById(orderHistoryId);
      res.send(response);
    } catch (error) {
      res.send({
        name: 'Order History Error',
        message: `Unable to delete Order History`,
      });
      next(error);
    }
  }
);

//DELETE /api/order_history/user_history/:userId
orderHistoryRouter.delete(
  '/user_history/:userId',
  /**requireAdmin, */ async (req, res, next) => {
    const { userId } = req.params;

    try {
      const response = await getOrderHistoryByUserId(userId);
      await deleteOrderHistoriesByUserId(userId);
      res.send(response);
    } catch (error) {
      res.send({
        name: 'Order History Error',
        message: `Unable to delete users Order History`,
      });
      next(error);
    }
  }
);

module.exports = orderHistoryRouter;
