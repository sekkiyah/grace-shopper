const client = require('../client');
const { getProductImagesByProductId } = require('./product_images');
const { getProductReviewsByProductId } = require('./product_reviews');
const { getPromoCodesByProductId } = require('./promo_codes');
// const { buildUserCartObj } = require('./user_cart');

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
    SELECT *
    FROM products;
    `);

    const completeProductObjects = await Promise.all(products.map(async product => buildProductObject(product)));

    return completeProductObjects;
  } catch (error) {
    console.error('Error getting all products');
    throw error;
  }
}

async function createProduct(product) {
  try {
    const columnNames = Object.keys(product).join('", "');
    const valueString = Object.keys(product)
      .map((key, index) => `$${index + 1}`)
      .join();

    const {
      rows: [newProduct],
    } = await client.query(
      `
      INSERT INTO products("${columnNames}")
      VALUES (${valueString})
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `,
      Object.values(product)
    );

    return newProduct;
  } catch (error) {
    console.error('Error creating product');
    throw error;
  }
}

async function buildProductObject(product) {
  try {
    const productImages = await getProductImagesByProductId(product.id);
    if (productImages) {
      product.productImages = productImages;
    }

    const productCategories = await getCategoryByProductId(product.id);
    if (productCategories) {
      product.categories = productCategories;
    }

    const productReviews = await getProductReviewsByProductId(product.id);
    if (productReviews) {
      product.reviews = productReviews;
    }

    const promoCodes = await getPromoCodesByProductId(product.id);
    if (promoCodes) {
      product.promoCodes = promoCodes;
    }

    return product;
  } catch (error) {
    console.error('Error building product object');
    throw error;
  }
}

async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    SELECT *
    FROM products
    WHERE id=$1;
    `,
      [id]
    );

    const completeProductObject = await buildProductObject(product);

    return completeProductObject;
  } catch (error) {
    console.error('Error getting product by id');
    throw error;
  }
}

async function getProductDetailsById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(`
      SELECT *
      FROM products
      WHERE id=${id};`);

    return product;
  } catch (error) {
    console.error('Error getting product details by id');
    throw error;
  }
}

async function updateProduct({ id, ...updatedProduct }) {
  try {
    const setString = Object.keys(updatedProduct)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(', ');

    if (setString.length) {
      const {
        rows: [product],
      } = await client.query(
        `
      UPDATE products
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
      `,
        Object.values(updatedProduct)
      );

      return product;
    }
  } catch (error) {
    console.error('Error updating product');
    throw error;
  }
}

async function deleteProduct(id) {
  try {
    await client.query(
      `
    DELETE FROM promo_codes
    WHERE "productId"=$1;
    `,
      [id]
    );
    await client.query(
      `
    DELETE FROM user_wishlist
    WHERE "productId"=$1;
    `,
      [id]
    );
    await client.query(
      `
    DELETE FROM order_details
    WHERE "productId"=$1;
    `,
      [id]
    );
    await client.query(
      `
    DELETE FROM product_categories
    WHERE "productId"=$1;
    `,
      [id]
    );
    await client.query(
      `
    DELETE FROM product_images
    WHERE "productId"=$1;
    `,
      [id]
    );
    await client.query(
      `
    DELETE FROM user_cart
    WHERE "productId"=$1;
    `,
      [id]
    );
    await client.query(
      `
    DELETE FROM product_reviews
    WHERE "productId"=$1;
    `,
      [id]
    );

    const {
      rows: [deletedProduct],
    } = await client.query(
      `
    DELETE FROM products
    WHERE id=$1
    RETURNING *;
    `,
      [id]
    );

    return deletedProduct;
  } catch (error) {
    console.error('Error deleting product');
    throw error;
  }
}

// DUPLICATE OF product_categories.js createProductCategory
// async function attachProductToCategory(productId, categoryId) {
//   try {
//     const {
//       rows: [productCategory],
//     } = await client.query(
//       `
//     INSERT INTO product_categories(productId, categoryId)
//     VALUES ($1, $2)
//     RETURNING *;
//     `,
//       [productId, categoryId]
//     );

