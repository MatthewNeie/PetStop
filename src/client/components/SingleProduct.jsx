import React from 'react'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import fetchProducts from '../api/ProductsAjaxHelper';

const SingleProduct = ({ products }) => {

    // console.log(products)

    const { productId } = useParams();

    console.log(productId)

    const productIdNumberfy = parseInt(productId)

    // useEffect(() => {
    //     const product = products.find((product) => product.id === productIdNumberfy)
    //     return product

    // }, [productId])

    const product = products.find((product) => product.id === productIdNumberfy)

    console.log(productId)
    

    // console.log(products)

    console.log(productIdNumberfy)

    console.log(products)

    console.log(product)

    //  const { name, imgUrl, description, price } = product;

    return (
        <>
        
                {products.filter(product => product.id === productIdNumberfy).map(filteredProduct => (
                        <div className="product-info" key={filteredProduct.id}>
                            <img src={filteredProduct.imgUrl} className="product-image-sizing"/>
                            <h3>{filteredProduct.name}</h3>
                            <p>{filteredProduct.description}</p>
                            <p>Price: ${filteredProduct.price}</p>
                            {/* Add more product details */}
                        </div>
                    ))}
        </>
    )
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

