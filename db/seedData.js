const client = require('./client');
const {
  createUser,
  createProduct,
  createProductImage,
  createProductReview,
  createCategory,
  createProductCategory,
  createOrderHistory,
  createOrderDetails,
  addItemToUserCart,
} = require('./tables');
const {
  generateUsers,
  generateProducts,
  generateProductImages,
  generateFakeProductReviews,
  generateFakeCategories,
  generateFakeOrderHistories,
  generateFakeOrderDetails,
  generateFakeCartItems,
} = require('./testData');

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
        code VARCHAR NOT NULL,
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
  try {
    console.log('Starting to create users...');

    const usersToCreate = await generateUsers(50);
    const users = await Promise.all(usersToCreate.map(user => createUser(user)));

    console.log('Users created:');
    // console.log(users);
    return users;
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log('Starting to create products...');

    const productsToCreate = await generateProducts(75);
    const result = await Promise.all(productsToCreate.map(product => createProduct(product)));
    const products = result.filter(category => category); //Remove undefined values
    console.log('Products created:');
    // console.log(products);

    return products;
  } catch (error) {
    console.error('Error creating products');
    throw error;
  }
}

async function createInitialProductImages(products) {
  try {
    console.log('Starting to create product images...');

    await Promise.all(
      products.map(async product => {
        const image = await generateProductImages(product.id);
        await createProductImage(image);
        return image;
      })
    );

    console.log('Product Images created');
  } catch (err) {
    console.error('Error creating product images');
    throw err;
  }
}

async function createInitialProductReviews(users, products) {
  try {
    console.log('Starting to create product reviews...');

    const productReviews = await generateFakeProductReviews(40);
    const matrix = await buildUniqueIdMatrix(users, products, productReviews.length);

    const reviews = await Promise.all(
      productReviews.map((review, index) => {
        review.userId = matrix[index][0];
        review.productId = matrix[index][1];
        return createProductReview(review);
      })
    );

    console.log('Product Reviews created');
    // console.log(reviews);
    return reviews;
  } catch (err) {
    console.error('Error creating product reviews');
    throw err;
  }
}

async function createInitialCategories() {
  try {
    console.log('Starting to create categories...');

    const categoriesToCreate = await generateFakeCategories(10);
    const result = await Promise.all(categoriesToCreate.map(category => createCategory(category)));
    const categories = result.filter(category => category); //Remove undefined values

    console.log('Categories created:');
    // console.log(categories);

    return categories;
  } catch (err) {
    console.error('Error creating categories');
    throw err;
  }
}

async function createInitialProductCategories(products, categories) {
  try {
    const matrix = await buildUniqueIdMatrix(products, categories, 40); //Assign to 40 products

    await Promise.all(
      matrix.map(row =>
        createProductCategory({
          productId: row[0],
          categoryId: row[1],
        })
      )
    );

    console.log('Product Categories created');
  } catch (err) {
    console.error('Error creating product categories');
    throw err;
  }
}

async function createInitialUserCart(users, products) {
  try {
    console.log('Starting to create user carts...');

    const cartItems = await generateFakeCartItems(users.length * 5);
    const matrix = await buildUniqueIdMatrix(users, products, cartItems.length);

    await Promise.all(
      cartItems.map((item, index) => {
        item.userId = matrix[index][0];
        item.productId = matrix[index][1];
        addItemToUserCart(item);
      })
    );

    console.log('User Carts created');
  } catch (err) {
    console.error('Error creating product reviews');
    throw err;
  }
}

async function createInitialOrderHistories(users) {
  try {
    console.log('Starting to create order histories...');

    const orderHistories = await generateFakeOrderHistories(75);

    const result = await Promise.all(
      orderHistories.map(order => {
        const randomNum = Math.ceil(Math.random() * users.length - 1);
        order.userId = users[randomNum].id;
        return createOrderHistory(order);
      })
    );

    console.log('Order Histories created');
    return result;
  } catch (err) {
    console.error('Error creating order histories');
    throw err;
  }
}

async function createInitialOrderDetails(orderHistories, products) {
  try {
    console.log('Starting to create order details...');
    const orderDetails = await generateFakeOrderDetails(orderHistories.length * 3);
    const matrix = await buildUniqueIdMatrix(orderHistories, products, orderDetails.length);

    await Promise.all(
      orderDetails.map((orderDetail, index) => {
        orderDetail.orderId = matrix[index][0];
        orderDetail.productId = matrix[index][1];
        return createOrderDetails(orderDetail);
      })
    );

    console.log('Order Details created');
  } catch (err) {
    console.error('Error creating order details');
    throw err;
  }
}

async function buildUniqueIdMatrix(array1, array2, loopCount) {
  try {
    let loops = 0;
    let matrix = [];

    while (loops < loopCount) {
      let random1 = Math.ceil(Math.random() * array1.length - 1);
      let random2 = Math.ceil(Math.random() * array2.length - 1);
      let id1 = array1[random1].id;
      let id2 = array2[random2].id;

      let duplicateFound = false;

      for (let n = 0; n < matrix.length; n++) {
        if (matrix[n][0] === id1 && matrix[n][1] === id2) {
          duplicateFound = true;
          break;
        }
      }

      if (duplicateFound) {
        continue;
      } else {
        matrix.push([id1, id2]);
        loops++;
      }
    }

    return matrix;
  } catch (err) {
    console.error('Error during unique matrix build');
    throw err;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    const allUsers = await createInitialUsers();
    const allProducts = await createInitialProducts();
    await createInitialProductImages(allProducts);
    await createInitialProductReviews(allUsers, allProducts);
    const allCategories = await createInitialCategories();
    await createInitialProductCategories(allProducts, allCategories);
    await createInitialUserCart(allUsers, allProducts);
    const allOrderHistories = await createInitialOrderHistories(allUsers);
    await createInitialOrderDetails(allOrderHistories, allProducts);
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
