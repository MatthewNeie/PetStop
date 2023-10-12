const BASE_URL = 'http://localhost:3000/api';

export default async function fetchProducts() {
    try {
      const response = await fetch(`${BASE_URL}/products`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
    }
  }

export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        });
        const result = await response.json();
        console.log(result);
        return result.products;
    } catch (err) {
        console.error(err);
    }
}

export const fetchProductByPetType = async (petType) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${petType}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        });
        const result = await response.json();
        console.log(result);
        return result.products;
    } catch (err) {
        console.error(err);
    }
}

export const fetchProductByProductType = async (productType) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${productType}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        });
        const result = await response.json();
        console.log(result);
        return result.products;
    } catch (err) {
        console.error(err);
    }
}

export const createProduct = async (productObj) => {
    try {
        const response = await fetch(`${BASE_URL}/products/newproduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({
              "name": productObj.product.name,
              "description": productObj.product.description,
              "price": productObj.product.price,
              "quantity": productObj.product.quantity,
              "petType": productObj.product.petType,
              "productType": productObj.product.productType,
              "inStock": productObj.product.inStock,
              "isPopular": productObj.product.isPopular,
              "imgUrl": productObj.product.imgUrl
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

export const updateProduct = async (productObj, productId, token) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${productId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${token}`
            },
            body: JSON.stringify({
              "name": productObj.product.name,
              "description": productObj.product.description,
              "price": productObj.product.price,
              "quantity": productObj.product.quantity,
              "petType": productObj.product.petType,
              "productType": productObj.product.productType,
              "inStock": productObj.product.inStock,
              "isPopular": productObj.product.isPopular,
              "imgUrl": productObj.product.imgUrl,
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
  
export const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${productId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }});
        const result = await response.json();
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
    }
}