const client = require('./client');
const { createProduct } = require('./product');

async function dropTables() {
  try {
    console.log('Dropping tables...');
    await client.query(`
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS user_cart;
      DROP TABLE IF EXISTS product_images;
    `);
  } catch (err) {
    console.error('Error during dropTables');
    throw err;
  }
}

async function createTables() {
  try {
    console.log('Building tables...');
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL
      );
      CREATE TABLE user_cart(
        userId INT REFERENCES users,
        productId INT REFERENCES products,
      );
      CREATE TABLE product_images(
        productId INT REFERENCES products,
        imageURL VARCHAR(255) UNIQUE NOT NULL
      );
    `);
  } catch (err) {
    console.error('Error during dropTables');
    throw err;
  }
}

async function createInitialUsers() {
  console.log('Starting to create users...');
  try {
    const usersToCreate = [
      { username: 'albert', password: 'bertie99' },
      { username: 'sandra', password: 'sandra123' },
      { username: 'glamgal', password: 'glamgal123' },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log('Starting to create products...');

    const productsToCreate = [];
    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log('Products created:');
    console.log(products);

    console.log('Finished creating products');
  } catch (error) {
    console.error('Error creating products');
    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    // await createInitialUsers();
    // await createInitialProducts();
  } catch (err) {
    console.error('Error during rebuildDB');
    throw err;
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
