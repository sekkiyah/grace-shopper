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
