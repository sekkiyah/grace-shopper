const client = require('../client');
const { getProductById, updateProduct, hasSufficientProduct } = require('./products');
const { createOrderHistory } = require('./order_history');
const { createOrderDetails } = require('./order_details');

async function addItemToUserCart({ userId, productId, quantity }) {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
        INSERT INTO user_cart("userId", "productId", quantity)
        VALUES ($1, $2, $3)
        RETURNING *;`,
      [userId, productId, quantity]
    );

    return item;
  } catch (error) {
    console.error('Error adding item to user cart');
    throw error;
  }
}

async function getUserCartByUserId(userId) {
  try {
    const { rows: user_cart } = await client.query(
      `
        SELECT * FROM user_cart
        WHERE "userId"=${userId};`
    );

    return user_cart;
  } catch (error) {
    console.error("Error getting user cart by 'userId'");
    throw error;
  }
}

async function deleteUserCartByUserId(userId) {
  try {
    const { rows: deletedUserCart } = await client.query(
      `
        DELETE FROM user_cart
        WHERE "userId"=${userId}
        RETURNING *;`
    );

    return deletedUserCart;
  } catch (error) {
    console.error('Error deleting user cart');
    throw error;
  }
}

//BUILD USER CART OBJ THAT GIVES INDIVIDUAL PRODUCT DETAILS FROM PRODUCTS TABLE
//TO BE CALLED IN CHECKOUT OR TO VIEW CART - DON'T ADD TO USER OBJ

async function buildUserCartObj(userId) {
  const usersCart = await getUserCartByUserId(userId);
  const userCartObj = await Promise.all(usersCart.map(item => getProductById(item.productId)));
  return userCartObj;
}

async function submitUserCartByUserId(userId) {
  try {
    const usersCart = await getUserCartByUserId(userId);
    if (usersCart && usersCart.length) {
      const result = await Promise.all(usersCart.map(item => hasSufficientProduct(item.productId, item.quantity)));

      if (!result.includes(false)) {
        let total = 0;
        const productList = await Promise.all(
          usersCart.map(async item => {
            const {
              rows: [product],
            } = await client.query(`
              SELECT * FROM products
              WHERE id=${item.productId};
            `);

            total += product.price * item.quantity;
            const newInventory = product.inventory - item.quantity;
            await updateProduct({ id: product.id, inventory: newInventory });

            return { productId: product.id, quantity: item.quantity, price: product.price };
          })
        );

        const order = await createOrderHistory({
          userId,
          status: 'Created',
          total,
          dateOrdered: new Date().toLocaleDateString(),
        });

        await Promise.all(
          productList.map(async product => {
            await createOrderDetails({ orderId: order.id, ...product });
          })
        );

        await deleteUserCartByUserId(userId);
      } else {
        console.error('Unable to submit order, insufficient product');
        throw 'Unable to submit order, insufficient product';
      }
    } else {
      console.error('Unable to submit order, cart empty');
      throw 'Unable to submit order, cart empty';
    }
  } catch (error) {
    console.error('Error submitting user cart by user id');
    throw error;
  } finally {
    console.log('Order completed');
  }
}

module.exports = {
  addItemToUserCart,
  getUserCartByUserId,
  deleteUserCartByUserId,
  submitUserCartByUserId,
  buildUserCartObj,
};
