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
import Users from './components/Users';
import AddProduct from './components/AddProduct';
import Profile from './routes/Profile';
import fetchProducts from './api/ProductsAjaxHelper';


function App() {

  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([]);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addToCart = (product) => {
    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
    if (existingProductIndex !== -1) {
      // If the product is already in the cart, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
    }
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

  useEffect(() => {
    fetch('http://localhost:3000/api/reviews') // Adjust the URL based on your API route
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setReviews(data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        });
}, []);

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
            <Route path="/cart" element={<Cart cart={cart}/>} />
            <Route path="/" element={<Homepage setToken={setToken} token={token}/>} />
            <Route path="/featured" element={<FeaturedProduct setToken={setToken} token={token}/>} />
            <Route path="/reviews" element={<Reviews reviews={reviews}
                                                      setToken={setToken}
                                                      token={token} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<Login setToken={setToken} token={token} />} />
            <Route path="/products" element={<ProductListing products={products}
                                                              addToCart={addToCart}
                                                              setToken={setToken} token={token}/>} />
            <Route path="/products/id/:productId" element={<SingleProduct reviews={reviews}
                                                                          products={products}
                                                                          setToken={setToken} token={token}/>}  />
            <Route path="/addproduct" element={<AddProduct />} />
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

