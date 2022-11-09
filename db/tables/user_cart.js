const client = require('../client');

async function createUserCart({ userId, productId, quantity }) {
    try {
        const { rows: [user_cart] } = await client.query(`
            INSERT INTO user_cart("userId", "productId", quantity)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [userId, productId, quantity]);

        return user_cart;

    } catch (error) {
        console.error('Error creating user cart');
        console.error(error);
    }
};

async function getUserCartByUserId(userId){
    try {
        const {rows: [user_cart]} = await client.query(`
        SELECT *
        FROM user_cart
        WHERE "userId"=$1;
        `, [userId]);

        return user_cart;

    } catch (error) {
        console.error("Error getting user cart by 'userId'");
        console.error(error);
    }
};

async function updateUserCart({userId, ...fields}) {
    const { update } = fields;

    const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

    try {
        if(setString.length > 0){
            await client.query(`
            UPDATE user_cart
            SET ${setString}
            WHERE "userId"=${userId}
            RETURNING *;
            `, Object.values(fields));
        }
        if(update === undefined){
            return await getUserCartById(userId);
        }
    } catch (error) {
        console.error('Error updating user cart');
        console.error(error);
    }
};

async function deleteCartByUserId(userId) {
    try {
        const { rows: deletedUserCart } = await client.query(`
            DELETE FROM user_cart
            WHERE "userId"=$1
            RETURNING *;
        `, [userId]);

        return deletedUserCart;

    } catch (error) {
        console.error('Error deleting user cart');
        console.error(error);
    }
};

module.exports = {
    createUserCart,
    getUserCartByUserId,
    updateUserCart,
    deleteCartByUserId
};
