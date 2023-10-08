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

     const { name, imgUrl, description, price } = product;

    return (
        <>
        
            <div>
                <h1>{name}</h1>
                <img src={imgUrl} />
                <p>{description}</p>
                <p>{price}</p>
            </div>
        </>
    )
}

export default SingleProduct;