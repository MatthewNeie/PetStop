const BASE_URL = 'http://localhost:3000/api';

export const fetchCarts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const result = await response.json();
    console.log(result);
    return result.carts;
  } catch (err) {
    console.error(err);
  }
}

export const fetchCartById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/cart/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        return result.carts;
    } catch (err) {
        console.error(err);
    }
}

export const postCart = async ({ productId, userId }) => {
    try {
        const response = await fetch(`${BASE_URL}/cart/newcart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                                   productId, 
                                   userId
                                  })
        });
        const result = await response.json();
        console.log("post review response: ", result);
        return result.cart;
    } catch (error) {
        console.log(error.message);
    }
}

export const updateCart = async (token, cartObj) => {
    try {
      const UPDATE_CART_URL = `${BASE_URL}/cart/${cartObj.id}`;
      console.log("Update post url: ", UPDATE_CART_URL);
      const response = await fetch(UPDATE_CART_URL, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            productId: cartObj.productId,
            userId: cartObj.userId
        })
      });
      const result = await response.json();
      console.log(result);
      return result.cart;
    } catch (err) {
      console.error(err);
    }
  }

  export const deleteCart = async (token, id) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      console.log(result);
      return result.cart;
    } catch (err) {
      console.error(err);
    }
  }