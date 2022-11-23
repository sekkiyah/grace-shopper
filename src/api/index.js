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

//PRODUCTS:

export const getProducts = async () => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/products`, {
      headers
    }).then(response => response.json());
  } catch (err) {
    console.log('Error getting products')
  }
};

export const updateProduct = async (token, product) => {
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
    console.log('Error updating product.')
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

export const updateCategory = async (categoryId, newName) => {
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

export const deleteCategory = async (categoryId) => {
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

export const createNewPromoCode = async ({promoCode}) => {
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

export const updatePromoCode = async (promoCodeId, {newPromoCodeObj}) => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/promo_codes/${promoCodeId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(newPromoCodeObj)
    }).then(response => response.json());
  } catch (error) {
    console.error('error, unable to update promo code')
  }
}

export const deletePromoCode = async (promoCodeId) => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/promo_codes/${promoCodeId}`, {
      method: "DELETE",
      headers,
    }).then(response => response.json());
  } catch (error) {
    console.log('error deleting promo code')
  }
}

//ORDER HISTORY:


