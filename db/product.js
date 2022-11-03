const client = require('./client');

async function createProduct({ title, description }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      INSERT INTO products(title, description)
      VALUES ($1, $2)
      RETURNING *;
    `,
      [title, description]
    );

    return product;
  } catch (err) {
    console.error('Error creating product');
    console.error(err);
  }
}

module.exports = {
  createProduct,
};
