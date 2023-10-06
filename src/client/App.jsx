import React from 'react';
import {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Cart from './components/Cart';
import ProductListing from './components/ProductListing.jsx';
import FeaturedProduct from './components/FeaturedProduct';
import Footer2 from './components/Footer2';
import Register from './routes/Register';
import Login from './components/Login';
import Homepage from './components/Homepage'





function App() {


  const [ token , setToken ] = useState(window.localStorage.getItem("token"));


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
        <Route path="/cart" element={<Cart />} />
        <Route path="/home" element={<Homepage setToken={setToken} token={token}/>} />
        <Route path="/featured" element={<FeaturedProduct setToken={setToken} token={token}/>} />
        <Route path="/logout" />
        <Route path="/login" element={<Login setToken={setToken} token={token} />} />
        <Route path="/products" element={<ProductListing setToken={setToken} token={token}/>} />
        <Route path="/register" element={<Register/>} setToken={setToken} token={token}/>
        </Routes>

        {/* Footer Component */}
        <Footer2 />
      </div>
    </Router>
  );
}

export default App;
