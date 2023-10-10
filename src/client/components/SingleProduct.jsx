import { useState } from "react";
import { Link } from 'react-router-dom';
import ProductReviews from './ProductReviews';



function SingleProduct({ products }) {

    const [detailed, setDetailed] = useState(false);

    return (

        <div>
            <img className="img-url" src={products.imageUrl} alt={products.name} />
            <h3 className="h3">{products.name} </h3>
            <p>Price: ${products.price} </p>

            {detailed && (
                <>
                    <p>Item Description: {products.description}</p>
                    <p>Availability: {products.inStock}</p>
                    <p>In Stock: {products.quantity}</p>



                </>
            )}

            <button className="button-expand" onClick={() => setDetailed(!detailed)}>
                {detailed ? 'Hide Details' : 'Expand Details'}
            </button>

            <ProductReviews productId={product.productId} />
            <Link to={`/products/${products.id}/review`}>Leave a Review</Link>

        </div>






    );


}

export default SingleProduct


/*

import React, { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

function ProductDetail({ productId }) {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch product details for the specified productId
        fetch(`http://localhost:3000/api/products/id/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [productId]);

    if (loading) {
        return <div>Loading product details...</div>;
    }

    if (error) {
        return <div>Error fetching product details: {error.message}</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>

           

          
            <ReviewForm productId={productId} />

          
            <ReviewList productId={productId} />
        </div>
    );
}

export default ProductDetail;

*/