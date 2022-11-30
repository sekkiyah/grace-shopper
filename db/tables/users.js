const client = require('../client');
const bcrypt = require('bcrypt');
const { buildUserCartObj, deleteUserCartByUserId, getUserCartDetailsByUserId } = require('./user_cart');
const { getOrderHistoryByUserId, deleteOrderHistoriesByUserId } = require('./order_history');
const { getProductReviewsByUserId, deleteProductReviewsByUserId } = require('./product_reviews');
const { getUserWishlistByUserId, deleteUserWishlistByUserId } = require('./user_wishlist');

async function createUser(user) {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(user.password, SALT_COUNT);

    user.password = hashedPassword;

    const columnNames = Object.keys(user).join('", "');
    const valueString = Object.keys(user)
      .map((key, index) => `$${index + 1}`)
      .join();

    const {
      rows: [newUser],
    } = await client.query(
      `
      INSERT INTO users("${columnNames}")
      VALUES (${valueString})
      RETURNING *;`,
      Object.values(user)
    );

    delete user.password;
    return newUser;
  } catch (error) {
    console.error('Error creating user');
    throw error;
  }
}

async function buildUserObject(user) {
  try {
    const userCart = await getUserCartDetailsByUserId(user.id);
    if (userCart && userCart.length) {
      user.userCart = userCart;
    }

    const orderHistory = await getOrderHistoryByUserId(user.id);
    if (orderHistory && orderHistory.length) {
      user.orderHistory = orderHistory;
    }

    const productReviews = await getProductReviewsByUserId(user.id);
    if (productReviews && productReviews.length) {
      user.productReviews = productReviews;
    }

    const userWishlist = await getUserWishlistByUserId(user.id);
    if (userWishlist && userWishlist.length) {
      user.userWishlist = userWishlist;
    }

    return user;
  } catch (error) {
    console.error('Error building user object');
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows: users } = await client.query(` 
      SELECT * FROM users;`);

    users.forEach(user => delete user.password);

    return users;
  } catch (error) {
    console.error('Error getting all users');
    throw error;
  }
}

async function loginUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(`
      SELECT * 
      FROM users
      WHERE username='${username}';
    `);

    if (user) {
      const hashedPassword = user.password;
      const isValid = await bcrypt.compare(password, hashedPassword);

      if (isValid) {
        delete user.password;
        return await buildUserObject(user);
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(` 
      SELECT * FROM users
      WHERE id = ${userId};`);

    if (user) {
      delete user.password;
      return await buildUserObject(user);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(` 
      SELECT * FROM users
      WHERE username='${username}';`);

    if (user) {
      delete user.password;
      return await buildUserObject(user);
    }
  } catch (error) {
    console.error('error getting user by username');
    throw error;
  }
}

async function checkIfUserExists(username, email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT username, email
      FROM users
      WHERE username=$1
      OR email=$2;
    `,
      [username, email]
    );

    return user;
  } catch (error) {
    console.error('Error checking if user exists');
    throw error;
  }
}

async function updateUserById(id, fields = {}) {
  const updatedColumns = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');

  if (updatedColumns.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
      UPDATE users
      SET ${updatedColumns}
      WHERE id=${id}
      RETURNING *;`,
      Object.values(fields)
    );

    if (user) {
      delete user.password;
      return await buildUserObject(user);
    }
  } catch (error) {
    console.error('Error updating User');
    throw error;
  }
}

async function deleteUserById(userId) {
  try {
    const user = await getUserById(userId);
    if (user) {
      await deleteUserCartByUserId(user.id);
      await deleteUserWishlistByUserId(user.id);
      await deleteOrderHistoriesByUserId(user.id);
      await deleteProductReviewsByUserId(user.id);

      await client.query(`
        DELETE FROM users
        WHERE id='${user.id}';`);

      return user;
    } else {
      console.error('User not found');
      throw 'User not found';
    }
  } catch (error) {
    console.error('Error deleting user');
    throw error;
  }
}

module.exports = {
  createUser,
  loginUser,
  getUserByUsername,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllUsers,
  checkIfUserExists,
};
