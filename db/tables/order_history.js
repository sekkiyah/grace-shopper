const client = require('../client');
const { deleteOrderDetailsByOrderId } = require('./order_details');
const { getOrderDetailsByOrderId } = require('./order_details');

async function createOrderHistory({ userId, status, total, dateOrdered }) {
  try {
    const {
      rows: [order_history],
    } = await client.query(
      `
        INSERT INTO order_history("userId", status, total, "dateOrdered")
        VALUES ($1, $2, $3, $4)
        RETURNING *;`,
      [userId, status, total, dateOrdered]
    );

    return order_history;
  } catch (error) {
    console.error('Error creating order history');
    throw error;
  }
}

async function buildOrderHistoryObject(orderId) {
  try {
    let currentOrder = await getOrderHistoryById(orderId);
    currentOrder.orderDetails = await getOrderDetailsByOrderId(orderId);

    return currentOrder;
  } catch (error) {
    console.error('Error building order history object');
    throw error;
  }
}

async function buildUserOrderHistoryObject(userId) {
  try {
    let userOrderHistory = await getOrderHistoryByUserId(userId);
    let returnObj = await Promise.all(userOrderHistory.map(order => buildOrderHistoryObject(order.id)));

    return returnObj;
  } catch (error) {
    console.error('Error building user order history object');
    throw error;
  }
}

async function buildAllOrderHistoriesObject() {
  try {
    let orders = await getAllOrderHistories();

    let returnObj = await Promise.all(orders.map(order => buildOrderHistoryObject(order.id)));

    return returnObj;
  } catch (error) {
    console.error('Error building all order histories object');
    throw error;
  }
}

async function getOrderHistoryByUserId(userId) {
  try {
    const { rows: order_history } = await client.query(
      `
        SELECT *
        FROM order_history
        WHERE "userId"=$1;`,
      [userId]
    );

    return order_history;
  } catch (error) {
    console.error("Error getting order history by 'userId'");
    throw error;
  }
}

async function getAllOrderHistories() {
  try {
    const { rows: order_histories } = await client.query(
      `
        SELECT *
        FROM order_history;`
    );

    return order_histories;
  } catch (error) {
    console.error('Error getting all order histories');
    throw error;
  }
}

async function getOrderHistoryById(id) {
  try {
    const {
      rows: [order_history],
    } = await client.query(`
        SELECT * FROM order_history
        WHERE id=${id};`);

    return order_history;
  } catch (error) {
    console.error("Error getting order history by 'userId'");
    throw error;
  }
}

async function updateOrderHistory({ id, ...fields }) {
  try {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(', ');

    const {
      rows: [updatedOrder],
    } = await client.query(
      `
        UPDATE order_history
        SET ${setString}
        WHERE id=${id}
        RETURNING *;`,
      Object.values(fields)
    );

    return updatedOrder;
  } catch (error) {
    console.error('Error updating order history');
    throw error;
  }
}

async function deleteOrderHistoryById(id) {
  try {
    await deleteOrderDetailsByOrderId(id);
    const { rows: deletedOrderHistory } = await client.query(
      `
        DELETE FROM order_history
        WHERE id=${id}
        RETURNING *;`
    );

    return deletedOrderHistory;
  } catch (error) {
    console.error('Error deleting order history');
    throw error;
  }
}

async function deleteOrderHistoriesByUserId(userId) {
  try {
    const orders = await getOrderHistoryByUserId(userId);

    if (orders && orders.length) {
      //Delete the order detail dependencies
      orders.forEach(order => {
        order.orderDetails = deleteOrderDetailsByOrderId(order.id);
        return order;
      });

      await client.query(`
        DELETE FROM order_history
        WHERE "userId"=${userId}
        RETURNING *;`);

      return orders;
    }
  } catch (error) {
    console.error('Error deleting order history by user id');
    throw error;
  }
}

module.exports = {
  createOrderHistory,
  getOrderHistoryByUserId,
  getAllOrderHistories,
  updateOrderHistory,
  deleteOrderHistoryById,
  deleteOrderHistoriesByUserId,
  getOrderHistoryById,
  buildUserOrderHistoryObject,
  buildAllOrderHistoriesObject,
};
