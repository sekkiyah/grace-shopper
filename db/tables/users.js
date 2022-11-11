const client = require('../client');
const bcrypt = require('bcrypt');
const { getUserCartByUserId } = './user_cart.js'
const {getOrderHistoryByUserId } = './order_history.js'
const { getProductReviewsByUserId } = './product_reviews.js'
const { getUserWishlistByUserId } = './user_wishlist.js'


const createUser = async user => {
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

    return newUser;
  } catch (error) {
    console.error('error creating user')
    throw error;
  }
};

async function buildUserObject (user) {
  try {

    user.userCart = await getUserCartByUserId(user.id)
    user.orderHistory = await getOrderHistoryByUserId(user.id)
    user.productReviews = await getProductReviewsByUserId(user.id)
    user.userWishlist = await getUserWishlistByUserId(user.id)

    return user

  } catch (error) {
    console.error('error building user Object')
    throw error;
  }
}

async function getAllUsers () {
  try {
    const { rows: users } = await client.query(` 
      SELECT * FROM users;`);

      users.forEach(user => delete user.password)

      return users;


  } catch (error) {
    console.error('error getting all users')
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const _user = await getUserByUsername(username);

    const hashedPassword = _user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (isValid) {
      const {
        rows: [user]} = await client.query(` 
				SELECT * FROM users
				WHERE password = '${hashedPassword}' AND username='${username}';`);

      delete user.password;

      return await buildUserObject(user);

    } else {
      console.log('Username or password incorrect');
      throw 'Username or password incorrect';
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function getUserById(userId) {
  try {
    const {
      rows: [user]} = await client.query(` 
			SELECT * FROM users
			WHERE id = ${userId}
	  `);
    if (!user) {
      console.error('User not found');
      throw 'User not found';
    }

    delete user.password;

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const { rows: [user]} = await client.query(` 
			SELECT * 
      FROM users
			WHERE username=$1;
	  `, [username]);

    if (!user) {
      console.error('User not found');
      throw 'User not found';
    }

    return user;
  } catch (error) {
    console.error('error getting user by username');
    throw error;
  }
}

async function updateUser(id, fields = {}) {
  const updatedColumns = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');

  if (updatedColumns.length === 0) {
    return;
  }

  try {
    const {
      rows: [user]} = await client.query(
      `
      UPDATE users
      SET ${updatedColumns}
      WHERE id=${id}
      RETURNING *;`,
      Object.values(fields)
    );

    return user;
  } catch (error) {
    console.error('Error updating User');
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const { rows: [user]} = await client.query(`
	  	DELETE FROM users WHERE users.id = ${id}
	 		RETURNING *;`);

    return user;
  } catch (error) {
    console.error('Error deleting User');
    throw error;
  }
}


module.exports = {
  createUser,
  getUser,
  getUserByUsername,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers
};
