import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Cart from './components/Cart';
import ProductListing from './components/ProductListing';
import FeaturedProduct from './components/FeaturedProduct';
import Footer2 from './components/Footer2';
import Register from './routes/Register';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header Component */}
        <Header />

        <Switch>
          <Route path="/cart">
            {/* Cart Component */}
            <Cart />
          </Route>
          <Route path="/products">
            {/* Product Listing Component */}
            <ProductListing />
          </Route>
          <Route path="/featured">
            {/* Featured Product */}
            <FeaturedProduct />
          </Route>
          <Route path="/">
            {/* Home Page */}
            {/* You can include your home content here */}
          </Route>
          <Route path="/register" element={<Register/>}></Route>
        </Switch>

        {/* Footer Component */}
        <Footer2 />
      </div>
    </Router>
  );
}

export default App;