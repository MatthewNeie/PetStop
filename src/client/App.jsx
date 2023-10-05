import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Cart from './components/Cart';
import ProductListing from './components/ProductListing';
import FeaturedProduct from './components/FeaturedProduct';
import Footer2 from './components/Footer2';
import Register from './routes/Register';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header Component */}
        <Header />
        <Routes>
        <Route path="/cart" element={<Cart />} />
            {/* Cart Component */}
            <Route path="/featured" element={<FeaturedProduct />} />
            {/* Featured Product */}
        {/* <Route path="/" element={<HomePage />} /> */}
            {/* Home Page */}
            <Route path="/login" element={<Login />} />
            {/* You can include your home content here */}
        <Route path="/products" element={<ProductListing />} />
            {/* Product Listing Component */}
        <Route path="/register" element={<Register/>} />
        </Routes>
        {/* Footer Component */}
        <Footer2 />
      </div>
    </Router>
  );
}

export default App;