//     return productCategory;
//   } catch (error) {
//     console.error('Error attaching product to category');
//     throw error;
//   }
// }

async function getProductsByCategory(categoryName) {
  try {
    const {
      rows: [products],
    } = await client.query(
      `
    SELECT products.*, categories.name AS 'categoryName'
    FROM products
    JOIN product_categories ON products.id=product_categories."productId"
    JOIN categories ON categories.id=product_categories."categoryId"
    WHERE categories.name=$1;
    `,
      [categoryName]
    );

    return products;
  } catch (error) {
    console.error('Error getting products by category');
    throw error;
  }
}

// DUPLICATE OF user_cart.js addItemToUserCart
// async function addProductToCart(userId, productId, quantity) {
//   const product = await getProductById(productId);
//   if (product.inventory === 0) {
//     console.error('This item is out of stock');
//   } else if (product.inventory < quantity) {
//     console.error('The quantity of item is greater than current inventory');
//   } else {
//     console.log('api test', userId, productId, quantity);
//     try {
//       const {
//         rows: [userCartItem],
//       } = await client.query(
//         `
//       INSERT INTO user_cart
//       VALUES ($1, $2, $3)
//       RETURNING *;
//       `,
//         [userId, productId, quantity]
//       );

//       await buildUserCartObj(userId);

//       return userCartItem;
//     } catch (error) {
//       console.error('Error adding product to cart');
//       throw error;
//     }
//   }
// }

// DUPLICATE OF user_cart.js updateUserCart
// async function updateProductQuantityInCart(userId, productId, quantity) {
//   try {
//     const product = await getProductById(productId);
//     if (product.inventory < quantity) {
//       console.error('The quantity of item is greater than current inventory');
//     } else {
//       const { rows: updatedCartItem } = await client.query(
//         `
//         UPDATE user_cart
//         SET quantity=$3
//         WHERE "productId"=$2 AND "userId"=$1
//         RETURNING *;
//         `,
//         [userId, productId, quantity]
//       );

//       await buildUserCartObj(userId);

//       return updatedCartItem;
//     }
//   } catch (error) {
//     console.error('error updating product quantity in cart');
//     throw error;
//   }
// }

// DUPLICATE OF user_cart.js deleteUserCartByProductId
// async function deleteProductFromCart(userId, productId) {
//   try {
//     const { deletedCartProduct } = await client.query(
//       `
//     DELETE FROM user_cart
//     WHERE "productId"=$2 AND "userId"=$1
//     RETURNING *;
//     `,
//       [userId, productId]
//     );

//     await buildUserCartObj(userId);

//     return deletedCartProduct;
//   } catch (error) {
//     console.error('Error deleting product from cart');
//     throw error;
//   }
// }

async function getCategoryByProductId(productId) {
  try {
    const { rows: category } = await client.query(`
      SELECT categories.* 
      FROM categories
      JOIN product_categories ON categories.id=product_categories."categoryId"
      WHERE product_categories."productId"=${productId};`);

    return category;
  } catch (error) {
    console.error('Error getting category by productId');
    throw error;
  }
}

async function hasSufficientProduct(productId, quantity) {
  try {
    const {
      rows: [result],
    } = await client.query(`
      SELECT * FROM products
      WHERE id=${productId};`);

    if (result && result.inventory >= quantity) {
      return true;
    } else {
      console.error(`Insufficient product for "${result.name}"`);
      return false;
    }
  } catch (error) {
    console.error('Error checking product inventory');
    throw error;
  }
}

async function checkProductName(productName) {
  try {
    const {
      rows: [name],
    } = await client.query(
      `
    SELECT name 
    FROM products
    WHERE name=$1
    `,
      [productName]
    );

    return name;
  } catch (error) {
    console.error('Error checking product name');
    throw error;
  }
}

module.exports = {
  createProduct,
  getProductById,
  getProductDetailsById,
  updateProduct,
  deleteProduct,
  // deleteProductFromCart,
  // updateProductQuantityInCart,
  // attachProductToCategory,
  getProductsByCategory,
  // addProductToCart,
  getAllProducts,
  hasSufficientProduct,
  checkProductName,
};
