const express = require('express');
const orderHistoryRouter = express.Router();
// const { requireAdmin } = require("./utils");
const {
  getAllOrderHistories,
  getOrderHistoryByUserId,
  updateOrderHistory, buildUserOrderHistoryObject, buildAllOrderHistoriesObject
} = require('../db/tables/order_history');
const {submitUserCartByUserId} = require('../db/tables/user_cart')
const { getOrderDetailsByOrderId } = require('../db/tables/order_details')


//GET /api/order_history  
orderHistoryRouter.get('/', /**requireAdmin, */ async (req, res, next) => {
  try {
    const allOrderHistories = await buildAllOrderHistoriesObject();

    res.send(allOrderHistories)

  } catch (error) {
    res.send({
      name: 'Order Histories Error',
      message: `API Unable to get all Order Histories`,
      });
    next(error);
  }
});

//GET /api/order_history/:userId
orderHistoryRouter.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;

  try {


    const response = await buildUserOrderHistoryObject(userId)

    res.send(response)

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
  const {userId} = req.body;
  
  try {
    
    const orderHistory = await submitUserCartByUserId(userId)
    console.log("new order history is: ", orderHistory)
    res.send(orderHistory)
  
  } catch (error) {
    res.send({
      name: 'Categories Error',
      message: `API Unable to add user cart to Order History`,
      });
    next(error);
  }
});

//PATCH /api/order_history/:orderHistoryId /// RACHAEL STILL NEED TO LOOK OVER
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
