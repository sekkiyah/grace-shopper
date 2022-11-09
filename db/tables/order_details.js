const client = require('../client');

async function createOrderDetails ({orderId, productId, quantity, price}) {
    try {
        const { rows: [order_details] } = await client.query(`
            INSERT INTO order_details("orderId", "productId", quantity, price)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [orderId, productId, quantity, price]);

        return order_details;

    } catch (error) {
        console.error('Error creating order details');
        console.error(error);
    }
};

async function getOrderDetailsByOrderId(orderId){
    try {
        const {rows: [order_details]} = await client.query(`
        SELECT *
        FROM order_history
        WHERE "orderId"=$1;
        `, [orderId]);

        return order_details;

    } catch (error) {
        console.error("Error getting order details by 'orderId'");
        console.error(error);
    }
};

async function updateOrderDetailsByOrderId ({orderId, ...fields}) {
    const { update } = fields;

    const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

    try {
        if(setString.length > 0){
            await client.query(`
            UPDATE order_details
            SET ${setString}
            WHERE "orderId"=${orderId}
            RETURNING *;
            `, Object.values(fields));
        }
        if(update === undefined){
            return await getOrderDetailsById(orderId);
        }
    } catch (error) {
        console.error('Error updating order details');
        console.error(error);
    }
};

async function deleteOrderDetailsByOrderId (orderId) {
    try {
        const { rows: deletedOrderDetails } = await client.query(`
            DELETE FROM order_details
            WHERE "orderId"=$1
            RETURNING *;
        `, [orderId]);

        return deletedOrderDetails;

    } catch (error) {
        console.error('Error deleting order details');
        console.error(error);
    }
};

module.exports = {
    createOrderDetails,
    getOrderDetailsByOrderId,
    updateOrderDetailsByOrderId,
    deleteOrderDetailsByOrderId
};
