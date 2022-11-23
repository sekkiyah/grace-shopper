const client = require('../client');

async function createOrderDetails({ orderId, productId, quantity, price }) {
  try {
    const {
      rows: [order_details],
    } = await client.query(
      `
      INSERT INTO order_details("orderId", "productId", quantity, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;`,
      [orderId, productId, quantity, price]
    );

    return order_details;
  } catch (error) {
    console.error('Error creating order details');
    throw error;
  }
}

async function getOrderDetailsByOrderId(orderId) {
  try {
    const { rows: order_details } = await client.query(`
      SELECT *
      FROM order_details
      WHERE "orderId"=${orderId};`);

    return order_details;
  } catch (error) {
    console.error("Error getting order details by 'orderId'");
    throw error;
  }
}

async function updateOrderDetailsByOrderId({ orderId, ...fields }) {
  try {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(', ');

    if (setString.length) {
      const {
        rows: [order_detail],
      } = await client.query(
        `
        UPDATE order_details
        SET ${setString}
        WHERE "orderId"=${orderId}
        RETURNING *;`,
        Object.values(fields)
      );

      return order_detail;
    } else {
      return await getOrderDetailsByOrderId(orderId);
    }
  } catch (error) {
    console.error('Error updating order details');
    throw error;
  }
}

async function deleteOrderDetailsByOrderId(orderId) {
  try {
    const { rows: deletedOrderDetails } = await client.query(`
      DELETE FROM order_details
      WHERE "orderId"=${orderId}
      RETURNING *;`);

    return deletedOrderDetails;
  } catch (error) {
    console.error('Error deleting order details');
    throw error;
  }
}

module.exports = {
  createOrderDetails,
  getOrderDetailsByOrderId,
  updateOrderDetailsByOrderId,
  deleteOrderDetailsByOrderId,
};
