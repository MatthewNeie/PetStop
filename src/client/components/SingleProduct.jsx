import React from 'react'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import fetchProducts from '../api/ProductsAjaxHelper';
import postReview from '../api/ReviewsAjaxHelper';

const SingleProduct = ({ products , reviews }) => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [date, setDate] = useState('')
    const [userId, setUserId] = useState(window.localStorage.getItem("userId"));

    const { productId } = useParams();

    const productIdNumberfy = parseInt(productId)

    // async function GetProductId() {

    // products.filter(product => product.id === productIdNumberfy)

    // setProductId(products.id)

    // }

    // GetProductId()

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

    console.log(products)

    console.log(productIdNumberfy)

    // useEffect(() => {
    //     const product = products.find((product) => product.id === productIdNumberfy)
    //     return product

    // }, [productId])


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

            <form onSubmit={submitReview}>
                <div className="review-info">
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

                    <div className="form-div">
                        <label className="form-label" for="date">Date </label>
                        <input type="date" id="date"
                            className="form-input" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" />
                    </div>
                </div>
                <button type="submit" className="submitButton">Add Review</button>
                </form>

                {reviews.filter(review => review.productId === productIdNumberfy).map(filteredReview => (
                        <div className="review-info" key={filteredReview.id}>
                            <img src={filteredReview.title} className="product-image-sizing"/>
                            <h3>{filteredReview.content}</h3>
                            <p>{filteredProduct.date}</p>
                        </div>
                    ))}
        </>
    )
}

export default SingleProduct;