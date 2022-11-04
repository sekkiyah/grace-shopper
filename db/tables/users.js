const client = require('../client');

const createUser = async user => {
  try {
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

module.exports = {
  createUser,
};
