import React from 'react';

function FeaturedProduct({ product }) {
  return (
    <div className="featured-product">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span className="price">${product.price}</span>
      <a href="#" className="btn">Add to Cart</a>
    </div>
  );
}

export default FeaturedProduct;