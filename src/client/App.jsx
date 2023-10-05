import React from 'react';
import {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Cart from './components/Cart';
import ProductListing from './components/ProductListing';
import FeaturedProduct from './components/FeaturedProduct';
import Footer2 from './components/Footer2';
import Register from './routes/Register';
import Login from './components/Login';

function App() {

  const [ token , setToken ] = useState(window.localStorage.getItem("token"))

  return (
    <Router>
      <div className="App">
        {/* Header Component */}
        <Header />

        <Routes>
        <Route path="/cart" element={<Cart />} />
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