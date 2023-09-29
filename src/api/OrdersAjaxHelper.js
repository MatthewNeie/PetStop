const BASE_URL = 'http://localhost:3000/api';


export const fetchOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const result = await response.json();
      console.log(result);
      return result.orders;
    } catch (err) {
      console.error(err);
    }
  }

  export const fetchOrderById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/orders/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        });
        const result = await response.json();
        console.log(result);
        return result.orders;
    } catch (err) {
        console.error(err);
    }
}

export const fetchOrderByDate = async (date) => {
    try {
        const response = await fetch(`${BASE_URL}/orders/${date}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        });
        const result = await response.json();
        console.log(result);
        return result.orders;
    } catch (err) {
        console.error(err);
    }
}

export const fetchOrderByUserId = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/orders/${userId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        });
        const result = await response.json();
        console.log(result);
        return result.orders;
    } catch (err) {
        console.error(err);
    }
}

export const fetchOrderByTrackingNumber = async (trackingNumber) => {
    try {
        const response = await fetch(`${BASE_URL}/orders/${trackingNumber}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        });
        const result = await response.json();
        console.log(result);
        return result.orders;
    } catch (err) {
        console.error(err);
    }
}

export const createOrder = async (orderObj) => {
    try {
        const response = await fetch(`${BASE_URL}/orders/neworder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "date": orderObj.date,
              "createdAt": orderObj.createdAt,
              "productId": orderObj.productId,
              "userId": orderObj.userId,
              "trackingNumber": orderObj.trackingNumber,
            })
        });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const updateOrder = async (orderObj, orderId) => {
    try {
        const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "date": orderObj.date,
              "createdAt": orderObj.createdAt,
              "productId": orderObj.productId,
              "userId": orderObj.userId,
              "trackingNumber": orderObj.trackingNumber,
            })
        });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const deleteOrder = async (orderId) => {
    try {
        const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authentication': `Bearer ${token}`
        }});
        const result = await response.json();
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
    }
}
