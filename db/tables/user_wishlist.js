const client = require('../client');

async function createUserWishlist({ userId, productId }) {
    try {
        const { rows: [user_wishlist] } = await client.query(`
            INSERT INTO user_cart("userId", "productId")
            VALUES ($1, $2)
            RETURNING *;
        `, [userId, productId]);

        return user_wishlist;

    } catch (error) {
        console.error('Error creating user wishlist');
        console.error(error);
    }
};

async function getUserWishlistByUserId(userId){
    try {
        const {rows: [user_wishlist]} = await client.query(`
        SELECT *
        FROM user_wishlist
        WHERE "userId"=$1;
        `, [userId]);

        return user_wishlist;

    } catch (error) {
        console.error("Error getting user wishlist by 'userId'");
        console.error(error);
    }
};

async function deleteUserWishlistByUserId(userId) {
    try {
        const { rows: deletedUserWishlist } = await client.query(`
            DELETE FROM user_wishlist
            WHERE "userId"=$1
            RETURNING *;
        `, [userId]);

        return deletedUserWishlist;

    } catch (error) {
        console.error('Error deleting user wishlist');
        console.error(error);
    }
};

module.exports = {
    createUserWishlist,
    getUserWishlistByUserId,
    deleteUserWishlistByUserId
};
