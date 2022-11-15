const client = require('../client');
const {getProductById} = require('./products')



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
        throw error;
    }
};

//BUILD USER CART OBJ THAT GIVES INDIVIDUAL PRODUCT DETAILS FROM PRODUCTS TABLE
//TO BE CALLED IN CHECKOUT OR TO VIEW CART - DON'T ADD TO USER OBJ

async function buildUserCartObj (userId) {
    const usersCart = await getUserCartByUserId(userId)
    const userCartObj = await Promise.all(usersCart.map(item => getProductById(item.productId)))
    return userCartObj
}

async function checkOutCart (userId) {
    try {
        const usersCartObj = await buildUserCartObj(userId) //are we sure we need this here??
        const usersCart = await getUserCartByUserId(userId)
        usersCart.forEach(async(product) => {
            const currentProduct = await getProductById(product.productId)
            if (currentProduct.inventory < product.quantity) {
                console.error('Decrease item quantity, it is higher than inventory on hand')
                throw error;
            }
            const newInventory = currentProduct.inventory - product.quantity
            await client.query(`
              UPDATE products
              SET inventory=${newInventory}
              WHERE id=${product.productId}
              RETURNING *;
              `,);
        });

        deleteCartByUserId(userId)

    } catch (error) {
        console.error('Error deleting cart and updating products inventory');
        throw error;
    }
}

module.exports = {
    getUserCartByUserId,
    deleteCartByUserId,
    checkOutCart,
    buildUserCartObj
};
