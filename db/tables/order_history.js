const client = require('../client');

async function createOrderHistory ({userId, status, total, dateOrdered}) {
    try {
        const { rows: [order_history] } = await client.query(`
            INSERT INTO order_history("userId", status, total, "dateOrdered")
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [userId, status, total, dateOrdered]);

        return order_history;

    } catch (error) {
        console.error('Error creating order history');
        throw error;
    }
};

async function getOrderHistoryByUserId(userId){
    try {
        const {rows: [order_history]} = await client.query(`
        SELECT *
        FROM order_history
        WHERE "userId"=$1;
        `, [userId]);

        return order_history;

    } catch (error) {
        console.error("Error getting order history by 'userId'");
        throw error;
    }
};

async function getAllOrderHistories (id) {
    try {
        const {rows: [order_histories]} = await client.query(`
        SELECT *
        FROM order_history
        WHERE id=$1;
        `, [id]);

        return order_histories;

    } catch (error) {
        console.error("Error getting all order histories");
        throw error;
    }
};

async function updateOrderHistory ({id, ...fields}) {
    const { update } = fields;

    const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

    try {
        if(setString.length > 0){
            await client.query(`
            UPDATE order_history
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
            `, Object.values(fields));
        }
        if(update === undefined){
            return await getOrderHistoryById(id);
        }
    } catch (error) {
        console.error('Error updating order history');
        throw error;
    }
};

async function deleteOrderHistoryById (id) {
    try {
        const { rows: deletedOrderHistory } = await client.query(`
            DELETE FROM order_history
            WHERE id=$1
            RETURNING *;
        `, [id]);

        return deletedOrderHistory;

    } catch (error) {
        console.error('Error deleting order history');
        throw error;
    }
};

module.exports = {
    createOrderHistory,
    getOrderHistoryByUserId,
    getAllOrderHistories,
    updateOrderHistory,
    deleteOrderHistoryById
};
