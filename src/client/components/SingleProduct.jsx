import React from 'react'
import { useState , useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import fetchProducts from '../api/ProductsAjaxHelper';
import { fetchUsersById } from '../api/UsersAjaxHelper';
import { deleteProduct } from '../api/ProductsAjaxHelper';
import postReview from '../api/ReviewsAjaxHelper';

const SingleProduct = ({ products , reviews, token }) => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [date, setDate] = useState('')
    const [userId, setUserId] = useState(window.localStorage.getItem("userId"));
    const [adminUser, setAdminUser] = useState({});

    const { productId } = useParams();

    const productIdNumberfy = parseInt(productId)

    const navigate = useNavigate()

    // async function GetProductId() {

    // products.filter(product => product.id === productIdNumberfy)

    // setProductId(products.id)

    // }

    // GetProductId()

    if (userId === null) {
        setUserId(1)
    } else {
        null
    }

    const deleteProductById = async () => {
            try {
                const response = await deleteProduct(productId)
                console.log(response)
                navigate("/products")
            } catch (err) {
                console.error(err)
            }
        }

        useEffect(() => {
            const getUsersById = async () => {
                try {
                    const response = await fetchUsersById(userId)
                    console.log(response.user)
                    setAdminUser(response.user)
                } catch (err) {
                    console.error(err)
                }
            }
            getUsersById();
        }, [])

    async function submitReview(e) {
        e.preventDefault();

            const review = {
                review: {
                    title,
                    content,
                    date,
                    productId,
                    userId,
                }
            };

        
            const response = await postReview(review);
            console.log(response)
    
        }

    console.log(userId)

    console.log(productIdNumberfy)

    console.log(products)

    // useEffect(() => {
    //     const product = products.find((product) => product.id === productIdNumberfy)
    //     return product

    // }, [productId])


    return (
        <>
        
                {products.filter(product => product.id === productIdNumberfy).map(filteredProduct => (
                    <div className="single-product-div">
                        <div className="single-product-img-div" key={filteredProduct.id}>
                            <img src={filteredProduct.imgUrl} height="300px" className="single-product-image-sizing"/>
                        </div>
                        <div className="single-product-info-div">
                            <h3 className="single-product-name">{filteredProduct.name}</h3>
                            <p className="single-product-desc">{filteredProduct.description}</p>
                            <p className="single-product-price">${filteredProduct.price}</p>
                            <br></br><br></br>
                            <button className="single-product-cart-button">Add To Cart</button>
                            {/* Add more product details */}
                        </div>
                    </div>
                        
                    ))}

            {adminUser.isAdministrator ?
            <div>
                <button className="update-button" >Update</button>
                <button className="delete-button" onClick={deleteProductById} >Delete</button>
            </div> : null }
<br></br>
            {userId === 1 ? null :
            <form onSubmit={submitReview}>
                <div className="review-info">
                    <h2>Add a Review!</h2>
                <div className="form-div">
                        <label className="form-label" for="title">Title</label>
                        <input className="form-input"
                            type="text" value={title}
                            onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Title" />
                    </div>

                    <div className="form-div">
                        <label className="form-label" for="content">Content </label>
                        <input type="text" name="" id="content" value={content}
                            className="form-input" onChange={(e) => setContent(e.target.value)} placeholder="Content" />
                    </div>
                </div>
                <button type="submit" className="submitButton">Add Review</button>
                </form> }

                <h2>Product Reviews</h2>

                {reviews.filter(review => review.productId === productIdNumberfy).map(filteredReview => (
                        <div className="review-info" key={filteredReview.id}>
                            <p>{filteredReview.title}</p>
                            <h3>{filteredReview.content}</h3>
                            <p>{filteredReview.date}</p>
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

