const client = require('./client');
const { createUser, createProduct, createProductImage, createProductReview } = require('./tables');
const { generateUsers, generateProducts, generateProductImages, generateFakeProductReviews } = require('./testData');

async function dropTables() {
  try {
    console.log('Dropping tables...');
    await client.query(`
      DROP TABLE IF EXISTS promo_codes;
      DROP TABLE IF EXISTS user_wishlist;
      DROP TABLE IF EXISTS order_details;
      DROP TABLE IF EXISTS order_history;
      DROP TABLE IF EXISTS product_categories;
      DROP TABLE IF EXISTS categories;
      DROP TABLE IF EXISTS product_images;
      DROP TABLE IF EXISTS user_cart;
      DROP TABLE IF EXISTS product_reviews;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
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
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false,
        "firstName" VARCHAR(255),
        "lastName" VARCHAR(255),
        "isBanned" BOOLEAN DEFAULT false,
        "passwordResetRequired" BOOLEAN DEFAULT false
      );
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255) NOT NULL,
        price DECIMAL(255,2) NOT NULL,
        inventory INTEGER NOT NULL,
        "thumbnailImage" VARCHAR(255)
      );
      CREATE TABLE product_reviews(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "userId" INTEGER REFERENCES users(id),
        rating INTEGER CHECK(rating BETWEEN 1 AND 5) NOT NULL,
        title VARCHAR(255),
        content VARCHAR,
        UNIQUE ("productId", "userId")
      );
      CREATE TABLE user_cart(
        "userId" INTEGER REFERENCES users(id),
        "productId" INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL,
        UNIQUE ("userId", "productId")
      );
      CREATE TABLE product_images(
        "productId" INTEGER REFERENCES products(id),
        "imageURL" VARCHAR NOT NULL
      );
      CREATE TABLE categories(
        id SERIAL PRIMARY KEY,
        name VARCHAR UNIQUE NOT NULL
      );
      CREATE TABLE product_categories(
        "productId" INTEGER REFERENCES products(id),
        "categoryId" INTEGER REFERENCES categories(id),
        UNIQUE ("productId", "categoryId")
      );
      CREATE TABLE order_history(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        status VARCHAR NOT NULL,
        total DECIMAL (255,2) NOT NULL,
        "dateOrdered" DATE NOT NULL
      );
      CREATE TABLE order_details(
        "orderId" INTEGER REFERENCES order_history(id),
        "productId" INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL,
        price DECIMAL (255,2) NOT NULL,
        UNIQUE ("orderId", "productId")
      );
      CREATE TABLE user_wishlist(
        "userId" INTEGER REFERENCES users(id),
        "productId" INTEGER REFERENCES products(id),
        UNIQUE ("userId", "productId")
      );
      CREATE TABLE promo_codes(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        code VARCHAR UNIQUE NOT NULL,
        "flatDiscount" DECIMAL (255,2),
        "percentDiscount" INTEGER
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
    const usersToCreate = await generateUsers(10);
    const users = await Promise.all(usersToCreate.map(user => createUser(user)));

    console.log('Users created:');
    // console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log('Starting to create products...');

    const productsToCreate = await generateProducts(10);
    const products = await Promise.all(productsToCreate.map(product => createProduct(product)));
    console.log('Products created:');
    console.log(products);

    await createInitialProductImages(products);
    console.log('Product Images created:');
    // console.log(productImages);

    const reviews = await createInitialProductReviews(products);
    console.log('Product Reviews created:');
    console.log(reviews);

    console.log('Finished creating products');
  } catch (error) {
    console.error('Error creating products');
    throw error;
  }
}

async function createInitialProductImages(products) {
  try {
    for (let x = 0; x < products.length; x++) {
      let randomNum = Math.ceil(Math.random() * 2);
      let productImages = await generateProductImages(randomNum, products[x].id);
      if (productImages.length) {
        await Promise.all(productImages.map(imageObj => createProductImage(imageObj)));
      }
    }
  } catch (err) {
    console.error('Error creating product images');
    throw err;
  }
}

async function createInitialProductReviews(products) {
  try {
    const productReviews = await generateFakeProductReviews(10);
    const result = await Promise.all(
      productReviews.map(review => {
        review.productId = Math.ceil(Math.random() * products.length);
        review.userId = Math.ceil(Math.random() * 10);
        return createProductReview(review);
      })
    );
    return result;
  } catch (err) {
    console.error('Error creating product images');
    throw err;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
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
