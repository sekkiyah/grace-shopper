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
  } catch (err) {
    console.error(err);
  }
};

async function buildUserObject (user) {
  try {
    userObj = user
    const {id} = user

    userObj.userCart = await getUserCartByUserId(id)
    userObj.orderHistory = await getOrderHistoryByUserId(id)
    userObj.productReviews = await getProductReviewsByUserId(id)
    userObj.userWishlist = await getUserWishlistByUserId(id)

    return userObj

  } catch (error) {
    console.log('error building user Object')
    throw error;
  }
}

async function getAllUsers () {
  try {
    const { rows: users } = await client.query(` 
      SELECT id, email, username, "isAdmin", "firstName", "lastName",
      "isBanned", "passwordResetRequired" FROM users;`);

      return users;


  } catch (error) {
    console.log('error getting all users')
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
        rows: [user],
      } = await client.query(` 
				SELECT * FROM users
				WHERE password = '${hashedPassword}' AND username='${username}';`);

      delete user.password;

      return await buildUserObject(user);

    } else {
      console.log('Username or password incorrect');
      throw 'Username or password incorrect';
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}


async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(` 
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
    console.log(error);
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(` 
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
    console.log(error);
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
      rows: [user],
    } = await client.query(
      `
      UPDATE users
      SET ${updatedColumns}
      WHERE id=${id}
      RETURNING *;`,
      Object.values(fields)
    );

    return user;
  } catch (error) {
    console.log('Error updating User');
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const {
      rows: [user],
    } = await client.query(`
	  	DELETE FROM users WHERE users.id = ${id}
	 		RETURNING *;`);

    return user;
  } catch (error) {
    console.log('Error deleting User');
    throw error;
  }
}

async function updateUserToAdmin(userId) {
  try {

    const {rows: [user],} = await client.query(`
    UPDATE users
    SET "isAdmin" = true
    WHERE id=${userId}};`)

    return user

  } catch (error) {
    console.log('error updating user to Admin')
  }
}

async function updateUserToIsBanned(userId) {
  try {

    const {rows: [user],} = await client.query(`
    UPDATE users
    SET "isBanned" = true
    WHERE id=${userId}};`)

    return user

  } catch (error) {
    console.log('error banning user')
  }
}

async function updateUserToResetPassword(userId) {
  try {

    const {rows: [user],} = await client.query(`
    UPDATE users
    SET ""passwordResetRequired"= true
    WHERE id=${userId}};`)

    return user

  } catch (error) {
    console.log('error requiring user to reset password')
  }
}

module.exports = {
  createUser,
  getUser,
  getUserByUsername,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
  updateUserToAdmin,
  updateUserToResetPassword,
  updateUserToIsBanned
};
