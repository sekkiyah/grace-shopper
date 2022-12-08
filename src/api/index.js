// const BASE_URL = 'http://localhost:3001/api';
const BASE_URL = 'https://occult-outlet-api.onrender.com/api';

const createHeaders = token => {
  return token
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    : {
        'Content-Type': 'application/json',
      };
};

//USERS

export const getAllUsers = async token => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/users`, {
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (username, password) => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        username,
        password,
      }),
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const getUserInfo = async token => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/users/me`, {
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const registerUser = async (email, username, password) => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (token, { id, ...userObj }) => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(userObj),
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (token, userId) => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'DELETE',
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

//PRODUCTS
export const getAllProducts = async () => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/products`, {
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async productId => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/products/${productId}`, {
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (token, { id, ...product }) => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(product),
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const createNewProduct = async (token, product) => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers,
      body: JSON.stringify(product),
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (token, productId) => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/products/${productId}`, {
      method: 'DELETE',
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

//CATEGORIES
export const getAllCategories = async () => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/categories`, {
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const createNewCategory = async name => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/categories`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name,
      }),
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const updateCategory = async (token, updatedCategory) => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/categories`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(updatedCategory),
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategory = async (token, categoryId) => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/categories/${categoryId}`, {
      method: 'DELETE',
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

//PROMO CODES
export const getPromoCodes = async () => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/promo_codes`, {
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const createNewPromoCode = async promoCode => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/promo_codes`, {
      method: 'POST',
      headers,
      body: JSON.stringify(promoCode),
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const updatePromoCode = async (token, { id, ...promoCode }) => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/promo_codes/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(promoCode),
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const deletePromoCode = async (token, promoCodeId) => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/promo_codes/${promoCodeId}`, {
      method: 'DELETE',
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

//ORDER HISTORY
export const getAllUsersOrderHistories = async token => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/order_history`, {
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const getUsersOrderHistory = async (token, userId) => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/order_history/${userId}`, {
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};


export const addOrCreateUsersOrderHistory = async (token, userId) => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/order_history`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        userId,
      }),
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const updateOrderHistory = async (token, { id, ...orderHistory }) => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/order_history/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(orderHistory),
    }).then(response => response.json());
  } catch (error) {
    console.error('error updating order history');
  }
};

export const deleteOrderHistoryByOrderId = async (token, orderHistoryId) => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/order_history/${orderHistoryId}`, {
      method: 'DELETE',
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error('error deleting order history by order id');
  }
};

export const deleteOrderHistoryByUserId = async (token, userId) => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/order_history/user_history/${userId}`, {
      method: 'DELETE',
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error('error deleting order history by user Id');
  }
};

//USER CART
export const getUserCart = async (token, userId) => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/users/cart/${userId}`, {
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};
export const addProductToCart = async (token, product) => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/users/cart`, {
      method: 'POST',
      headers,
      body: JSON.stringify(product),
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const updateProductQuantityInCart = async (token, product) => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/users/cart`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(product)
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const clearUserCart = async (token, { userId }) => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/users/cart/clear`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({
        userId,
      }),
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const deleteProductFromCart = async (token, product) => {
  try {
      const headers = createHeaders(token);
      return await fetch(`${BASE_URL}/users/cart`, {
        method: 'DELETE',
        headers,
        body: JSON.stringify(product)
      }).then(response => response.json());
  
    } catch (error) {
      console.error(error);
    }
  };
  
//PRODUCT CATEGORIES

export const createProductCategory = async (token, productCategory) => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/product_categories`, {
      method: 'POST',
      headers,
      body: JSON.stringify(productCategory),
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};

export const deleteProductCategory = async (token, productCategory) => {
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/product_categories`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(productCategory),
    }).then(response => response.json());
  } catch (error) {
    console.error(error);
  }
};
