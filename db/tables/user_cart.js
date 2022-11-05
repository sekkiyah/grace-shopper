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

async function getUserCartById(id){
    try {
        const {rows: [user_cart]} = await client.query(`
        SELECT *
        FROM user_cart
        WHERE id=$1;
        `, [id]);

        return user_cart;

    } catch (error) {
        console.error("Error getting user cart by id");
        console.error(error);
    }
}

async function updateUserCart({id, ...fields}) {
    const { update } = fields;

    const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

    try {
        if(setString.length > 0){
            await client.query(`
            UPDATE user_cart
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
            `, Object.values(fields));
        }
        if(update === undefined){
            return await getUserCartById(id);
        }
    } catch (error) {
        console.error('Error updating user cart');
        console.error(error);
    }
};

async function deleteUserCart(id) {
    try {
        const { rows: deletedUserCart } = await client.query(`
            DELETE FROM user_cart
            WHERE id=$1
            RETURNING *;
        `, [id]);

        return deletedUserCart;

    } catch (error) {
        console.error('Error deleting user cart');
        console.error(error);
    }
};

module.exports = {
    createUserCart,
    getUserCartById,
    updateUserCart,
    deleteUserCart
};
