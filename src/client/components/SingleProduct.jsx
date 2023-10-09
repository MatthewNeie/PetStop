import React from 'react'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import fetchProducts from '../../api/ProductsAjaxHelper';

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

export default SingleProduct;