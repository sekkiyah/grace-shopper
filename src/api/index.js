const BASE_URL = 'http://localhost:3000/api';

const createHeaders = jwt => {
  return jwt
    ? {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    }
    : {
      'Content-Type': 'application/json',
    };
};

//USER:


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
  } catch (err) {
    console.error(err);
  }
};

export const getUserInfo = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })

    const results = await response.json();
    return results;
  } catch (error) {
    console.error('Error getting user information.')
  }
}

export const registerUser = async (email, username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password
      })
    })
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error registering user.')
  }
}

export const updateUser = async (userId, userObj={}) => {
  const headers = createHeaders();
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "POST",
      headers,
      body: JSON.stringify(userObj)
    })
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating user.')
  }
}

export const deleteUser = async (userId) => {
  const headers = createHeaders();
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "DELETE",
      headers,
    })
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error deleting user.')
  }
}

//PRODUCTS:

export const getProducts = async () => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/products`, {
      headers
    }).then(response => response.json());
  } catch (err) {
    console.error('Error getting products.')
  }
};

export const getProductById = async (productId) => {
  const headers = createHeaders();
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      headers,
    });
    const results = await response.json();
    return results;

  } catch (err) {
    console.error('Error getting product by ID.')
  }
};

export const updateProduct = async (token, product, productId) => {
  const headers = createHeaders();
  try {
    const headers = createHeaders(token);
    return await fetch(`${BASE_URL}/products/${productId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        product
      })
    }).then(response => response.json());
  } catch (err) {
    console.error('Error updating product.')
  }
};

export const createNewProduct = async (token, product) => {
  const headers = createHeaders();
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        product
      })
    })
    const result = await response.json();

    return result

  } catch (error) {
    console.error('Error creating new product.')
  }
};

export const deleteProduct = async (token, productId) => {
  const headers = createHeaders();
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "DELETE",
      headers,
    })
    const result = await response.json();

    return result

  } catch (error) {
    console.log('Error deleting product')
  }
};

//CATEGORIES:

export const getCategories = async () => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/categories`, {
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error('Error getting all categories front end API call');
  }
};

export const createNewCategory = async (name) => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/categories`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name
      })
    }).then(response => response.json());
  } catch (error) {
    console.error('error, unable to create new category')
  }
}


export const updateCategory = async (token, categoryId, newName) => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/categories/${categoryId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        newName,
      })
    }).then(response => response.json());
  } catch (error) {
    console.error('error, unable to update category')
  }
}

export const deleteCategory = async (token, categoryId) => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/categories/${categoryId}`, {
      method: "DELETE",
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.log('error deleting category')
  }
}

//PROMO CODES:

export const getPromoCodes = async () => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/promo_codes`, {
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error('Error getting all promo codes front end API call');
  }
};

export const createNewPromoCode = async (promoCode) => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/promo_codes`, {
      method: "POST",
      headers,
      body: JSON.stringify(promoCode)
    }).then(response => response.json());
  } catch (error) {
    console.error('error, unable to create new promo code')
  }
}

export const updatePromoCode = async (token, promoCodeId, updatedPromoCode = {}) => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/promo_codes/${promoCodeId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(updatedPromoCode)
    }).then(response => response.json());
  } catch (error) {
    console.error('error, unable to update promo code')
  }
}

export const deletePromoCode = async (token, promoCodeId) => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/promo_codes/${promoCodeId}`, {
      method: "DELETE",
      headers,
    })
    const result = await response.json();

    return result

  } catch (error) {
    console.log('error deleting promo code')
  }
}

//ORDER HISTORY:

export const getAllUsersOrderHistories = async (token) => {
  const headers = createHeaders();
  try {
    return await fetch(`${BASE_URL}/order_history`, {
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error('Error getting all users order histories front end API call');
  }
};

export const getUsersOrderHistory = async (userId) => {
  const headers = createHeaders();
  try {
    return await fetch(`${BASE_URL}/order_history/${userId}`, {
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error('Error getting all users order histories front end API call');
  }
};

export const addOrCreateUsersOrderHistory = async (userId) => {
  const headers = createHeaders();
  try {
    const response = await fetch(`${BASE_URL}/order_history`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          userId,
        })
    })

    const result = await response.json();

    return result

} catch (error) {
    console.error('error, unable to create User Order History')
}
};

export const updateOrderHistory = async (token, orderHistoryId, newOrderHistoryObj = {}) => {
  const headers = createHeaders();
  try {
      const response = await fetch(`${BASE_URL}/order_history/${orderHistoryId}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify(newOrderHistoryObj)
      })
      const result = await response.json();

      return result

  } catch (error) {
      console.error('error, unable to update order history')
  }
}

export const deleteOrderHistoryByOrderId = async (token, orderHistoryId) => {
  const headers = createHeaders();
  try {
      const response = await fetch(`${BASE_URL}/order_history/${orderHistoryId}`, {
      method: "DELETE",
      headers,
    }).then(response => response.json());
  } catch (error) {
      console.log('error deleting order history by order id')
  }
}

export const deleteOrderHistoryByUserId = async (token, UserId) => {
  const headers = createHeaders();
  try {
      const response = await fetch(`${BASE_URL}/order_history/user_history/${userId}`, {
      method: "DELETE",
      headers,
      })
      const result = await response.json();

      return result

  } catch (error) {
      console.log('error deleting order history by user id')
  }
}

//USER CART
export const addProductToCart = async (token, userId, productId, quantity) => {
  const headers = createHeaders();
  try {
      const response = await fetch(`${BASE_URL}/users/usersCart/AddProduct/${userId}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            userId,
            productId,
            quantity
          })
      })
      const result = await response.json();

      return result

  } catch (error) {
      console.error('error, unable to add item to users cart')
  }
}

export const updateProductQuantityInCart = async (token, userId, productId, quantity) => {
  const headers = createHeaders();
  try {
      const response = await fetch(`${BASE_URL}/users/usersCart/UpdateCart/${userId}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            userId,
            productId,
            quantity
          })
      })
      const result = await response.json();

      return result

  } catch (error) {
      console.error('error, unable to update item quantity in users cart')
  }
}

export const deleteProductFromCart = async (token, userId, productId) => {
  const headers = createHeaders();
  try {
      const response = await fetch(`${BASE_URL}/users/usersCart/DeleteProduct/${userId}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            userId,
            productId
          })
      })
      const result = await response.json();

      return result

  } catch (error) {
      console.error('error, unable to product from users cart')
  }
}

