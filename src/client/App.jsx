import React from 'react';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Cart from './components/Cart';
import ProductListing from './components/ProductListing.jsx';
import FeaturedProduct from './components/FeaturedProduct';
import Footer2 from './components/Footer2';
import Register from './routes/Register';
import Login from './components/Login';
import Homepage from './components/Homepage';
import SingleProduct from './components/SingleProduct';
import AdminRegister from './components/AdminRegister';
import Reviews from './components/Reviews';
import fetchProducts from './api/ProductsAjaxHelper';
import { updateCart } from './api/CartsAjaxHelper';


function App() {

  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [userId, setUserId] = useState(null);

  const addToCart = (product) => {
    // Check if there are products in the cart
    if (cart.products === null) {
      const cartObj = {
        id: cartId,
        products: [product],
        userId: userId
      }
      setCart(cartObj);
      _updateCart(cartObj);
    }
    // Check if the product is already in the cart
    const existingProductIndex = cart.products.findIndex((item) => item.id === product.id);
    if (existingProductIndex !== -1) {
      // If the product is already in the cart, update its quantity
      const updatedCart = [...cart.products];
      updatedCart[existingProductIndex].quantity += 1;
      const cartObj = {
        id: cartId,
        products: updatedCart,
        userId: userId
      }
      setCart(cartObj);
      _updateCart(cartObj);
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      const updatedCart = [...cart.products, { ...product, quantity: 1 }];
      const cartObj = {
        id: cartId,
        products: updatedCart,
        userId: userId
      }
      setCart(cartObj);
      _updateCart(cartObj);
      console.log("updatedCart", cartObj);
    }
  }
  
  const _updateCart = async (updatedCart) => {
    
    await updateCart(token, cartObj);
    
  }
  
  const handleQuantityChange = (item, d) => {
    const ind = cart.products.indexOf(item);
    const arr = cart.products;
    arr[ind].quantity += d;
    
    if (arr[ind].quantity === 0) arr[ind].quantity = 1;
    const cartObj = {
      id: cartId,
      products: [...arr],
      userId: userId
    }
    setCart(cartObj);
    _updateCart(cartObj);
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts()
        setProducts(response)
      } catch (err) {
        console.error(err)
      }
    }
    getProducts();
  }, [])

  // const [isSearching, setIsSearching] = useState(false);


  // const handleSearch = (searchTerm) => {
  //   console.log(searchTerm)
  //   if (searchTerm != null) {

  //     setIsSearching(true)

  //   } else {

  //     setIsSearching(false)

  //   }
  //   const lowercasedSearchTerm = searchTerm.toLowerCase();
  //   const filteredProducts = products.filter((products) => {
  //     return (
  //       products.name.toLowerCase().includes(lowercasedSearchTerm) ||
  //       products.productType.toLowerCase().includes(lowercasedSearchTerm)
  //     );
  //   });


  //   setFilteredProducts(filteredProducts);
  //   console.log()
  // };

  //onSearch={handleSearch}

  // products={isSearching ? filteredProducts : products}









  return (
    <Router>
      <div className="App">
        {/* Header Component */}
        <Header />

        <Routes>
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} handleQuantityChange={handleQuantityChange}/>} />
          <Route path="/" element={<Homepage products={products} setToken={setToken} token={token}/>} />
          <Route path="/featured" element={<FeaturedProduct setToken={setToken} token={token}/>} />
          <Route path="/reviews" element={<Reviews setToken={setToken} token={token} />} />
          <Route path="/reviews" element={<Reviews setToken={setToken} token={token} />} />
          <Route path="/logout" />
          <Route path="/login" element={<Login setToken={setToken} token={token} setCart={setCart} setCartId={setCartId} setUserId={setUserId}/>} />
          <Route path="/products" element={<ProductListing products={products}
                                                            addToCart={addToCart}
                                                            setToken={setToken} token={token}/>} />
          <Route path="/products/id/:productId" element={<SingleProduct products={products}
                                                                        setToken={setToken} token={token}/>}  />
          <Route path="/register" element={<Register/>} setToken={setToken} token={token}/>
          <Route path="/administrator/register" element={<AdminRegister/>} setToken={setToken} token={token}/>
        </Routes>

        {/* Footer Component */}
        <Footer2 />
      </div>
    </Router>
  );
}


export default App;

