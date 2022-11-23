const BASE_URL = '';

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

export const login = async (username, password) => {
  const headers = createHeaders();
  try {
    return await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        username,
        password,
      }),
    }).then(response => response.json());
  } catch (err) {
    console.error(err);
  }
};

//PRODUCTS:

export const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const results = await response.json();
    return results;

  } catch (err) {
    console.log('Error getting products')
  }
};

export const updateProduct = async (token, product) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        product
      })
    })
    const results = response.json();

    return results
  } catch (err) {
    console.log('Error updating product.')
  }
};

//CATEGORIES:

export const getCategories = async () => {
  const headers = createHeaders();
  try {
    return await fetch(`${BASE_URL}/categories`, {
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error('Error getting all categories front end API call');
  }
};

export const createNewCategory = async (name) => {
  const headers = createHeaders();
  try {
      const response = await fetch(`${baseURL}/categories`, {
          method: "POST",
          headers,
          body: JSON.stringify({
              name
          })
      })
      const result = await response.json();

      return result

  } catch (error) {
      console.error('error, unable to create new category')
  }
}

export const updateCategory = async (categoryId, newName) => {
  const headers = createHeaders();
  try {
      const response = await fetch(`${baseURL}/categories/${categoryId}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify({
              newName,
          })
      })
      const result = await response.json();

      return result

  } catch (error) {
      console.error('error, unable to update category')
  }
}

export const deleteCategory = async (categoryId) => {
  const headers = createHeaders();
  try {
      const response = await fetch(`${baseURL}/categories/${categoryId}`, {
      method: "DELETE",
      headers,
      })
      const result = await response.json();

      return result

  } catch (error) {
      console.log('error deleting category')
  }
}

//PROMO CODES:

export const getPromoCodes = async () => {
  const headers = createHeaders();
  try {
    return await fetch(`${BASE_URL}/promo_codes`, {
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.error('Error getting all promo codes front end API call');
  }
};

export const createNewPromoCode = async ({promoCode}) => {
  const headers = createHeaders();
  try {
      const response = await fetch(`${baseURL}/promo_codes`, {
          method: "POST",
          headers,
          body: JSON.stringify(promoCode)
      })

      const result = await response.json();

      return result

  } catch (error) {
      console.error('error, unable to create new promo code')
  }
}

export const updatePromoCode = async (promoCodeId, {newPromoCodeObj}) => {
  const headers = createHeaders();
  try {
      const response = await fetch(`${baseURL}/promo_codes/${promoCodeId}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify(newPromoCodeObj)
      })
      const result = await response.json();

      return result

  } catch (error) {
      console.error('error, unable to update promo code')
  }
}

export const deletePromoCode = async (promoCodeId) => {
  const headers = createHeaders();
  try {
      const response = await fetch(`${baseURL}/promo_codes/${promoCodeId}`, {
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

export const getAllUsersOrderHistories = async () => {
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
    const response = await fetch(`${baseURL}/order_history`, {
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

export const updateOrderHistory = async (orderHistoryId, {newOrderHistoryObj}) => {
  const headers = createHeaders();
  try {
      const response = await fetch(`${baseURL}/order_history/${orderHistoryId}`, {
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

export const deleteOrderHistoryByOrderId = async (orderHistoryId) => {
  const headers = createHeaders();
  try {
      const response = await fetch(`${baseURL}/order_history/${orderHistoryId}`, {
      method: "DELETE",
      headers,
      })
      const result = await response.json();

      return result

  } catch (error) {
      console.log('error deleting order history by order id')
  }
}

export const deleteOrderHistoryByUserId = async (UserId) => {
  const headers = createHeaders();
  try {
      const response = await fetch(`${baseURL}/order_history/user_history/${userId}`, {
      method: "DELETE",
      headers,
      })
      const result = await response.json();

      return result

  } catch (error) {
      console.log('error deleting order history by user id')
  }
}


