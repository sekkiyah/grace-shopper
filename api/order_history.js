const express = require('express');
const orderHistoryRouter = express.Router();
// const { requireAdmin } = require("./utils");
const {
  getAllOrderHistories,
  getOrderHistoryByUserId,
  updateOrderHistory
} = require('../db/tables/order_history');

orderHistoryRouter.get('/', (req, res, next) => {
  res.send('order_history API in progress');
});

orderHistoryRouter.use((req, res, next) => {
  console.log('A request is being made to /order_history')
});

//GET /api/order_history
orderHistoryRouter.get('/', async (req, res, next) => {
  try {
    const allOrderHistories = await getAllOrderHistories();

    res.send({
      allOrderHistories
    })

  } catch (error) {
    res.send(error)
  }
});

//GET /api/order_history/:userId
orderHistoryRouter.get('/:userId', /*requireAdmin,*/ async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userOrderHistory = await getOrderHistoryByUserId(userId);

    res.send({
      userOrderHistory
    })

  } catch (error) {
    res.send(error)
  }
});

//PATCH /api/order_history/:orderHistoryId
orderHistoryRouter.patch('/:orderHistoryId', /*requireAdmin,*/ async (req, res, next) => {
  const { userId } = req.params;
  const { status } = req.body;

  const updateFields = {};

  if (status) {
    updateFields.status = status;
  }

  try {
    const updatedOrderHistory = await updateOrderHistory({ id: userId, ...updateFields });

    res.send(updatedOrderHistory)

  } catch (error) {
    res.send(error)
  }
});

module.exports = orderHistoryRouter;
