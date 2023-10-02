import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Cart from './Cart';
import ProductListing from './ProductListing';
import FeaturedProduct from './components/FeaturedProduct';
import Footer from './Footer';

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
        </Switch>

        {/* Footer Component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;